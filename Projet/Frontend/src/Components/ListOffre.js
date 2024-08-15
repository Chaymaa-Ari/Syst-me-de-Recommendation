import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListOffre.css';

function ManageOffers() {
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user/offres/');
            setOffers(response.data);
        } catch (error) {
            console.error("There was an error fetching the offers!", error);
        }
    }

    const handleDelete = (postId) => {
        console.log('Deleting offer with ID:', postId);
        const csrftoken = getCookie('csrftoken');
        axios.delete(`http://127.0.0.1:8000/user/delete_offre/${postId}/`, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(() => {
            console.log('Offer deleted successfully');
            alert('Offer deleted');
            fetchOffers(); // Refresh the list of offers after deletion
        })
        .catch(error => {
            console.error('There was an error deleting the offer!', error);
        });
    }

    const handleEdit = (offer) => {
        navigate('/ana', { state: { offer } });
    }

    return (
        <div className="container">
            <table className="table2">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Diploma Required</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.map(offer => (
                        <tr key={offer.id}>
                            <td>{offer.jobTitle}</td>
                            <td>{offer.companyName}</td>
                            <td>{offer.companyAddress}</td>
                            <td>{offer.requiredDegree}</td>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span className="icon icon-trash" onClick={() => handleDelete(offer.id)}>🗑</span>
                                    <span className="icon icon-edit" onClick={() => handleEdit(offer)}>✏</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export default ManageOffers;
