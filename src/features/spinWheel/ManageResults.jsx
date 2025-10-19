import React, { useEffect, useState } from "react";
import { Table, Button, Form, Spinner, Modal } from "react-bootstrap";

const ManageResults = () => {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [editData, setEditData] = useState({});

	const API_URL = import.meta.env.VITE_API_URL;

	// Fetch results
	const fetchResults = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${API_URL}/results`);
			const json = await res.json();
			if (json.success) setResults(json.data);
		} catch (err) {
			console.error("Error fetching results:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchResults();
	}, []);

	// Delete result
	const deleteResult = async (id) => {
		if (!window.confirm("Delete this entry?")) return;
		try {
			await fetch(`${API_URL}/results/${id}`, { method: "DELETE" });
			fetchResults();
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
			fetchResults();
		} catch (err) {
			console.error("Error updating:", err);
		}
	};

	if (loading)
		return (
			<div className="d-flex justify-content-center mt-5">
				<Spinner animation="border" />
			</div>
		);

	return (
		<div className="container mt-4">
			<h3 className="text-center fw-bold mb-4">🎯 Manage Spins & Sales</h3>

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

export default ManageResults;
