import HeroSection from './HeroSection.js';
import React from 'react';
import Service from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Services.js';
import Team from './Team.js';
import Footer from './Footer.js';
import About from './About.js';
function Home() {
  return (
    <div>
     <HeroSection/>
     <About/>
     <br></br><br></br><br></br><br></br><br></br>
     <Service/>
     <Team/>
     <Footer/>
 </div>
  );
}

export default Home;
