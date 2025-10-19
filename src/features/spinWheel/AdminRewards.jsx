import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL; // Vite

const AdminRewards = () => {
	const [mode, setMode] = useState("withoutCoupon");
	const [rewards, setRewards] = useState([]);
	const [newReward, setNewReward] = useState("");

	const fetchRewards = async () => {
		const { data } = await axios.get(`${API_URL}/rewards?mode=${mode}`);
		setRewards(data);
	};

	useEffect(() => {
		fetchRewards();
	}, [mode]);

	const addReward = async () => {
		if (!newReward.trim()) return;
		await axios.post(`${API_URL}/rewards`, { name: newReward, mode });
		setNewReward("");
		fetchRewards();
	};

	const deleteReward = async (id) => {
		await axios.delete(`${API_URL}/rewards/${id}`);
		fetchRewards();
	};

	return (
		<div className="p-6 flex flex-col items-center">
			<h2 className="text-2xl font-bold mb-4">🎯 Manage Spin Rewards</h2>

			<div className="flex gap-4 mb-6">
				<label>
					<input
						type="radio"
						value="withoutCoupon"
						checked={mode === "withoutCoupon"}
						onChange={() => setMode("withoutCoupon")}
					/>
					<span className="ml-2">Without Coupon</span>
				</label>
				<label>
					<input
						type="radio"
						value="withCoupon"
						checked={mode === "withCoupon"}
						onChange={() => setMode("withCoupon")}
					/>
					<span className="ml-2">With Coupon</span>
				</label>
			</div>

			<div className="flex gap-3 mb-4">
				<input
					type="text"
					placeholder="Add new reward"
					value={newReward}
					onChange={(e) => setNewReward(e.target.value)}
					className="border px-3 py-2 rounded"
				/>
				<button
					onClick={addReward}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
				>
					Add
				</button>
			</div>

			<ul className="w-64">
				{rewards.map((r) => (
					<li
						key={r._id}
						className="flex justify-between items-center bg-yellow-100 px-4 py-2 mb-2 rounded"
					>
						<span>{r.name}</span>
						<button
							onClick={() => deleteReward(r._id)}
							className="text-red-500 font-bold"
						>
							✕
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminRewards;
