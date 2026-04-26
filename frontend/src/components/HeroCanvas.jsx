import React, { useEffect, useRef } from "react";

// Flowing stream configs — each one is an organic ribbon that drifts across the canvas
// [hue, speed, thickness, baseY (0-1), amplitude, frequency, phaseOffset, opacity]
const STREAMS = [
	[200, 0.06, 1.8, 0.25, 0.18, 1.2, 0.0,  0.7],
	[280, 0.04, 1.5, 0.55, 0.22, 0.9, 1.4,  0.65],
	[45,  0.03, 1.2, 0.40, 0.28, 0.7, 4.2,  0.50],
	[130, 0.05, 1.5, 0.68, 0.16, 1.1, 1.9,  0.60],
];

const NEBULAE = [
	[280, 0.78, 0.20, 220, 0.002, 0.10],
	[200, 0.12, 0.65, 180, 0.003, 0.08],
	[350, 0.55, 0.85, 150, 0.003, 0.07],
	[45,  0.90, 0.55, 130, 0.002, 0.06],
	[170, 0.30, 0.30, 160, 0.002, 0.07],
];

const DUST = Array.from({ length: 16 }, (_, i) => ({
	hue:       [200, 280, 45, 170, 355, 260, 195][i % 7],
	xFreq:     0.007 + (i * 0.0013),
	yFreq:     0.009 + (i * 0.0011),
	xPhase:    i * 0.93,
	yPhase:    i * 1.37,
	alphaFreq: 0.04 + (i * 0.003),
	alphaPhase: i * 0.7,
	r: 0.8 + (i % 3) * 0.6,
}));

export default function HeroCanvas() {
	const canvasRef  = useRef(null);
	const rafRef     = useRef(null);
	const visibleRef = useRef(true);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");

		let width = 0, height = 0;

		const resize = () => {
			const dpr = window.devicePixelRatio || 1;
			const rect = canvas.parentElement.getBoundingClientRect();
			width  = rect.width;
			height = rect.height;
			canvas.width  = width  * dpr;
			canvas.height = height * dpr;
			canvas.style.width  = width  + "px";
			canvas.style.height = height + "px";
			ctx.scale(dpr, dpr);
		};

		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(canvas.parentElement);

		// Pause RAF when hero is scrolled off-screen
		const io = new IntersectionObserver(
			([entry]) => { visibleRef.current = entry.isIntersecting; },
			{ threshold: 0 }
		);
		io.observe(canvas);

		let t = 0;

		// 50 points is plenty for smooth curves; 80 was overkill
		const buildStreamPath = (baseY, amp, freq, phase, spd) => {
			const pts  = 50;
			const path = new Path2D();
			for (let i = 0; i <= pts; i++) {
				const x = (i / pts) * width;
				const y =
					baseY * height
					+ Math.sin(i / pts * Math.PI * 2 * freq + phase + t * spd) * amp * height
					+ Math.sin(i / pts * Math.PI * 2 * freq * 1.7 + phase * 1.3 + t * spd * 0.7) * amp * 0.45 * height
					+ Math.sin(i / pts * Math.PI * 2 * freq * 0.4 + phase * 0.5 + t * spd * 1.3) * amp * 0.3 * height;
				if (i === 0) path.moveTo(x, y);
				else         path.lineTo(x, y);
			}
			return path;
		};

		const draw = () => {
			rafRef.current = requestAnimationFrame(draw);
			if (!visibleRef.current) return;

			t += 0.12;
			ctx.clearRect(0, 0, width, height);

			// ── Nebula clouds ──
			NEBULAE.forEach(([hue, xf, yf, radius, spd, baseOp]) => {
				const cx = xf * width  + Math.sin(t * spd * 1.1) * width  * 0.06;
				const cy = yf * height + Math.cos(t * spd * 0.9) * height * 0.05;
				const op = baseOp + Math.sin(t * spd * 4) * 0.025;
				const r  = radius + Math.sin(t * spd * 3) * 20;

				const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
				grad.addColorStop(0,   `hsla(${hue},90%,60%,${op})`);
				grad.addColorStop(0.4, `hsla(${hue},80%,50%,${op * 0.5})`);
				grad.addColorStop(1,   `hsla(${hue},70%,40%,0)`);

				ctx.beginPath();
				ctx.arc(cx, cy, r, 0, Math.PI * 2);
				ctx.fillStyle = grad;
				ctx.fill();
			});

			// ── Flowing streams ──
			// Glow faked with layered wide strokes — NO ctx.filter (very expensive)
			ctx.lineJoin = "round";
			ctx.lineCap  = "round";
			STREAMS.forEach(([hue, spd, thickness, baseY, amp, freq, phase, opacity]) => {
				const pulse = opacity + Math.sin(t * 0.018 + phase) * 0.12;
				const path  = buildStreamPath(baseY, amp, freq, phase, spd);

				// outermost halo — widest, faintest
				ctx.strokeStyle = `hsla(${hue},100%,60%,${pulse * 0.05})`;
				ctx.lineWidth   = thickness + 32;
				ctx.stroke(path);

				// outer glow
				ctx.strokeStyle = `hsla(${hue},100%,65%,${pulse * 0.11})`;
				ctx.lineWidth   = thickness + 18;
				ctx.stroke(path);

				// mid glow
				ctx.strokeStyle = `hsla(${hue},100%,70%,${pulse * 0.28})`;
				ctx.lineWidth   = thickness + 7;
				ctx.stroke(path);

				// bright neon core
				ctx.strokeStyle = `hsla(${hue},100%,88%,${pulse})`;
				ctx.lineWidth   = thickness;
				ctx.stroke(path);
			});

			// ── Star-dust particles (no shadowBlur — too costly) ──
			DUST.forEach((d) => {
				const x     = (Math.sin(t * d.xFreq + d.xPhase) * 0.5 + 0.5) * width;
				const y     = (Math.cos(t * d.yFreq + d.yPhase) * 0.5 + 0.5) * height;
				const alpha = (Math.sin(t * d.alphaFreq + d.alphaPhase) * 0.5 + 0.5) * 0.75;
				const r     = d.r + Math.sin(t * 0.06 + d.xPhase) * 0.4;

				ctx.beginPath();
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.fillStyle = `hsla(${d.hue},100%,85%,${alpha})`;
				ctx.fill();
			});
		};

		rafRef.current = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(rafRef.current);
			ro.disconnect();
			io.disconnect();
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			style={{
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				pointerEvents: "none",
				zIndex: 0,
			}}
		/>
	);
}
