import './Sign.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const client = axios.create({
  baseURL: "http://127.0.0.1:8000/"
});
function Sign() {
  const svgData = encodeURIComponent(`
  <svg enable-background="new 0 0 300 302.5" version="1.1" viewBox="0 0 300 302.5" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
    <style type="text/css">
      .st01{fill:#fff;}
    </style>
    <path class="st01" d="m126 302.2c-2.3 0.7-5.7 0.2-7.7-1.2l-105-71.6c-2-1.3-3.7-4.4-3.9-6.7l-9.4-126.7c-0.2-2.4 1.1-5.6 2.8-7.2l93.2-86.4c1.7-1.6 5.1-2.6 7.4-2.3l125.6 18.9c2.3 0.4 5.2 2.3 6.4 4.4l63.5 110.1c1.2 2 1.4 5.5 0.6 7.7l-46.4 118.3c-0.9 2.2-3.4 4.6-5.7 5.3l-121.4 37.4zm63.4-102.7c2.3-0.7 4.8-3.1 5.7-5.3l19.9-50.8c0.9-2.2 0.6-5.7-0.6-7.7l-27.3-47.3c-1.2-2-4.1-4-6.4-4.4l-53.9-8c-2.3-0.4-5.7 0.7-7.4 2.3l-40 37.1c-1.7 1.6-3 4.9-2.8 7.2l4.1 54.4c0.2 2.4 1.9 5.4 3.9 6.7l45.1 30.8c2 1.3 5.4 1.9 7.7 1.2l52-16.2z"/>
  </svg>
`);

  const imageDataUrl = `data:image/svg+xml,${svgData}`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  function submitLogin(e) {
    e.preventDefault();
    client.post(
      "/user/login",
      {

        email: email,
        password: password
      }
    ).then(function(res) {
      // Handle successful login here
      console.log("Server response:", res.data); 
      localStorage.setItem('user', JSON.stringify(res.data)); // Storing user data
      localStorage.setItem('userEmail', email);
      console.log("Login successful");
      navigate('/recommendation');

      

    }).catch(function(error) {
      // Handle login error here
      console.error("Login failed", error);
    });
  }

  return (
    <div className="container">
      <div className="sign">
        <div className="session">
          <div className="left">
            <div>
            <img src={imageDataUrl} alt="SVG" />
            </div>
          </div>
          <form className="log-in" onSubmit={submitLogin}>
            <h4>We are Job<span>Match+</span></h4>
            <p>Welcome back! Log in to your account to view today's offres:</p>
            <div className="floating-label">
              <input placeholder="Email" type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
              <label htmlFor="email">Email</label>
              <div className="icon">
                <div>
                  {/* Your SVG image for email */}
                </div>
              </div>
            </div>
            <div className="floating-label">
              <input placeholder="Password" type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
              <label htmlFor="password">Password</label>
              <div className="icon">
                <div>
                  {/* Your SVG image for password */}
                </div>
              </div>
            </div>
            <br />
            <br />
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <a className="button3" href="/inscrire">Sign Up</a>
                  </td>
                  <td></td>
                  <td>
                    <button className="button2" type="submit">Sign in</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <a href="/" className="discrete" target="_blank"> </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sign;
