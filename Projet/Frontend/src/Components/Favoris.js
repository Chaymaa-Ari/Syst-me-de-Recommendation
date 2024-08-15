import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Header from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Header.js";
import { Card, Modal, Button, Alert } from 'react-bootstrap';
import './Favoris.css';
import { useNavigate } from 'react-router-dom';
function GetUserFavoris() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const imageDataUrl = process.env.PUBLIC_URL + '/image/etoile(1).png';
    const navigate = useNavigate();
    const handleApply = () => {
        navigate('/apply1');
       };


    const handleSeeMore = (job) => {
        setSelectedJob(job);
    };

    const handleClose = () => {
        setSelectedJob(null);
    };

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            axios.post("http://127.0.0.1:8000/user/user_favoris/", { email: userEmail }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setFavorites(response.data);
                    setError("");
                } else {
                    setError("Data received is not in the correct format.");
                }
            })
            .catch((error) => {
                setError("An error occurred while fetching favorites. Please try again later.");
                console.error(error);
            });
        } else {
            setError("User email not found");
        }
    }, []);

    return (
        <Box m="20px">
            <Header title="Favorite Jobs" subtitle="Your saved job listings" />
            <div className="App">
                <header className="App-header">
                    {error && <Alert variant="danger">{error}</Alert>}
                    <div className="card-container">
                        {favorites.map((job, index) => (
                            <Card key={index} className="custom-card" style={{ width: '30rem', margin: '1rem' ,backgroundColor: 'white'}}>
                                <Card.Body>
                                    <Card.Title>JobTitle: {job.title}</Card.Title>
                                    <Card.Text>Date: {job.date}</Card.Text>
                                    <Card.Text>Company: {job.company}</Card.Text>
                                    <Card.Text>Location: {job.location}</Card.Text>
                                    <Card.Text>Required Qualification: {job.required_qual}</Card.Text>
                                    <button className="outline-primary" style={{marginLeft: '140px'}} onClick={() => handleSeeMore(job)}>See More</button>
                                    <button className="custom-button" style={{marginLeft: '10px'}} onClick={handleApply}>Apply</button>
                                    <button style={{ border: 'none', background: 'none', padding: 0 }} >
                                        <img src={imageDataUrl} alt="etoile" style={{ width: '30px', height: '30px', marginLeft: '10px', marginTop: '-5px' }} />
                                    </button>
                                    </Card.Body>
                            </Card>
                        ))}
                    </div>
                </header>
            </div>

            <Modal className="modal" style={{width:'1300px'}} show={!!selectedJob} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">{selectedJob?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-label"><span className="date-text">Date:</span> {selectedJob?.date}</p>
                    <p className="modal-label"><span className="company-text">Company:</span> {selectedJob?.company}</p>
                    <p className="modal-label"><span className="description-text">Description:</span> {selectedJob?.jobpost}</p>
                    <p className="modal-label"><span className="company-text">Location:</span> {selectedJob?.location}</p>
                    <p className="modal-label"><span className="qualification-text">Required Qualification:</span> {selectedJob?.required_qual}</p>
                    {/* Add any additional information here */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}

export default GetUserFavoris;
