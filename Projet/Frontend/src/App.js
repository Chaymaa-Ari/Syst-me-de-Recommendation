import React  from 'react';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'

import{BrowserRouter as Router,Route,Routes} from 'react-router-dom'

import Layout from 'D:/IID2/S2/Projet tuto/Django/frontend/src/hocs/Layout.js';

import Home from './Components/Home.js';
import Sign1 from './Components/Sign1.js';
import Sign from './Components/Sign.js';
import Adm from './Components/Adm.js';
import Adm1 from './Components/Adm1.js';
import Inscrire from './Components/Inscrire.js';
import PostulerAdm from './Components/PostulerAdm.js';
import PostulerAdm2 from './Components/PostulerAdm2.js';
import ListAdm from './Components/listadm.js';
import Search from './Components/searchAdm.js';
import Profil1 from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Profil1.js';
import Favoris1 from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Favoris1.js';
import AddOffre2Adm from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/AddOffre2Adm.js';
import List2 from './Components/ListOffreAdm.js';
import Stat from './Components/Statistique.js';
import Ana from './Components/UpdateOffreAdm.js';
function App() {
  
  return (
   
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><Sign /></Layout>} />
        <Route path="/inscrire" element={<Layout><Inscrire /></Layout>} />
        <Route path="/recommendation" element={<Adm />} />
        <Route path="/Apply" element={<PostulerAdm />} />
        <Route path="/profil" element={<Profil1/>} />
        <Route path="/favoris" element={<Favoris1/>} />
        <Route path="/addoffre" element={<AddOffre2Adm/>} />
        <Route path="/login1" element={<Layout><Sign1 /></Layout>} />
        <Route path="/dash" element={<Adm1 />} />
        <Route path="/list1" element={<ListAdm />} />
        <Route path="/search" element={<Search />} />
        <Route path="/list2" element={<List2 />} />
        <Route path="/stat" element={<Stat/>} />
        <Route path="/ana" element={<Ana/>} />
        <Route path="/apply1" element={<PostulerAdm2/>} />
        
      </Routes>
    </Router> 
  );
}

export default App;
