import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";

function About() {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="col-lg-6 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay="100">
            <h3>Who We Are ?</h3>
            <br></br>
            <p>
            JobMatch is an innovative online platform dedicated to simplifying <br></br> the job searchprocess by providing personalized job recommendations.<br></br>  Designed for job seekers of all backgrounds, from beginners to <br></br> experienced professionals, JobMatch analyzes each user's skills, <br></br>experience and preferences,providing them with a targeted<br></br> and relevant list of job opportunities.
              </p>
          </div>
          <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay="100" id="img">
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
