import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import Header from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Header.js";
import { Card, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/RecommendationList.css';

function Recommendation() {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState("");
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate();
    const imageDataUrl = process.env.PUBLIC_URL + '/image/etoile.png';

   
    const handleApply = (Title) => {
        navigate('/apply', { state: { Title } });
       };

    const handleSeeMore = (job) => {
        setSelectedJob(job);
    };

    const handleClose = () => {
        setSelectedJob(null);
    };

    const handleAddToFavorites = (job) => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            axios.post("http://127.0.0.1:8000/user/add_to_favoris/", {
                email: userEmail,
                job: job
            })
            .then((response) => {
                console.log(response.data);
                alert("Job added to favorites successfully.");
            })
            .catch((error) => {
                console.error("Error adding job to favorites:", error);
                alert("An error occurred while adding the job to favorites.");
            });
        } else {
            setError("User email not found");
        }
    };

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            axios.post("http://127.0.0.1:8000/user/recommendation/", { email: userEmail }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setRecommendations(response.data);
                    setError("");
                } else {
                    setError("Data received is not in the correct format.");
                }
            })
            .catch((error) => {
                setError("An error occurred. Please try again later.");
                console.error(error);
            });
        } else {
            setError("User email not found");
        }
    }, []);

    return (
        <Box m="20px">
            <Header title="Job Recommendations" subtitle="Welcome back to your account" />
            <div className="App">
                <header className="App-header">
                    {error && <p>{error}</p>}
                    <div className="card-container1">
                        {recommendations.map((job, index) => (
                            <Card key={index} className="card1" style={{width:'420px',marginLeft:'40px', flex:'1 1 calc(50% - 16px)', /* Two cards per row, accounting for gap */
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: ' space-between', /* Ensure content is spaced correctly */
                            /* Additional styling for cards */
                            boxSizing: 'border-box',
                            backgroundColor:'white' }}>
                                <Card.Body>
                                    <Card.Title style={{fontSize:'bold'}}>JobTitle: {job.Title}</Card.Title>
                                    <Card.Text>Date: {job.date}</Card.Text>
                                    <Card.Text>Company: {job.Company}</Card.Text>
                                    <Card.Text>Location: {job.Location}</Card.Text>
                                    <Card.Text>Required Qualification: {job.RequiredQual}</Card.Text>
                                    <button className="outline-primary1" style={{marginLeft: '140px'}} onClick={() => handleSeeMore(job)}>See More</button>
                                    <button className="custom-button1" style={{marginLeft: '10px'}} onClick={() => handleApply(job.Title)} >Apply</button>
                                    
                                    <button style={{ border: 'none', background: 'none', padding: 0 }} onClick={() => handleAddToFavorites(job)}>
                                        <img src={imageDataUrl} alt="etoile" style={{ width: '30px', height: '30px', marginLeft: '10px',marginTop: '-5px' }} />
                                    </button>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </header>
            </div>

            <Modal className="modal" style={{width:'1300px'}} show={!!selectedJob} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">{selectedJob?.Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="modal-label"><span className="date-text">Date:</span> {selectedJob?.date}</p>
                    <p className="modal-label"><span className="company-text">Company:</span> {selectedJob?.Company}</p>
                    <p className="modal-label"><span className="description-text">Description:</span> {selectedJob?.jobpost}</p>
                    <p className="modal-label"><span className="company-text">Location:</span> {selectedJob?.Location}</p>
                    <p className="modal-label"><span className="qualification-text">Required Qualification:</span> {selectedJob?.RequiredQual}</p>
                    {/* Add any additional information here */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
}

export default Recommendation;



