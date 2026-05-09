import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { CartContext } from "../cart/CartContext";
import { GetAllGames, BACKEND_URL } from "../lib/api";
import GameCarousel from "../components/GameCarousel";
import HeroCanvas from "../components/HeroCanvas";
import "./HomePage.css";
import ItemPrice from "../components/ItemPrice";
import ErrorPage from "./ErrorPage";

export default function HomePage() {
	const { addToCart } = useContext(CartContext);
	const [dataReady, setDataReady] = useState(false);

	const [FEATURED_SLIDES, setFeaturedSlides] = useState([]);
	const [GAME_GRID, setGameGrid] = useState([]);

	useEffect(() => {
		GetAllGames()
			.then((data) => {
				const getRandomColor = () => {
					var letters = "0123456789ABCDEF";
					var color = "#";
					for (var i = 0; i < 6; i++) {
						color += letters[Math.floor(Math.random() * 16)];
					}
					return color;
				};

				let slides = [];
				// We only need to show a couple on featured
				for (let index = 0; index < 10; index++) {
					const game = data.games[index];
					slides.push({
						title: game.title,
						genre: "",
						desc: game.description,
						tags: [],
						price: game.price,
						img: game.cover_image_url,
						url: `/game/${game.id}`,
						bg: `linear-gradient(135deg, #0a1a0a 0%, ${getRandomColor()} 100%)`,
					});
				}

				let gameGrid = [];
				for (let index = 10; index < data.games.length; index++) {
					const game = data.games[index];
					gameGrid.push({
						title: game.title,
						genre: "",
						desc: game.description,
						price: game.price,
						img: game.cover_image_url,
						url: `/game/${game.id}`,
					});
				}

				setGameGrid(gameGrid);

				setFeaturedSlides(slides);

				setDataReady(true);
			})
			.catch((err) => console.warn(err));
	}, [dataReady]);

	return (
		<div className="home">
			{/* Hero */}
			<section className="hero">
				<HeroCanvas />
				<div className="hero-content">
					<p className="hero-eyebrow">🎮 Your Game Store</p>
					<h1 className="hero-title">
						Have Fun
						<br />
						<span className="hero-title-accent">Games</span>
					</h1>
					<p className="hero-sub">
						Discover, buy, and play the best titles across every platform.
					</p>
					<div className="hero-actions">
						<a href="/signup" className="btn-primary">
							Get Started
						</a>
						<a href="#featured" className="btn-ghost">
							Browse Games
						</a>
					</div>
				</div>
				<div className="hero-art">
					<div className="hero-controller">🕹️</div>
				</div>
			</section>

			{/* Featured Carousel */}
			<section className="featured" id="featured">
				<h2 className="section-title">Featured &amp; Recommended</h2>
				<GameCarousel slides={FEATURED_SLIDES} />
			</section>

			{/* Game grid */}
			<section className="browse" id="browse">
				<h2 className="section-title">Browse All</h2>
				<div className="game-grid">
					{GAME_GRID.map((game) => (
						<div className="game-card" key={game.title}>
							<div className="game-card-thumb">
								<img
									src={game.img}
									style={{
										width: "100%",
										height: "100%",
										objectFit: "contain",
									}}
								></img>
							</div>
							<div className="game-card-info">
								<span className="game-card-genre">{game.genre}</span>
								<h3 className="game-card-title">
									<a href={game.url}>{game.title}</a>
								</h3>
								<div className="game-card-footer">
									<span className="game-card-price">
										<ItemPrice price={game.price} />
									</span>
									<button className="btn-add" onClick={() => addToCart({ name: game.title, price: game.price, image: game.img, url: game.url })}>Add to Cart</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
