# Have Fun Games

A full-stack digital game store where users can browse games, manage a shopping cart, and complete purchases via Stripe Checkout. Built as a group project for CISC 3140.

---

## Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React 19 | UI component library |
| Vite 7 | Dev server & bundler |
| React Router DOM 7 | Client-side routing |
| @supabase/supabase-js | Auth & database client |
| @stripe/stripe-js | Stripe.js loader |
| keen-slider | Game carousel component |

### Backend
| Tool | Purpose |
|---|---|
| Node.js (ESM) | Runtime |
| Express 5 | HTTP server & routing |
| Supabase | PostgreSQL database + Auth |
| Stripe | Payment processing |
| cors | Cross-origin request handling |
| dotenv | Environment variable loading |

### External APIs
- **Supabase** – database (games, cart, auth) and user authentication
- **Stripe** – hosted Checkout Sessions for card payments
- **RAWG API** – game metadata (titles, descriptions, genres, cover images)

---

## Environment Variables

Create a `.env` file in the **project root** (one level above `frontend/` and `backend/`):

```env
# Supabase
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Vite (frontend)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Stripe (backend)
STRIPE_SECRET_KEY=sk_test_...

# Server
PORT=3000
FRONTEND_URL=http://localhost:5173
```

---

## Running the Application

### Prerequisites
- Node.js v18+
- A Supabase project with the `games`, `cart`, and `game_genres` tables seeded
- Stripe test API keys

### 1. Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Start the backend

```bash
cd backend
npm start
# Server running on http://localhost:3000
```

### 3. Start the frontend

```bash
cd frontend
npm run dev
# Dev server running on http://localhost:5173
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Testing Payments (Stripe test mode)

Use the test card number `4242 4242 4242 4242` with any future expiry and any 3-digit CVC on the Stripe Checkout page.

---

## Code Snippets

### 1. Stripe Checkout Session — `backend/src/routes/payments.js`

```js
router.post("/create-checkout-session", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { items, successUrl, cancelUrl } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        ...(item.image ? { images: [item.image] } : {}),
      },
      unit_amount: Math.round(item.price * 100), // Stripe requires cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  res.json({ url: session.url, sessionId: session.id });
});
```

This Express route receives the user's cart items and creates a Stripe Checkout Session server-side. Prices from the database (stored as decimals in USD) are multiplied by 100 to convert them to cents, which is what Stripe requires. The response includes a hosted Stripe URL that the frontend redirects the user to — keeping all payment logic off the client.

---

### 2. Persistent Cart with localStorage — `frontend/src/cart/CartContext.jsx`

```js
const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});

const addToCart = (product) => {
  const existing = cart.find((item) => item.name === product.name);

  const updated = existing
    ? cart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    : [...cart, { ...product, quantity: 1 }];

  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};
```

`CartContext` provides global cart state to the entire app using React Context. The `useState` initializer lazily reads from `localStorage` so the cart survives page refreshes. `addToCart` checks for an existing entry — if the same game is already in the cart, it increments the quantity rather than creating a duplicate entry.

---

### 3. Dynamic Genre & Price Filters — `frontend/src/pages/HomePage.jsx`

```js
const filtered = useMemo(() => {
  return GAME_GRID.filter((game) => {
    const matchesSearch = game.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || game.genres.includes(selectedGenre);

    const matchesPrice =
      selectedPrice === "all"
        ? true
        : selectedPrice === "under10"
        ? game.price < 10
        : selectedPrice === "under20"
        ? game.price < 20
        : game.price >= 20 && game.price <= 50;

    return matchesSearch && matchesGenre && matchesPrice;
  });
}, [GAME_GRID, search, selectedGenre, selectedPrice]);
```

`useMemo` recomputes the filtered game list only when the source data or one of the three filter values changes, avoiding unnecessary re-renders on every keystroke. All three filters — text search, genre, and price range — are applied together so they compose naturally: a user can filter by "Action" games under $20 that match a search term simultaneously.
