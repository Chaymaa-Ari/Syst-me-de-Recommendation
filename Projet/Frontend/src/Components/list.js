import React from 'react';
import './list.css';
import axios from 'axios';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

class List extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            offerRequests: []
        };
    }

    componentDidMount() {
        this.fetchOffers();
    }

    fetchOffers = () => {
        const userEmail = localStorage.getItem("userEmail");
        axios.get('http://127.0.0.1:8000/user/offers',{params:{ email: userEmail }})
            .then(response => {
                this.setState({ offerRequests: response.data });
            })
            .catch(error => {
                console.error("There was an error fetching the offers!", error);
            });
    }

    handleDelete = (postId) => {
        console.log('Deleting offer with ID:', postId);
        const csrftoken = getCookie('csrftoken');
        axios.delete(`http://127.0.0.1:8000/user/delete_offer/${postId}/`, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(() => {
            console.log('Offer deleted successfully');
            alert('Offer deleted');
            this.fetchOffers(); // Refresh the list of offers after deletion
        })
        .catch(error => {
            console.error('There was an error deleting the offer!', error);
        });
    }

    render() {
        return (
            <div className="list-container">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                
                                <th>Job Title</th>
                                <th>Date Offer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.offerRequests.map(request => (
                                <tr key={request.id}>
                                    <td>{request.nom}</td>
                                    <td>{request.prenom}</td>
                                    <td>{request.email}</td>
                                    
                                    <td>{request.domaine}</td>
                                    <td>{request.date_postulation}</td>
                                    <td className="trash-icon">

                                    <button   style={{ border: 'none', background: 'none', padding: 0 }} onClick={() => this.handleDelete(request.id)}>
                                        <img src={process.env.PUBLIC_URL + '/image/supprimer.png'} alt="etoile" style={{ width: '30px', height: '30px', marginTop: '-4px',marginLeft:'30px' }} />
                </button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

export default List;