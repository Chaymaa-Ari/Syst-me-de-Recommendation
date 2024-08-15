import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
//import logo from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/cta-bg.jpg';
import './Postuler.css';
import { useNavigate } from 'react-router-dom';

function Apply() {
  
  const location = useLocation();
  const jobTitle = location.state?.Title || '';
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    cv: null,
    lettre_motivation: null,
    domaine: jobTitle // Set the job title as the initial value for the domaine
  });

  useEffect(() => {
    
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        nom: userData.last_name || '',
        prenom: userData.first_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        domaine:jobTitle
      }));
      console.log(formData)
      
    }
  }, [location.state,formData, jobTitle]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      
      const response = await axios.post(`http://127.0.0.1:8000/user/apply`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        alert('Postulation avec succès');
        navigate('/recommendation')
      }
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <section style={{
      backgroundColor:'white',
      justifyContent: 'center',
      width:'700px',
      height:'480px',
      borderRadius:'5px',
      marginLeft:'160px',
      
    }}>
           
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center ">
          <div className="col-lg-8">
            <div className="my-5 rounded-3" >
             
              <div className=" px-5" style={{marginLeft:'-100px',marginTop:'-30px'}} >
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Apply</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="nom" className="form-label">Nom</label>
                      <input type="text" className="form-control mb-4" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="prenom" className="form-label2">Prénom</label>
                      <input type="text" className="form-control mb-4" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control mb-4" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-4" >
                      <label htmlFor="telephone" className="form-label2">Téléphone</label>
                      <input type="text" className="form-control mb-4" id="telephone" name="telephone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="domaine" className="form-label">Domaine</label>
                      <input type="text" className="form-control mb-4" id="domaine" name="domaine" value={formData.domaine} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="cv" className="form-label1">CV</label>
                      <input type="file" className="form-control mb-4" id="cv" name="cv" onChange={handleFileChange} required />
                    </div>
                  </div>
                  <div className="row">
                    
                    <div className="col-md-6 ">
                      <label htmlFor="lettre_motivation" className="form-label3">Lettre de Motivation</label>
                      <input type="file" className="form-control mb-4" id="lettre_motivation" name="lettre_motivation" onChange={handleFileChange} required />
                    </div>
                    
                    <div className="col-md-6 mb-4">
                      <button className="btn mb-4" type="submit" id="but">Apply</button>
  
                    </div>
                  </div>
                  
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Apply;