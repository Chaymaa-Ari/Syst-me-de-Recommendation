import React from 'react';
import NavBar from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/NavBar.js';
import { useLocation } from 'react-router-dom';

const Layout = (props) => {
  const location = useLocation();
  const showNavBar = location.pathname !== '/inscrire';

  return (
    <div>
      {showNavBar && <NavBar />}
      {props.children}
    </div>
  );
};

export default Layout;
