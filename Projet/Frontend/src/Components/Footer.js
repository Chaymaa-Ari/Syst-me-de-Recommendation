
import './Footer.css';
import React from 'react';


function Team() {
   
  return (
    
    <footer id="footer">
      
    <div class="footer-top">
      <div class="container">
        <div class="row">

          <div class="col-lg-3 col-md-6">
            <div class="footer-info">
              <h3>JOB<span>MATCH+</span></h3>
              <p>
              BP 77 Bd Beni Amir<br></br>
              Khouribga 25000 , Morocco<br></br><br></br>
                <strong>Phone:</strong> 07 62 62 69 39<br></br>
                <strong>Email:</strong> chaymaa.ari2002@gmail.com<br></br>
              </p>
              
            </div>
          </div>

          <div class="col-lg-2 col-md-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="/">Home</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="/">About us</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="/">Services</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="/">Terms of service</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="/">Privacy policy</a></li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li><i class="bx bx-chevron-right"></i> <a href="/">Registration</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="/">Personalized Recommendations</a></li>
              <li><i class="bx bx-chevron-right"></i> <a href="/">Advanced Search</a></li>
             
            </ul>
          </div>

          <div class="col-lg-4 col-md-6 footer-newsletter">
            <h4>Our Newsletter</h4>
            
            <form action="" method="post">
              <input type="email" name="email"/><input type="submit" value="Subscribe"/>
            </form>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>JobMatch+</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
         </div>
    </div>
  </footer>
    
  );
}

export default Team;
