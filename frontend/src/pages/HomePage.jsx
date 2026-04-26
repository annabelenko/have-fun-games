import React from "react";
import GameCarousel from "../components/GameCarousel";
import HeroCanvas from "../components/HeroCanvas";
import "./HomePage.css";

const FEATURED_SLIDES = [
	{
		title: "Cyber Siege",
		genre: "Action RPG",
		desc: "Battle through a neon-lit dystopia, upgrade your cybernetic implants, and tear through waves of corporate enforcers.",
		tags: ["Action RPG", "Open World", "Cyberpunk"],
		price: 29.99,
		bg: "linear-gradient(135deg, #0d1b2a 0%, #1b3a4b 100%)",
	},
	{
		title: "Stellar Drift",
		genre: "Space Sim",
		desc: "Chart unexplored star systems, trade rare minerals, and defend your ship against rival space pirates.",
		tags: ["Space Sim", "Exploration", "Multiplayer"],
		price: 19.99,
		bg: "linear-gradient(135deg, #0a0a2a 0%, #1a1060 100%)",
	},
	{
		title: "Iron Arena",
		genre: "Fighting",
		desc: "Choose your warrior, master brutal combos, and dominate the global leaderboard in fast-paced 1v1 battles.",
		tags: ["Fighting", "Competitive", "Arcade"],
		price: 24.99,
		bg: "linear-gradient(135deg, #1a0505 0%, #4a0f0f 100%)",
	},
	{
		title: "Shadow Realm",
		genre: "Horror",
		desc: "Survive a cursed village where every shadow hides a monster. Can you escape before dawn?",
		tags: ["Horror", "Survival", "Atmospheric"],
		price: 14.99,
		bg: "linear-gradient(135deg, #050508 0%, #1a0a2a 100%)",
	},
	{
		title: "Pixel Quest",
		genre: "Platformer",
		desc: "A love letter to classic platformers — tight controls, devious level design, and a bop soundtrack.",
		tags: ["Platformer", "Indie", "Retro"],
		price: 9.99,
		bg: "linear-gradient(135deg, #0a1a0a 0%, #1a3a0a 100%)",
	},
];

export default function HomePage() {
	return (
		<div className="home">
			{/* Hero */}
			<section className="hero">
				<HeroCanvas />
				<div className="hero-content">
					<p className="hero-eyebrow">🎮 Your Game Store</p>
					<h1 className="hero-title">
						Have Fun<br />
						<span className="hero-title-accent">Games</span>
					</h1>
					<p className="hero-sub">
						Discover, buy, and play the best titles across every platform.
					</p>
					<div className="hero-actions">
						<a href="/signup" className="btn-primary">Get Started</a>
						<a href="#featured" className="btn-ghost">Browse Games</a>
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
					{[
						{ title: "Cyber Siege", genre: "Action RPG", price: "$29.99" },
						{ title: "Stellar Drift", genre: "Space Sim", price: "$19.99" },
						{ title: "Iron Arena", genre: "Fighting", price: "$24.99" },
						{ title: "Shadow Realm", genre: "Horror", price: "$14.99" },
						{ title: "Pixel Quest", genre: "Platformer", price: "$9.99" },
						{ title: "Warlords IV", genre: "Strategy", price: "$34.99" },
					].map((game) => (
						<div className="game-card" key={game.title}>
							<div className="game-card-thumb" />
							<div className="game-card-info">
								<span className="game-card-genre">{game.genre}</span>
								<h3 className="game-card-title">{game.title}</h3>
								<div className="game-card-footer">
									<span className="game-card-price">{game.price}</span>
									<button className="btn-add">Add to Cart</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
}
