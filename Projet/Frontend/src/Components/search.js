import React, { useState, useEffect } from 'react';
import { Card,Modal,Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './search.css'; 
import { Box } from "@mui/material";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

function App2() {
  const location = useLocation();
  const navigate = useNavigate();


  const handleApply = (Title) => {
    navigate('/Apply', { state: { Title } });
  };

  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState("")
  const [selectedJob, setSelectedJob] = useState(null);
  const handleSeeMore = (job) => {
    setSelectedJob(job);
};
const imageDataUrl = process.env.PUBLIC_URL + '/image/etoile.png';
const handleClose = () => {
    setSelectedJob(null);
};
  
const handleAddToFavorites = (job) => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) {
        axios.post("http://127.0.0.1:8000/user/add_to_favoris", {
            email: userEmail,
            job: job
        })
        .then((response) => {
            console.log(response.data);
            if (response.data.success) {
                alert("Job added to favorites successfully.");
            } else {
                alert("Error: " + response.data.error);
            }
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
    const searchLocation = location.state?.location || "Armenia"; // Default to "Yerevan" if not provided
    client
      .get(`/user/search?location=${searchLocation}`)
      .then((response) => {
        console.log(response.data);

        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            alert(`No jobs found for location: ${searchLocation}`);}
          setRecommendations(response.data);
          setError("");
        } else {
          setError("Data received is not in the correct format.");
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again later.");
        console.error(error); // Log any errors to console for debugging
      });
  }, [location.state]);
  return (
    <Box m="20px">
    <div className="App">
      <header className="App-header">
       {error && <p>{error}</p>}
        <div className="card-container">
          {recommendations.map((job, index) => (
            <Card  key={index} style={{ width: '30rem', margin: '1rem' ,backgroundColor:'white'}}>
              <Card.Body >
                <Card.Title>JobTitle : {job.Title}</Card.Title>
                <Card.Text>Date: {job.date}</Card.Text>
                <Card.Text>Company: {job.Company}</Card.Text>
                <Card.Text className="yellow-background">Location: {job.Location}</Card.Text>
                <Card.Text>Description: {job.JobDescription}</Card.Text>
                <Card.Text>Required Qualification: {job.RequiredQual}</Card.Text> 
                <button className="outline-primary" style={{marginLeft: '140px'}} onClick={() => handleSeeMore(job)} >See More</button>
                <button className="custom-button" style={{marginLeft: '10px'}} onClick={() => handleApply(job.Title)}>Apply</button>
                
                <button style={{ border: 'none', background: 'none', padding: 0 }} onClick={() => handleAddToFavorites(job)}>
                                        <img src={imageDataUrl} alt="etoile" style={{ width: '30px', height: '30px', marginLeft: '10px', marginTop: '-3px' }} />
                </button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </header>
    </div>
    <Modal className="modal1" style={{width:'1300px'}} show={!!selectedJob} onHide={handleClose}>
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

export default App2;