
import './Team.css';
import React from 'react';


function Team() {
   
  return (
    
    <section id="team" class="team">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Team</h2>
        <p>Check our Team</p>
      </div>

      <div class="row">

        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
          <div class="member" data-aos="fade-up" data-aos-delay="100">
            <div class="member-img">
           
             <div class="social">
                <a href="/"><i class="bi bi-facebook"> </i></a>
                <a href="https://www.linkedin.com/in/chaymaa-ari/"><i class="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/yma_a_cha?igsh=MXhlMWtuMmp6aWh6cg=="><i class="bi bi-instagram"></i></a>
              </div>
            </div>
            <div class="member-info">
              <h4>Chaymaa Ari</h4>
              <span>IT & Data Student</span>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
          <div class="member" data-aos="fade-up" data-aos-delay="200">
            <div class="member-img2">
               <div class="social">
                <a href="/"><i class="bi bi-twitter"></i></a>
                <a href="https://www.linkedin.com/in/khadija-assag/"><i class="bi bi-facebook"></i></a>
                <a href="/"><i class="bi bi-instagram"></i></a>
                 </div>
            </div>
            <div class="member-info">
              <h4>Assag Khadija</h4>
              <span>IT & Data Student</span>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
          <div class="member" data-aos="fade-up" data-aos-delay="300">
            <div class="member-img3">
             <div class="social">
                <a href="/"><i class="bi bi-twitter"></i></a>
                <a href="https://www.linkedin.com/in/zineb-islah-3b756125a/"><i class="bi bi-facebook"></i></a>
                <a href="/"><i class="bi bi-instagram"></i></a>
                </div>
            </div>
            <div class="member-info">
              <h4>Zineb Islah</h4>
              <span>IT & Data Student</span>
            </div>
          </div>
        </div>

        <div class="col-lg-3 col-md-6 d-flex align-items-stretch">
          <div class="member" data-aos="fade-up" data-aos-delay="400">
            <div class="member-img1">
              
              <div class="social">
                <a href="/"><i class="bi bi-twitter"></i></a>
                <a href="https://www.linkedin.com/in/sara-ait-brik-08296925a/"><i class="bi bi-facebook"></i></a>
                <a href="/"><i class="bi bi-instagram"></i></a>
               </div>
            </div>
            <div class="member-info">
              <h4>Sara Ait Brik</h4>
              <span>IT & Data Student</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </section>
  );
}

export default Team;
