// import React, { useEffect, useState } from "react";
// import {
// 	BarChart,
// 	Bar,
// 	XAxis,
// 	YAxis,
// 	Tooltip,
// 	ResponsiveContainer,
// 	CartesianGrid,
// 	LineChart,
// 	Line,
// } from "recharts";
// import { Card, Spinner, Row, Col } from "react-bootstrap";

// const SalesAnalytics = () => {
// 	const [data, setData] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [summary, setSummary] = useState({ total: 0, avg: 0, count: 0 });

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			try {
// 				const API_URL = import.meta.env.VITE_API_URL;
// 				const res = await fetch(`${API_URL}/analytics/sales`);
// 				const json = await res.json();
// 				if (json.success) {
// 					setData(json.data);

// 					// Summary
// 					const total = json.data.reduce((sum, d) => sum + d.totalAmount, 0);
// 					const count = json.data.reduce((sum, d) => sum + d.count, 0);
// 					const avg = total / count || 0;
// 					setSummary({ total, avg, count });
// 				}
// 			} catch (err) {
// 				console.error("Error fetching analytics:", err);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
// 		fetchData();
// 	}, []);

// 	if (loading)
// 		return (
// 			<div className="d-flex justify-content-center mt-5">
// 				<Spinner animation="border" variant="primary" />
// 			</div>
// 		);

// 	return (
// 		<div className="container my-5">
// 			<h3 className="fw-bold mb-4 text-center">🎆 3-Day Sales Analytics</h3>

// 			{/* Summary Cards */}
// 			<Row className="mb-4 text-center">
// 				<Col md={4}>
// 					<Card className="shadow-sm">
// 						<Card.Body>
// 							<h5>Total Sales</h5>
// 							<h3>₹{summary.total.toFixed(2)}</h3>
// 						</Card.Body>
// 					</Card>
// 				</Col>
// 				<Col md={4}>
// 					<Card className="shadow-sm">
// 						<Card.Body>
// 							<h5>Average Sale</h5>
// 							<h3>₹{summary.avg.toFixed(2)}</h3>
// 						</Card.Body>
// 					</Card>
// 				</Col>
// 				<Col md={4}>
// 					<Card className="shadow-sm">
// 						<Card.Body>
// 							<h5>Total Spins</h5>
// 							<h3>{summary.count}</h3>
// 						</Card.Body>
// 					</Card>
// 				</Col>
// 			</Row>

// 			{/* Bar Chart for Total Sales per Day */}
// 			<Card className="shadow-sm mb-4 p-3">
// 				<h5 className="text-center">💰 Total Sales Per Day</h5>
// 				<ResponsiveContainer width="100%" height={300}>
// 					<BarChart data={data}>
// 						<CartesianGrid strokeDasharray="3 3" />
// 						<XAxis dataKey="_id" />
// 						<YAxis />
// 						<Tooltip />
// 						<Bar dataKey="totalAmount" fill="#4ade80" name="Total Amount" />
// 					</BarChart>
// 				</ResponsiveContainer>
// 			</Card>

// 			{/* Line Chart for Average Sales per Day */}
// 			<Card className="shadow-sm p-3">
// 				<h5 className="text-center">📈 Average Sale Amount Per Day</h5>
// 				<ResponsiveContainer width="100%" height={300}>
// 					<LineChart data={data}>
// 						<CartesianGrid strokeDasharray="3 3" />
// 						<XAxis dataKey="_id" />
// 						<YAxis />
// 						<Tooltip />
// 						<Line
// 							type="monotone"
// 							dataKey="averageAmount"
// 							stroke="#60a5fa"
// 							strokeWidth={3}
// 							dot={{ r: 5 }}
// 							name="Avg Amount"
// 						/>
// 					</LineChart>
// 				</ResponsiveContainer>
// 			</Card>
// 		</div>
// 	);
// };

// export default SalesAnalytics;

import React, { useEffect, useState } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	LineChart,
	Line,
} from "recharts";
import {
	Card,
	Spinner,
	Row,
	Col,
	Table,
	Button,
	Form,
	Modal,
} from "react-bootstrap";

const SalesAnalytics = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState({ total: 0, avg: 0, count: 0 });
	const [results, setResults] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [editData, setEditData] = useState({});
	const API_URL = import.meta.env.VITE_API_URL;

	// Fetch analytics
	const fetchAnalytics = async () => {
		try {
			const res = await fetch(`${API_URL}/analytics/sales`);
			const json = await res.json();
			if (json.success) {
				setData(json.data);
				const total = json.data.reduce((sum, d) => sum + d.totalAmount, 0);
				const count = json.data.reduce((sum, d) => sum + d.count, 0);
				const avg = total / count || 0;
				setSummary({ total, avg, count });
			}
		} catch (err) {
			console.error("Error fetching analytics:", err);
		}
	};

	// Fetch spin results
	const fetchResults = async () => {
		try {
			const res = await fetch(`${API_URL}/results`);
			const json = await res.json();
			if (json.success) setResults(json.data);
		} catch (err) {
			console.error("Error fetching results:", err);
		}
	};

	useEffect(() => {
		(async () => {
			await fetchAnalytics();
			await fetchResults();
			setLoading(false);
		})();
	}, []);

	// Delete result
	const deleteResult = async (id) => {
		if (!window.confirm("Are you sure you want to delete this entry?")) return;
		try {
			await fetch(`${API_URL}/results/${id}`, { method: "DELETE" });
			await fetchResults();
			await fetchAnalytics();
		} catch (err) {
			console.error("Error deleting:", err);
		}
	};

	// Edit result
	const openEdit = (r) => {
		setEditData(r);
		setShowModal(true);
	};

	const handleEditSave = async () => {
		try {
			await fetch(`${API_URL}/results/${editData._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(editData),
			});
			setShowModal(false);
			await fetchResults();
			await fetchAnalytics();
		} catch (err) {
			console.error("Error updating:", err);
		}
	};

	if (loading)
		return (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" variant="primary" />
			</div>
		);

	return (
		<div className="container my-5">
			<h3 className="fw-bold mb-4 text-center">🎆 3-Day Sales Dashboard</h3>

			{/* Summary Cards */}
			<Row className="mb-4 text-center">
				<Col md={4}>
					<Card className="shadow-sm">
						<Card.Body>
							<h5>Total Sales</h5>
							<h3>₹{summary.total.toFixed(2)}</h3>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className="shadow-sm">
						<Card.Body>
							<h5>Average Sale</h5>
							<h3>₹{summary.avg.toFixed(2)}</h3>
						</Card.Body>
					</Card>
				</Col>
				<Col md={4}>
					<Card className="shadow-sm">
						<Card.Body>
							<h5>Total Spins</h5>
							<h3>{summary.count}</h3>
						</Card.Body>
					</Card>
				</Col>
			</Row>

			{/* Bar Chart */}
			<Card className="shadow-sm mb-4 p-3">
				<h5 className="text-center">💰 Total Sales Per Day</h5>
				<ResponsiveContainer width="100%" height={300}>
					<BarChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="_id" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="totalAmount" fill="#4ade80" name="Total Amount" />
					</BarChart>
				</ResponsiveContainer>
			</Card>

			{/* Line Chart */}
			<Card className="shadow-sm mb-5 p-3">
				<h5 className="text-center">📈 Average Sale Amount Per Day</h5>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="_id" />
						<YAxis />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="averageAmount"
							stroke="#60a5fa"
							strokeWidth={3}
							dot={{ r: 5 }}
							name="Avg Amount"
						/>
					</LineChart>
				</ResponsiveContainer>
			</Card>

			{/* 🧾 Manage Results Section */}
			<h4 className="fw-bold mb-3 text-center">🎯 Manage Spins & Sales</h4>
			<Card className="shadow-sm mb-5">
				<Card.Body>
					<Table striped bordered hover responsive>
						<thead>
							<tr>
								<th>Date</th>
								<th>Mode</th>
								<th>Reward</th>
								<th>Amount (₹)</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{results.map((r) => (
								<tr key={r._id}>
									<td>{new Date(r.date).toLocaleDateString()}</td>
									<td>{r.mode}</td>
									<td>{r.reward}</td>
									<td>{r.amount}</td>
									<td>
										<Button
											variant="warning"
											size="sm"
											className="me-2"
											onClick={() => openEdit(r)}
										>
											Edit
										</Button>
										<Button
											variant="danger"
											size="sm"
											onClick={() => deleteResult(r._id)}
										>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</Card.Body>
			</Card>

			{/* Edit Modal */}
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Spin Result</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Mode</Form.Label>
							<Form.Control
								value={editData.mode || ""}
								onChange={(e) =>
									setEditData({ ...editData, mode: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Reward</Form.Label>
							<Form.Control
								value={editData.reward || ""}
								onChange={(e) =>
									setEditData({ ...editData, reward: e.target.value })
								}
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Amount</Form.Label>
							<Form.Control
								type="number"
								value={editData.amount || ""}
								onChange={(e) =>
									setEditData({
										...editData,
										amount: Number(e.target.value),
									})
								}
							/>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Cancel
					</Button>
					<Button variant="primary" onClick={handleEditSave}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default SalesAnalytics;
