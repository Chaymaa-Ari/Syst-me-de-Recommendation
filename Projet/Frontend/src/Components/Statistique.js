import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Statistique.css'
const CountDataCard = () => {
    const [data, setData] = useState({
        total_users: 0,
        total_postulations: 0,
        total_offers: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const imageurl = process.env.PUBLIC_URL + '/image/job-promotion(1).png';
    const imageurl1 = process.env.PUBLIC_URL + '/image/gens.png';
    const imageurl2 = process.env.PUBLIC_URL + '/image/postuler-a-un-emploi.png';

   
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/user/count-data/')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="count-data-container">
            <div className="card">
                <img alt="hi" src={imageurl} className="off1"/>
                <h3>Total Offers</h3>
                <p>{data.total_offers}</p>
                
            </div>
            <div className="card">
            <img alt="hi" src={imageurl1} className="off1"/>
            <h3>Total Users</h3>
                <p>{data.total_users}</p>
                
            </div>
            <div className="card">
            <img alt="hi" src={imageurl2} className="off1"/>
            <h3>Total Postulations</h3>
                <p>{data.total_postulations}</p>
            </div>
        </div>
    );
};

export default CountDataCard;
