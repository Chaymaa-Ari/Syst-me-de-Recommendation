import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import './UserInformations.css'; 

class UserInformations extends React.Component {
    handleChange = (e) => {
        const { name, value } = e.target;
        this.props.updateState(name, value);
    };

    render() {
        const { first_name, last_name, phone, domain, email, city, degree, description } = this.props;

        return (
            <div className="segment">
                <form className="form">
                    <div className="form-group">
                        <div className="form-input">
                            <label htmlFor="first-name">First name</label>
                            <input
                                type="text"
                                id="first-name"
                                name="first_name"
                                placeholder="First name"
                                value={first_name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="last-name">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                name="last_name"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-input">
                            <label htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                id="mobile"
                                name="phone"
                                placeholder="Mobile"
                                value={phone}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-input">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City"
                                value={city}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="domaine">Domaine</label>
                            <input
                                type="text"
                                id="domaine"
                                name="domain"
                                placeholder="Domaine"
                                value={domain}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-input">
                        <label htmlFor="degree">Degree</label>
                        <input
                            type="text"
                            id="degree"
                            name="degree"
                            placeholder="Degree"
                            value={degree}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-input">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default UserInformations;
