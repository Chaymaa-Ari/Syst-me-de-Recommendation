import React from "react";
import Topbar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Topbar.js";
import Sidebar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Sidebar.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";

import './Profil1.css';

import Profil from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Profil.js';
function Profil1() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
            <Sidebar />
            
            <main className="content">
            <Topbar /> 
              <Profil/>
            </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Profil1;
