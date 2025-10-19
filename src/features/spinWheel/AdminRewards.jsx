// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL; // Vite

// const AdminRewards = () => {
// 	const [mode, setMode] = useState("withoutCoupon");
// 	const [rewards, setRewards] = useState([]);
// 	const [newReward, setNewReward] = useState("");
// 	const [price, setPrice] = useState(""); // ✅ new state

// 	const fetchRewards = async () => {
// 		const { data } = await axios.get(`${API_URL}/rewards?mode=${mode}`);
// 		setRewards(data);
// 	};

// 	useEffect(() => {
// 		fetchRewards();
// 	}, [mode]);

// 	const addReward = async () => {
// 		if (!newReward.trim()) return;
// 		await axios.post(`${API_URL}/rewards`, { name: newReward, mode });
// 		setNewReward("");
// 		fetchRewards();
// 	};

// 	const deleteReward = async (id) => {
// 		await axios.delete(`${API_URL}/rewards/${id}`);
// 		fetchRewards();
// 	};

// 	return (
// 		<div className="p-6 flex flex-col items-center">
// 			<h2 className="text-2xl font-bold mb-4">🎯 Manage Spin Rewards</h2>

// 			<div className="flex gap-4 mb-6">
// 				<label>
// 					<input
// 						type="radio"
// 						value="withoutCoupon"
// 						checked={mode === "withoutCoupon"}
// 						onChange={() => setMode("withoutCoupon")}
// 					/>
// 					<span className="ml-2">Without Coupon</span>
// 				</label>
// 				<label>
// 					<input
// 						type="radio"
// 						value="withCoupon"
// 						checked={mode === "withCoupon"}
// 						onChange={() => setMode("withCoupon")}
// 					/>
// 					<span className="ml-2">With Coupon</span>
// 				</label>
// 			</div>

// 			<div className="flex gap-3 mb-4">
// 				<input
// 					type="text"
// 					placeholder="Add new reward"
// 					value={newReward}
// 					onChange={(e) => setNewReward(e.target.value)}
// 					className="border px-3 py-2 rounded"
// 				/>
// 				<button
// 					onClick={addReward}
// 					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// 				>
// 					Add
// 				</button>
// 			</div>

// 			<ul className="w-64">
// 				{rewards.map((r) => (
// 					<li
// 						key={r._id}
// 						className="flex justify-between items-center bg-yellow-100 px-4 py-2 mb-2 rounded"
// 					>
// 						<span>{r.name}</span>
// 						<button
// 							onClick={() => deleteReward(r._id)}
// 							className="text-red-500 font-bold"
// 						>
// 							✕
// 						</button>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default AdminRewards;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const API_URL = import.meta.env.VITE_API_URL;

// const AdminRewards = () => {
// 	const [mode, setMode] = useState("withoutCoupon");
// 	const [rewards, setRewards] = useState([]);
// 	const [newReward, setNewReward] = useState("");
// 	const [price, setPrice] = useState(""); // ✅ new state

// 	const fetchRewards = async () => {
// 		const { data } = await axios.get(`${API_URL}/rewards?mode=${mode}`);
// 		setRewards(data);
// 	};

// 	useEffect(() => {
// 		fetchRewards();
// 	}, [mode]);

// 	const addReward = async () => {
// 		if (!newReward.trim() || !price)
// 			return alert("Please enter name and price");

// 		await axios.post(`${API_URL}/rewards`, { name: newReward, mode, price });
// 		setNewReward("");
// 		setPrice("");
// 		fetchRewards();
// 	};

// 	const deleteReward = async (id) => {
// 		await axios.delete(`${API_URL}/rewards/${id}`);
// 		fetchRewards();
// 	};

// 	return (
// 		<div className="p-6 flex flex-col items-center">
// 			<h2 className="text-2xl font-bold mb-4">🎯 Manage Spin Rewards</h2>

// 			{/* Mode Toggle */}
// 			<div className="flex gap-4 mb-6">
// 				<label>
// 					<input
// 						type="radio"
// 						value="withoutCoupon"
// 						checked={mode === "withoutCoupon"}
// 						onChange={() => setMode("withoutCoupon")}
// 					/>
// 					<span className="ml-2">Without Coupon</span>
// 				</label>
// 				<label>
// 					<input
// 						type="radio"
// 						value="withCoupon"
// 						checked={mode === "withCoupon"}
// 						onChange={() => setMode("withCoupon")}
// 					/>
// 					<span className="ml-2">With Coupon</span>
// 				</label>
// 			</div>

// 			{/* Input Fields */}
// 			<div className="flex gap-3 mb-4">
// 				<input
// 					type="text"
// 					placeholder="Reward name"
// 					value={newReward}
// 					onChange={(e) => setNewReward(e.target.value)}
// 					className="border px-3 py-2 rounded w-48"
// 				/>
// 				<input
// 					type="number"
// 					placeholder="Price"
// 					value={price}
// 					onChange={(e) => setPrice(e.target.value)}
// 					className="border px-3 py-2 rounded w-28"
// 				/>
// 				<button
// 					onClick={addReward}
// 					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// 				>
// 					Add
// 				</button>
// 			</div>

// 			{/* Reward List */}
// 			<ul className="w-72">
// 				{rewards.map((r) => (
// 					<li
// 						key={r._id}
// 						className="flex justify-between items-center bg-yellow-100 px-4 py-2 mb-2 rounded"
// 					>
// 						<div>
// 							<span className="font-semibold">{r.name}</span>
// 							<span className="text-sm text-gray-600 ml-2">₹{r.price}</span>
// 						</div>
// 						<button
// 							onClick={() => deleteReward(r._id)}
// 							className="text-red-500 font-bold"
// 						>
// 							✕
// 						</button>
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default AdminRewards;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;

// const AdminRewards = () => {
// 	const [mode, setMode] = useState("withoutCoupon");
// 	const [rewards, setRewards] = useState([]);
// 	const [newReward, setNewReward] = useState("");
// 	const [price, setPrice] = useState("");

// 	// edit mode states
// 	const [editingId, setEditingId] = useState(null);
// 	const [editName, setEditName] = useState("");
// 	const [editPrice, setEditPrice] = useState("");

// 	const fetchRewards = async () => {
// 		const { data } = await axios.get(`${API_URL}/rewards?mode=${mode}`);
// 		setRewards(data);
// 	};

// 	useEffect(() => {
// 		fetchRewards();
// 	}, [mode]);

// 	const addReward = async () => {
// 		if (!newReward.trim() || !price)
// 			return alert("Please enter name and price");

// 		await axios.post(`${API_URL}/rewards`, { name: newReward, mode, price });
// 		setNewReward("");
// 		setPrice("");
// 		fetchRewards();
// 	};

// 	const deleteReward = async (id) => {
// 		await axios.delete(`${API_URL}/rewards/${id}`);
// 		fetchRewards();
// 	};

// 	const startEdit = (r) => {
// 		setEditingId(r._id);
// 		setEditName(r.name);
// 		setEditPrice(r.price);
// 	};

// 	const cancelEdit = () => {
// 		setEditingId(null);
// 		setEditName("");
// 		setEditPrice("");
// 	};

// 	const saveEdit = async (id) => {
// 		if (!editName.trim() || !editPrice)
// 			return alert("Please enter valid name and price");
// 		await axios.put(`${API_URL}/rewards/${id}`, {
// 			name: editName,
// 			price: editPrice,
// 		});
// 		setEditingId(null);
// 		fetchRewards();
// 	};

// 	return (
// 		<div className="p-6 flex flex-col items-center">
// 			<h2 className="text-2xl font-bold mb-4">🎯 Manage Spin Rewards</h2>

// 			{/* Mode Toggle */}
// 			<div className="flex gap-4 mb-6">
// 				<label>
// 					<input
// 						type="radio"
// 						value="withoutCoupon"
// 						checked={mode === "withoutCoupon"}
// 						onChange={() => setMode("withoutCoupon")}
// 					/>
// 					<span className="ml-2">Without Coupon</span>
// 				</label>
// 				<label>
// 					<input
// 						type="radio"
// 						value="withCoupon"
// 						checked={mode === "withCoupon"}
// 						onChange={() => setMode("withCoupon")}
// 					/>
// 					<span className="ml-2">With Coupon</span>
// 				</label>
// 			</div>

// 			{/* Add Reward */}
// 			<div className="flex gap-3 mb-4">
// 				<input
// 					type="text"
// 					placeholder="Reward name"
// 					value={newReward}
// 					onChange={(e) => setNewReward(e.target.value)}
// 					className="border px-3 py-2 rounded w-48"
// 				/>
// 				<input
// 					type="number"
// 					placeholder="Price"
// 					value={price}
// 					onChange={(e) => setPrice(e.target.value)}
// 					className="border px-3 py-2 rounded w-28"
// 				/>
// 				<button
// 					onClick={addReward}
// 					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// 				>
// 					Add
// 				</button>
// 			</div>

// 			{/* Reward List */}
// 			<ul className="w-80">
// 				{rewards.map((r) => (
// 					<li
// 						key={r._id}
// 						className="flex justify-between items-center bg-yellow-100 px-4 py-2 mb-2 rounded"
// 					>
// 						{editingId === r._id ? (
// 							<>
// 								<div className="flex flex-col w-full">
// 									<input
// 										type="text"
// 										value={editName}
// 										onChange={(e) => setEditName(e.target.value)}
// 										className="border px-2 py-1 rounded mb-1"
// 									/>
// 									<input
// 										type="number"
// 										value={editPrice}
// 										onChange={(e) => setEditPrice(e.target.value)}
// 										className="border px-2 py-1 rounded"
// 									/>
// 								</div>
// 								<div className="flex gap-2 ml-2">
// 									<button
// 										onClick={() => saveEdit(r._id)}
// 										className="text-green-600 font-bold"
// 									>
// 										✔
// 									</button>
// 									<button
// 										onClick={cancelEdit}
// 										className="text-gray-500 font-bold"
// 									>
// 										✖
// 									</button>
// 								</div>
// 							</>
// 						) : (
// 							<>
// 								<div>
// 									<span className="font-semibold">{r.name}</span>
// 									<span className="text-sm text-gray-600 ml-2">₹{r.price}</span>
// 								</div>
// 								<div className="flex gap-2">
// 									<button
// 										onClick={() => startEdit(r)}
// 										className="text-blue-600 font-bold"
// 									>
// 										✎
// 									</button>
// 									<button
// 										onClick={() => deleteReward(r._id)}
// 										className="text-red-500 font-bold"
// 									>
// 										✕
// 									</button>
// 								</div>
// 							</>
// 						)}
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default AdminRewards;

import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminRewards = () => {
	const [mode, setMode] = useState("withoutCoupon");
	const [rewards, setRewards] = useState([]);
	const [newReward, setNewReward] = useState("");
	const [price, setPrice] = useState("");
	const [rewardType, setRewardType] = useState("discount");

	const [editingId, setEditingId] = useState(null);
	const [editName, setEditName] = useState("");
	const [editPrice, setEditPrice] = useState("");
	const [editType, setEditType] = useState("discount");

	const fetchRewards = async () => {
		const { data } = await axios.get(`${API_URL}/rewards?mode=${mode}`);
		setRewards(data);
	};

	useEffect(() => {
		fetchRewards();
	}, [mode]);

	const addReward = async () => {
		if (!newReward.trim()) return alert("Please enter reward name");

		const body = { name: newReward, mode, rewardType };
		if (rewardType === "freeGift") body.price = price;

		await axios.post(`${API_URL}/rewards`, body);
		setNewReward("");
		setPrice("");
		fetchRewards();
	};

	const deleteReward = async (id) => {
		await axios.delete(`${API_URL}/rewards/${id}`);
		fetchRewards();
	};

	const startEdit = (r) => {
		setEditingId(r._id);
		setEditName(r.name);
		setEditPrice(r.price || "");
		setEditType(r.rewardType);
	};

	const cancelEdit = () => {
		setEditingId(null);
		setEditName("");
		setEditPrice("");
		setEditType("discount");
	};

	const saveEdit = async (id) => {
		if (!editName.trim()) return alert("Enter reward name");
		const body = { name: editName, rewardType: editType };
		if (editType === "freeGift") body.price = editPrice;

		await axios.put(`${API_URL}/rewards/${id}`, body);
		setEditingId(null);
		fetchRewards();
	};

	return (
		<div className="p-6 flex flex-col items-center">
			<h2 className="text-2xl font-bold mb-4">🎯 Manage Spin Rewards</h2>

			{/* Mode Toggle */}
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

			{/* Add Reward */}
			<div className="flex flex-col gap-2 mb-4 w-80">
				<div className="flex gap-3">
					<input
						type="text"
						placeholder="Reward name"
						value={newReward}
						onChange={(e) => setNewReward(e.target.value)}
						className="border px-3 py-2 rounded w-48"
					/>
					<select
						value={rewardType}
						onChange={(e) => setRewardType(e.target.value)}
						className="border px-3 py-2 rounded"
					>
						<option value="discount">Discount</option>
						<option value="freeGift">Free Gift</option>
					</select>
				</div>
				{rewardType === "freeGift" && (
					<input
						type="number"
						placeholder="Gift price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="border px-3 py-2 rounded w-32"
					/>
				)}
				<button
					onClick={addReward}
					className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
				>
					Add Reward
				</button>
			</div>

			{/* Reward List */}
			<ul className="w-80">
				{rewards.map((r) => (
					<li
						key={r._id}
						className="flex justify-between items-center bg-yellow-100 px-4 py-2 mb-2 rounded"
					>
						{editingId === r._id ? (
							<div className="flex flex-col w-full gap-2">
								<div className="flex gap-2">
									<input
										type="text"
										value={editName}
										onChange={(e) => setEditName(e.target.value)}
										className="border px-2 py-1 rounded w-40"
									/>
									<select
										value={editType}
										onChange={(e) => setEditType(e.target.value)}
										className="border px-2 py-1 rounded"
									>
										<option value="discount">Discount</option>
										<option value="freeGift">Free Gift</option>
									</select>
								</div>
								{editType === "freeGift" && (
									<input
										type="number"
										value={editPrice}
										onChange={(e) => setEditPrice(e.target.value)}
										placeholder="Gift price"
										className="border px-2 py-1 rounded w-32"
									/>
								)}
								<div className="flex gap-2">
									<button
										onClick={() => saveEdit(r._id)}
										className="text-green-600 font-bold"
									>
										✔
									</button>
									<button
										onClick={cancelEdit}
										className="text-gray-600 font-bold"
									>
										✖
									</button>
								</div>
							</div>
						) : (
							<>
								<div>
									<span className="font-semibold">{r.name}</span>
									<span className="text-sm text-gray-600 ml-2">
										({r.rewardType})
									</span>
									{r.rewardType === "freeGift" && (
										<span className="ml-2 text-sm text-gray-600">
											₹{r.price}
										</span>
									)}
								</div>
								<div className="flex gap-2">
									<button
										onClick={() => startEdit(r)}
										className="text-blue-600 font-bold"
									>
										✎
									</button>
									<button
										onClick={() => deleteReward(r._id)}
										className="text-red-500 font-bold"
									>
										✕
									</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminRewards;
