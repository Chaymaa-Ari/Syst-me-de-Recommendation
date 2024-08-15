import React from 'react';
import axios from 'axios';
import { Container, Grid, GridRow, GridColumn, Button } from 'semantic-ui-react';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify'; 
import Header from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Header.js';
import UserInformations from './UserInformations';
import UserPhoto from './UserPhoto';
import UserResume from './UserResume';
import { Box } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        const userData = JSON.parse(localStorage.getItem('user')) || {};
        console.log('userData:', userData);
        this.state = {
            id: userData.id ||'',
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            phone: userData.phone || '',
            domain: userData.domain || '',
            email: userData.email || '',
            city: userData.city || '',
            degree: userData.degree || '',
            description: userData.description || '',
            cv: userData.cv || '',
            image: userData.image || '',
        };
        
                
    }

    updateState = (key, value) => {
        this.setState({ [key]: value });
    }

    handleUpdateUser = () => {
        const {id, first_name, last_name, phone, domain, email, city, degree, description, image, cv } = this.state;

        if (!first_name || !last_name || !domain || !email || !degree) {
            toast.error('First name, last name, email, domain, and degree must be filled.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        const userInfo = { id ,first_name, last_name, phone, domain, email, city, degree, description, image, cv };

        axios.post('http://127.0.0.1:8000/user/update-profile/', userInfo)
            .then(response => {
                localStorage.setItem('user', JSON.stringify(userInfo));
                toast.success('Profile updated successfully!');
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.error('There was an error updating the profile!', error);
                toast.error('Error updating profile.');
            });
    }

    render() {
        const { first_name, last_name, phone, domain, email, city, degree, description, image, cv } = this.state;

        return (
            <Box m="20px">
                <Header title="Profile" subtitle="Welcome back to your profile" />

                <Container style={{ marginTop: '40px' }}>
                    <div style={{ maxWidth: '900px', margin: '0 auto', border: '1px solid #ccc', padding: '20px' }}>
                        <Grid columns='equal'>
                            <GridRow stretched>
                                <GridColumn>
                                    <UserInformations
                                        first_name={first_name}
                                        last_name={last_name}
                                        phone={phone}
                                        domain={domain}
                                        email={email}
                                        city={city}
                                        degree={degree}
                                        description={description}
                                        updateState={this.updateState}
                                    />
                                </GridColumn>
                                <GridColumn width={4}>
                                    <UserPhoto
                                        image={image}
                                        updateState={this.updateState}
                                    />
                                    <UserResume
                                        cv={cv}
                                        updateState={this.updateState}
                                    />
                                    <br/>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ display: 'inline-block' }}>
                                            <Button positive style={{ backgroundColor: '#FFC451', color: 'white' }} onClick={this.handleUpdateUser}>UPDATE</Button>
                                        </div>
                                    </div>
                                </GridColumn>
                            </GridRow>
                        </Grid>
                    </div>
                </Container>
            </Box>
        );
    }
}

export default Profile;
