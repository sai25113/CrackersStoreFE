// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button, Card, Spinner } from "react-bootstrap";
// const API_URL = import.meta.env.VITE_API_URL; // Vite
// import "./spin.css";
// const SpinWheel = () => {
// 	const [mode, setMode] = useState("withoutCoupon"); // "withCoupon" | "withoutCoupon"
// 	const [rewards, setRewards] = useState([]);
// 	const [angle, setAngle] = useState(0);
// 	const [spinning, setSpinning] = useState(false);
// 	const [result, setResult] = useState(null);
// 	const [loading, setLoading] = useState(true);

// 	// Fetch rewards dynamically based on mode
// 	const fetchRewards = async () => {
// 		try {
// 			setLoading(true);
// 			const { data } = await axios.get(`${API_URL}/rewards?mode=${mode}`);
// 			setRewards(data.map((r) => r.name));
// 			setLoading(false);
// 		} catch (err) {
// 			console.error("Error fetching rewards:", err);
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchRewards();
// 	}, [mode]);

// 	const spinWheel = () => {
// 		if (rewards.length === 0) {
// 			alert("No rewards available for this spin mode!");
// 			return;
// 		}

// 		setSpinning(true);
// 		setResult(null);

// 		// pick a random index and calculate spin angle
// 		const randomIndex = Math.floor(Math.random() * rewards.length);
// 		const sectionAngle = 360 / rewards.length;
// 		const newAngle = 360 * 5 + randomIndex * sectionAngle; // 5 full spins + stop position
// 		setAngle(newAngle);

// 		setTimeout(() => {
// 			setSpinning(false);
// 			setResult(rewards[randomIndex]);
// 		}, 4000);
// 	};

// 	return (
// 		<div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
// 			<Card className="p-4 text-center shadow-lg" style={{ maxWidth: 420 }}>
// 				<h3 className="mb-3 text-primary fw-bold">🎯 Spin & Win</h3>

// 				{/* Mode Selector */}
// 				<div className="d-flex justify-content-center gap-3 mb-4">
// 					<Button
// 						variant={mode === "withoutCoupon" ? "primary" : "outline-primary"}
// 						onClick={() => setMode("withoutCoupon")}
// 					>
// 						Without Coupon
// 					</Button>
// 					<Button
// 						variant={mode === "withCoupon" ? "success" : "outline-success"}
// 						onClick={() => setMode("withCoupon")}
// 					>
// 						With Coupon
// 					</Button>
// 				</div>

// 				{/* Spin Wheel */}
// 				{loading ? (
// 					<Spinner animation="border" />
// 				) : rewards.length === 0 ? (
// 					<p className="text-muted">No rewards found for this mode.</p>
// 				) : (
// 					<>
// 						<div
// 							className="wheel mx-auto mb-4 position-relative"
// 							style={{
// 								width: 250,
// 								height: 250,
// 								borderRadius: "50%",
// 								border: "10px solid #007bff",
// 								transition: "transform 4s cubic-bezier(0.33, 1, 0.68, 1)",
// 								transform: `rotate(${angle}deg)`,
// 								background: `conic-gradient(
// 									${rewards
// 										.map((_, i) => {
// 											const colors = [
// 												"#ff4d4f",
// 												"#ffc107",
// 												"#28a745",
// 												"#17a2b8",
// 												"#6f42c1",
// 												"#fd7e14",
// 											];
// 											return `${colors[i % colors.length]} ${
// 												i * (360 / rewards.length)
// 											}deg ${(i + 1) * (360 / rewards.length)}deg`;
// 										})
// 										.join(",")}
// 								)`,
// 							}}
// 						>
// 							{/* Pointer */}
// 							<div
// 								className="position-absolute top-0 start-50 translate-middle-x"
// 								style={{
// 									width: 0,
// 									height: 0,
// 									borderLeft: "12px solid transparent",
// 									borderRight: "12px solid transparent",
// 									borderBottom: "20px solid red",
// 								}}
// 							></div>
// 						</div>

// 						<Button
// 							onClick={spinWheel}
// 							disabled={spinning}
// 							variant={spinning ? "secondary" : "primary"}
// 							className="fw-semibold"
// 						>
// 							{spinning ? "Spinning..." : "Spin Now"}
// 						</Button>
// 					</>
// 				)}

// 				{/* Result */}
// 				{result && (
// 					<div className="mt-4">
// 						<h5>
// 							{result === "No Luck"
// 								? "😅 Better luck next time!"
// 								: `🎁 You won: ${result}`}
// 						</h5>
// 					</div>
// 				)}
// 			</Card>

// 			<style>{`
// 				.wheel {
// 					position: relative;
// 					overflow: hidden;
// 				}
// 				.pointer {
// 					width: 0;
// 					height: 0;
// 					border-left: 12px solid transparent;
// 					border-right: 12px solid transparent;
// 					border-bottom: 20px solid red;
// 					position: absolute;
// 					top: -20px;
// 					left: 50%;
// 					transform: translateX(-50%);
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default SpinWheel;

// import React, { useEffect, useState } from "react";
// import { Sparkles, Gift, Star } from "lucide-react";

// const SpinWheel = () => {
// 	const [mode, setMode] = useState("withoutCoupon");
// 	const [rewards, setRewards] = useState([]);
// 	const [rotation, setRotation] = useState(0);
// 	const [spinning, setSpinning] = useState(false);
// 	const [result, setResult] = useState(null);
// 	const [loading, setLoading] = useState(true);
// 	const [showConfetti, setShowConfetti] = useState(false);

// 	const fetchRewards = async () => {
// 		try {
// 			setLoading(true);
// 			const API_URL = import.meta.env.VITE_API_URL;
// 			const response = await fetch(`${API_URL}/rewards?mode=${mode}`);
// 			const data = await response.json();
// 			setRewards(data.map((r) => r.name));
// 			setLoading(false);
// 		} catch (err) {
// 			console.error("Error fetching rewards:", err);
// 			setLoading(false);
// 		}
// 	};

// 	useEffect(() => {
// 		fetchRewards();
// 	}, [mode]);

// 	const spinWheel = () => {
// 		if (rewards.length === 0 || spinning) return;

// 		setSpinning(true);
// 		setResult(null);
// 		setShowConfetti(false);

// 		const randomIndex = Math.floor(Math.random() * rewards.length);
// 		const sectionAngle = 360 / rewards.length;
// 		const spins = 5;
// 		const newRotation =
// 			rotation +
// 			360 * spins +
// 			(360 - randomIndex * sectionAngle - sectionAngle / 2);

// 		setRotation(newRotation);

// 		setTimeout(() => {
// 			setSpinning(false);
// 			setResult(rewards[randomIndex]);
// 			if (
// 				rewards[randomIndex] !== "No Luck" &&
// 				rewards[randomIndex] !== "Try Again"
// 			) {
// 				setShowConfetti(true);
// 				setTimeout(() => setShowConfetti(false), 4000);
// 			}
// 		}, 5000);
// 	};

// 	const colors = [
// 		"#FF6B6B",
// 		"#FFD93D",
// 		"#6BCF7F",
// 		"#4ECDC4",
// 		"#A78BFA",
// 		"#FB923C",
// 		"#F472B6",
// 		"#38BDF8",
// 	];

// 	return (
// 		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 p-4 relative overflow-hidden">
// 			{/* Floating Stars */}
// 			<div className="absolute inset-0 overflow-hidden pointer-events-none">
// 				{[...Array(25)].map((_, i) => (
// 					<Star
// 						key={i}
// 						className="absolute text-yellow-400 animate-twinkle"
// 						size={12 + Math.random() * 16}
// 						fill="currentColor"
// 						style={{
// 							left: `${Math.random() * 100}%`,
// 							top: `${Math.random() * 100}%`,
// 							animationDelay: `${Math.random() * 3}s`,
// 							animationDuration: `${2 + Math.random() * 2}s`,
// 							opacity: 0.4,
// 						}}
// 					/>
// 				))}
// 			</div>

// 			{/* Confetti */}
// 			{showConfetti && (
// 				<div className="fixed inset-0 pointer-events-none z-50">
// 					{[...Array(100)].map((_, i) => (
// 						<div
// 							key={i}
// 							className="absolute"
// 							style={{
// 								left: `${Math.random() * 100}%`,
// 								top: "-20px",
// 								animation: `confetti-drop ${2 + Math.random()}s ease-out forwards`,
// 								animationDelay: `${Math.random() * 0.3}s`,
// 								backgroundColor:
// 									colors[Math.floor(Math.random() * colors.length)],
// 								width: `${8 + Math.random() * 8}px`,
// 								height: `${8 + Math.random() * 8}px`,
// 								borderRadius: Math.random() > 0.5 ? "50%" : "0",
// 							}}
// 						/>
// 					))}
// 				</div>
// 			)}

// 			{/* Main Container */}
// 			<div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 relative z-10">
// 				{/* Header */}
// 				<div className="text-center mb-8">
// 					<h1 className="text-6xl font-black mb-3">
// 						<span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
// 							🎆 Spin & Win! 🎆
// 						</span>
// 					</h1>
// 					<p className="text-2xl font-bold text-gray-700">
// 						Try your luck and win amazing prizes!
// 					</p>
// 				</div>

// 				{/* Mode Selector - Horizontal & Centered */}
// 				<div className="flex gap-4 justify-center mb-8">
// 					<button
// 						onClick={() => setMode("withoutCoupon")}
// 						disabled={spinning}
// 						className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 ${
// 							mode === "withoutCoupon"
// 								? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-xl scale-105"
// 								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
// 						} ${spinning ? "opacity-50 cursor-not-allowed" : ""}`}
// 					>
// 						<span className="text-2xl">🎯</span>
// 						<span>Regular Spin</span>
// 					</button>
// 					<button
// 						onClick={() => setMode("withCoupon")}
// 						disabled={spinning}
// 						className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-lg transition-all transform hover:scale-105 ${
// 							mode === "withCoupon"
// 								? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-xl scale-105"
// 								: "bg-gray-200 text-gray-700 hover:bg-gray-300"
// 						} ${spinning ? "opacity-50 cursor-not-allowed" : ""}`}
// 					>
// 						<span className="text-2xl">🎫</span>
// 						<span>Coupon Spin</span>
// 					</button>
// 				</div>

// 				{loading ? (
// 					<div className="flex flex-col items-center justify-center py-20">
// 						<div className="relative mb-6">
// 							<div className="animate-spin rounded-full h-24 w-24 border-8 border-orange-400 border-t-transparent"></div>
// 							<Gift
// 								className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-500"
// 								size={40}
// 							/>
// 						</div>
// 						<p className="text-2xl font-bold text-gray-700">
// 							Loading prizes...
// 						</p>
// 					</div>
// 				) : rewards.length === 0 ? (
// 					<div className="text-center py-20">
// 						<p className="text-4xl mb-4">🎪</p>
// 						<p className="text-2xl font-bold text-gray-600">
// 							No prizes available
// 						</p>
// 						<p className="text-lg text-gray-500 mt-2">
// 							Switch to the other mode!
// 						</p>
// 					</div>
// 				) : (
// 					<>
// 						{/* Wheel Container - Centered */}
// 						<div className="flex justify-center mb-8">
// 							<div className="relative">
// 								{/* Glow */}
// 								<div className="absolute inset-0 flex items-center justify-center">
// 									<div className="w-full h-full bg-orange-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
// 								</div>

// 								{/* Pointer */}
// 								<div
// 									className="absolute left-1/2 transform -translate-x-1/2 z-30"
// 									style={{ top: "-35px" }}
// 								>
// 									<div
// 										style={{
// 											width: 0,
// 											height: 0,
// 											borderLeft: "18px solid transparent",
// 											borderRight: "18px solid transparent",
// 											borderTop: "36px solid #dc2626",
// 											filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
// 										}}
// 									></div>
// 								</div>

// 								{/* Wheel */}
// 								<div
// 									className="relative"
// 									style={{
// 										width: 400,
// 										height: 400,
// 										borderRadius: "50%",
// 										border: "12px solid #ea580c",
// 										boxShadow: "0 0 0 6px #fed7aa, 0 20px 40px rgba(0,0,0,0.2)",
// 										transition: spinning
// 											? "transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)"
// 											: "none",
// 										transform: `rotate(${rotation}deg)`,
// 										background: `conic-gradient(${rewards
// 											.map((_, i) => {
// 												const color = colors[i % colors.length];
// 												return `${color} ${i * (360 / rewards.length)}deg ${(i + 1) * (360 / rewards.length)}deg`;
// 											})
// 											.join(",")})`,
// 									}}
// 								>
// 									{/* Center Button */}
// 									<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-xl flex items-center justify-center border-4 border-white z-20">
// 										<Gift className="text-white" size={32} />
// 									</div>

// 									{/* Reward Text - Fixed to stay within segments */}
// 									{rewards.map((reward, i) => {
// 										const sectionAngle = 360 / rewards.length;
// 										const angle =
// 											((i * sectionAngle + sectionAngle / 2 - 90) * Math.PI) /
// 											180;
// 										const radius = 130;

// 										return (
// 											<div
// 												key={i}
// 												className="absolute"
// 												style={{
// 													top: "50%",
// 													left: "50%",
// 													transform: `translate(-50%, -50%) translate(${Math.cos(angle) * radius}px, ${Math.sin(angle) * radius}px) rotate(${i * sectionAngle + sectionAngle / 2}deg)`,
// 													width: "80px",
// 													pointerEvents: "none",
// 												}}
// 											>
// 												<p
// 													className="text-white font-black text-center leading-tight"
// 													style={{
// 														fontSize: reward.length > 10 ? "10px" : "13px",
// 														textShadow:
// 															"2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.5)",
// 														letterSpacing: "-0.5px",
// 													}}
// 												>
// 													{reward.length > 14
// 														? reward.substring(0, 12) + "..."
// 														: reward}
// 												</p>
// 											</div>
// 										);
// 									})}
// 								</div>
// 							</div>
// 						</div>

// 						{/* Spin Button - Centered */}
// 						<div className="flex justify-center mb-6">
// 							<button
// 								onClick={spinWheel}
// 								disabled={spinning}
// 								className={`px-16 py-6 rounded-3xl font-black text-3xl shadow-2xl transition-all transform ${
// 									spinning
// 										? "bg-gray-400 text-white cursor-not-allowed"
// 										: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 hover:from-green-500 hover:via-emerald-600 hover:to-teal-600 text-white hover:scale-110 active:scale-95 animate-pulse-slow"
// 								}`}
// 							>
// 								{spinning ? (
// 									<span className="flex items-center gap-4">
// 										<div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
// 										<span>SPINNING...</span>
// 										<div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
// 									</span>
// 								) : (
// 									<span>🎉 SPIN NOW! 🎉</span>
// 								)}
// 							</button>
// 						</div>

// 						{/* Result */}
// 						{result && (
// 							<div
// 								className={`p-8 rounded-3xl text-center shadow-xl animate-pop ${
// 									result === "No Luck" || result === "Try Again"
// 										? "bg-gradient-to-br from-gray-100 to-gray-200"
// 										: "bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200"
// 								}`}
// 							>
// 								{result === "No Luck" || result === "Try Again" ? (
// 									<>
// 										<p className="text-7xl mb-4 animate-bounce">😢</p>
// 										<p className="text-4xl font-black text-gray-800 mb-2">
// 											Oops! Try Again!
// 										</p>
// 										<p className="text-xl font-bold text-gray-600">
// 											Better luck next time! 🍀
// 										</p>
// 									</>
// 								) : (
// 									<>
// 										<div className="flex justify-center mb-4">
// 											{[...Array(3)].map((_, i) => (
// 												<Star
// 													key={i}
// 													className="text-yellow-400 animate-bounce"
// 													size={48}
// 													fill="currentColor"
// 													style={{ animationDelay: `${i * 0.1}s` }}
// 												/>
// 											))}
// 										</div>
// 										<p className="text-5xl font-black text-orange-600 mb-4">
// 											🎊 WINNER! 🎊
// 										</p>
// 										<p className="text-3xl font-bold text-gray-800 mb-3">
// 											You Won:
// 										</p>
// 										<div className="bg-white py-5 px-8 rounded-2xl shadow-inner mb-4 border-4 border-yellow-400">
// 											<p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
// 												{result}
// 											</p>
// 										</div>
// 										<div className="bg-green-400 text-white py-4 px-6 rounded-2xl font-black text-xl">
// 											✨ Show this screen to claim your prize! ✨
// 										</div>
// 									</>
// 								)}
// 							</div>
// 						)}
// 					</>
// 				)}
// 			</div>

// 			{/* Footer */}
// 			<div className="mt-8 text-center relative z-10">
// 				<div className="bg-white rounded-2xl py-4 px-8 shadow-xl border-4 border-purple-300">
// 					<p className="text-purple-800 font-black text-xl">
// 						🎆 Celebrate with our exclusive cracker collection! 🎆
// 					</p>
// 				</div>
// 			</div>

// 			<style>{`
// 				@keyframes twinkle {
// 					0%, 100% { opacity: 0.3; transform: scale(1); }
// 					50% { opacity: 1; transform: scale(1.2); }
// 				}

// 				@keyframes confetti-drop {
// 					0% { transform: translateY(0) rotate(0deg); opacity: 1; }
// 					100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
// 				}

// 				@keyframes pop {
// 					0% { transform: scale(0.5); opacity: 0; }
// 					50% { transform: scale(1.1); }
// 					100% { transform: scale(1); opacity: 1; }
// 				}

// 				@keyframes pulse-slow {
// 					0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
// 					50% { box-shadow: 0 0 0 20px rgba(74, 222, 128, 0); }
// 				}

// 				.animate-twinkle {
// 					animation: twinkle ease-in-out infinite;
// 				}

// 				.animate-pop {
// 					animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
// 				}

// 				.animate-pulse-slow {
// 					animation: pulse-slow 2s ease-in-out infinite;
// 				}
// 			`}</style>
// 		</div>
// 	);
// };

// export default SpinWheel;

// import React, { useState } from "react";

// const SpinWheel = () => {
// 	const [selectedMode, setSelectedMode] = useState("without");
// 	const [mustSpin, setMustSpin] = useState(false);
// 	const [prizeNumber, setPrizeNumber] = useState(0);

// 	const dataWithoutCoupon = [
// 		{
// 			option: "₹20 OFF",
// 			style: { backgroundColor: "#f44336", textColor: "white" },
// 		},
// 		{
// 			option: "Try Again",
// 			style: { backgroundColor: "#ffeb3b", textColor: "#333" },
// 		},
// 		{
// 			option: "₹50 OFF",
// 			style: { backgroundColor: "#4caf50", textColor: "white" },
// 		},
// 		{
// 			option: "10% OFF",
// 			style: { backgroundColor: "#2196f3", textColor: "white" },
// 		},
// 		{
// 			option: "Better Luck Next Time",
// 			style: { backgroundColor: "#ff9800", textColor: "white" },
// 		},
// 	];

// 	const dataWithCoupon = [
// 		{
// 			option: "Free Gift Pack",
// 			style: { backgroundColor: "#673ab7", textColor: "white" },
// 		},
// 		{
// 			option: "₹100 OFF",
// 			style: { backgroundColor: "#009688", textColor: "white" },
// 		},
// 		{
// 			option: "20% OFF",
// 			style: { backgroundColor: "#3f51b5", textColor: "white" },
// 		},
// 		{
// 			option: "Try Again",
// 			style: { backgroundColor: "#ff5722", textColor: "white" },
// 		},
// 		{
// 			option: "Special Prize",
// 			style: { backgroundColor: "#e91e63", textColor: "white" },
// 		},
// 	];

// 	const currentData =
// 		selectedMode === "with" ? dataWithCoupon : dataWithoutCoupon;

// 	const handleSpinClick = () => {
// 		if (!mustSpin) {
// 			const newPrizeNumber = Math.floor(Math.random() * currentData.length);
// 			setPrizeNumber(newPrizeNumber);
// 			setMustSpin(true);
// 		}
// 	};

// 	return (
// 		<div style={{ textAlign: "center", marginTop: 30 }}>
// 			<h1>🎡 Spin & Win!</h1>

// 			<div style={{ marginBottom: 20 }}>
// 				<label style={{ marginRight: 15 }}>
// 					<input
// 						type="radio"
// 						name="mode"
// 						value="without"
// 						checked={selectedMode === "without"}
// 						onChange={() => setSelectedMode("without")}
// 					/>{" "}
// 					Without Coupon
// 				</label>
// 				<label>
// 					<input
// 						type="radio"
// 						name="mode"
// 						value="with"
// 						checked={selectedMode === "with"}
// 						onChange={() => setSelectedMode("with")}
// 					/>{" "}
// 					With Coupon
// 				</label>
// 			</div>

// 			<div style={{ position: "relative", display: "inline-block" }}>
// 				<Wheel
// 					mustStartSpinning={mustSpin}
// 					prizeNumber={prizeNumber}
// 					data={currentData}
// 					outerBorderColor={["#ff9800"]}
// 					outerBorderWidth={8}
// 					innerBorderColor={["#ffffff"]}
// 					radiusLineColor={["#ffffff"]}
// 					radiusLineWidth={2}
// 					textDistance={60}
// 					fontSize={16}
// 					onStopSpinning={() => setMustSpin(false)}
// 				/>
// 				<div
// 					style={{
// 						position: "absolute",
// 						top: -15,
// 						left: "50%",
// 						transform: "translateX(-50%)",
// 						width: 0,
// 						height: 0,
// 						borderLeft: "15px solid transparent",
// 						borderRight: "15px solid transparent",
// 						borderBottom: "25px solid red",
// 					}}
// 				></div>
// 			</div>

// 			<div>
// 				<button
// 					onClick={handleSpinClick}
// 					style={{
// 						marginTop: 25,
// 						padding: "10px 25px",
// 						backgroundColor: "#2196f3",
// 						color: "white",
// 						fontWeight: "bold",
// 						border: "none",
// 						borderRadius: "10px",
// 						cursor: mustSpin ? "not-allowed" : "pointer",
// 					}}
// 					disabled={mustSpin}
// 				>
// 					{mustSpin ? "Spinning..." : "Spin Now"}
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default SpinWheel;

import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";

import { Button, Spinner, Form } from "react-bootstrap";

const SpinWheel = () => {
	const [mode, setMode] = useState("withoutCoupon"); // 'withCoupon' or 'withoutCoupon'
	const [rewards, setRewards] = useState([]);
	const [mustSpin, setMustSpin] = useState(false);
	const [prizeNumber, setPrizeNumber] = useState(0);
	const [loading, setLoading] = useState(false);
	const [selectedReward, setSelectedReward] = useState(null);

	// 🔄 Fetch rewards from backend when mode changes
	const fetchRewards = async () => {
		try {
			setLoading(true);
			const API_URL = import.meta.env.VITE_API_URL;
			const response = await fetch(`${API_URL}/rewards?mode=${mode}`);
			const data = await response.json();

			// expect: [{ name: "10% OFF" }, { name: "Free 1 Box" }]
			setRewards(data.map((r) => r.name));
			setLoading(false);
		} catch (err) {
			console.error("Error fetching rewards:", err);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRewards();
	}, [mode]);

	// 🌀 Spin handler
	const handleSpin = () => {
		if (rewards.length === 0) return alert("No rewards found!");
		const randomIndex = Math.floor(Math.random() * rewards.length);
		setPrizeNumber(randomIndex);
		setMustSpin(true);
	};

	// 🎁 On stop spinning
	const handleStopSpinning = () => {
		setMustSpin(false);
		setSelectedReward(rewards[prizeNumber]);
		// alert(`🎉 You won: ${rewards[prizeNumber]}!`);
	};

	return (
		<div className="d-flex flex-column align-items-center mt-4">
			<h2 className="fw-bold mb-3">
				<span role="img" aria-label="sparkles">
					🎡
				</span>{" "}
				Spin & Win!
			</h2>

			{/* Mode Selector */}
			<div className="mb-3">
				<Form.Check
					inline
					label="Without Coupon"
					type="radio"
					id="withoutCoupon"
					checked={mode === "withoutCoupon"}
					onChange={() => setMode("withoutCoupon")}
				/>
				<Form.Check
					inline
					label="With Coupon"
					type="radio"
					id="withCoupon"
					checked={mode === "withCoupon"}
					onChange={() => setMode("withCoupon")}
				/>
			</div>

			{/* Loading Spinner */}
			{loading ? (
				<Spinner animation="border" variant="primary" />
			) : (
				<>
					{/* Roulette Wheel */}
					<div style={{ position: "relative" }}>
						{/* Pointer Arrow */}
						<div
							style={{
								width: 0,
								height: 0,
								borderLeft: "10px solid transparent",
								borderRight: "10px solid transparent",
								borderBottom: "20px solid red",
								position: "absolute",
								top: "-25px",
								left: "50%",
								transform: "translateX(-50%)",
								zIndex: 10,
							}}
						></div>

						<Wheel
							mustStartSpinning={mustSpin}
							prizeNumber={prizeNumber}
							data={rewards.map((reward) => ({ option: reward }))}
							backgroundColors={["#f87171", "#fde047", "#4ade80", "#60a5fa"]}
							textColors={["#000"]}
							onStopSpinning={handleStopSpinning}
							perpendicularText
							spinDuration={0.5}
							radiusLineColor="#f97316"
							outerBorderColor="#f97316"
							outerBorderWidth={8}
						/>
					</div>

					{/* Spin Button */}
					<Button
						variant="primary"
						className="mt-3"
						onClick={handleSpin}
						disabled={mustSpin || rewards.length === 0}
					>
						{mustSpin ? "Spinning..." : "Spin Now"}
					</Button>

					{/* Show Reward */}
					{selectedReward && (
						<div className="mt-3 alert alert-success text-center w-75">
							You won: <strong>{selectedReward}</strong> 🎉
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default SpinWheel;
