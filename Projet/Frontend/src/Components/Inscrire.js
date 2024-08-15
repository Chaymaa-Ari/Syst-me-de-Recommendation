import React, { useState } from 'react';
import './Inscrire.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});

function Inscrire() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setSex] = useState('');
  const [city, setCity] = useState('');
  const [domain, setDomain] = useState('');
  const [degree, setDegree] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);
  const [cv, setCv] = useState(null);
  const navigate = useNavigate();
  function submitRegistration(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('phone', phone);
    formData.append('sex', sex);
    formData.append('city', city);
    formData.append('domain', domain);
    formData.append('degree', degree);
    formData.append('description', description);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    if (image) formData.append('image', image);
    if (cv) formData.append('cv', cv);

    client.post("/user/register", formData)
      .then((res) => {
        console.log("User registered successfully");
        navigate('/login');
      })
      .catch((error) => {
        console.error("There was an error with the registration", error);
        window.alert("There was an error with the registration");
     
      });
  }

  return (
    <div className="A">
      
      <div className="signup__container">
        <div className="container__child signup__thumbnail">
          <div className="thumbnail__logo"></div>
          <div className="thumbnail__content text-center">
            <br></br><br></br><br></br>
            <br></br><br></br>
            <br></br><br></br>
            <h1 className="heading--primary" style={{color:"white",marginLeft: '30px'}}>Welcome to JobMatch<span>+</span></h1>
            <h2 className="heading--secondary"style={{color:"white",marginLeft: '30px'}}>Are you ready to join the elite?</h2>
          </div>
          <div className="thumbnail__links"></div>
          <div className="signup__overlay"></div>
        </div>
        <div className="container__child signup__form">
          <form onSubmit={submitRegistration}>
            <table>
              <tr>
                <td>
                  <div className="inputbox">
                    <input required type="text" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <span>Last Name</span>
                    <i></i>
                  </div>
                </td>
                <td>
                  <div className="inputbox">
                    <input required type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    <span>First Name</span>
                    <i></i>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="inputbox">
                    <input required type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <span>Email</span>
                    <i></i>
                  </div>
                </td>
                <td>
                  <div className="inputbox">
                    <input required type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                    <span>Phone</span>
                    <i></i>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="inputbox">
                    <input required type="text" name="city" value={city} onChange={e => setCity(e.target.value)} />
                    <span>City</span>
                    <i></i>
                  </div>
                </td>
                <td>
                  <div className="sexe">
                    <label id="labelSexe">Sex</label>
                    <select required value={sex} onChange={e => setSex(e.target.value)}>
                      <option value="">Select an option</option>
                      <option value="femme">Female</option>
                      <option value="homme">Male</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="inputbox">
                    <input required type="text" name="degree" value={degree} onChange={e => setDegree(e.target.value)} />
                    <span>Degree</span>
                    <i></i>
                  </div>
                </td>
                <td>
                  <div className="inputbox">
                    <input required type="text" name="domain" value={domain} onChange={e => setDomain(e.target.value)} />
                    <span>Domain</span>
                    <i></i>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="inputbox">
                    <textarea required name="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <span>Description</span>
                    <i></i>
                  </div>
                </td>
                <td>
                  <div className="image">
                    <label>Picture</label>
                    <input required type="file" name="image" onChange={e => setImage(e.target.files[0])} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="input2">
                    <input required type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <span>Password</span>
                    <i></i>
                  </div>
                </td>
                <td>
                  <div className="input2">
                    <input required type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <span>Confirm Password</span>
                    <i></i>
                  </div>
                </td>
              </tr>
              <tr><td><br></br></td></tr>
              <tr>
                <td>
                  <div className="image">
                    <label>CV</label>
                    <input required type="file" name="cv" onChange={e => setCv(e.target.files[0])} />
                  </div>
                </td>
                <td>
                  <br />
                  <input className="btn btn--form float-right" type="submit" value="Register" />
                </td>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inscrire;
