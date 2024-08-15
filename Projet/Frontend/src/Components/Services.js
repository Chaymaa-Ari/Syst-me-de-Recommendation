
import './Services.css';
import React from 'react';

function Services() {
  return (
    
  <section id="services" class="services">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Services</h2>
        <p>Check our Services</p>
      </div>

      <div class="row">
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
          <div class="icon-box">
            <div class="icon"><i class="bx bxl-dribbble" id="num">1</i></div>
            <h4><a href="/">Registration</a></h4>
            <p>create a detailed profile by providing information such as their professional experience, skills, employment.
 A complete profile helps the site recommend relevant job openings.</p>
          </div>
        </div>

        <div class="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
          <div class="icon-box">
            <div class="icon"><i class="bx bxl-dribbble" id="num">2</i></div>
            <h4><a href="/">Personalized Recommendations </a></h4>
            <p>A job recommendation system to recommend positions that best match skills, 
              experience and professional preferences of each user </p>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
          <div class="icon-box">
            <div class="icon"><i class="bx bx-file"  id ="num">3</i></div>
            <h4><a href="/">Advanced Search</a></h4>
            <p>filter job offers based on specific criteria such as industry, location, 
              etc. This helps users quickly find the offers that best suit their needs.</p>
          </div>
        </div>
</div>
       
    </div>
  </section>
  );
}

export default Services;

















