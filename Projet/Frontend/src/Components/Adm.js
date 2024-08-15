import React from "react";
import Topbar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Topbar.js";
import Sidebar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Sidebar.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";
import RecommendationList from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/RecommendationList.js";
import './Adm.css';
import{ Route,Routes} from 'react-router-dom'
import Profil from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Profil.js';
function Adm() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
            <Sidebar />
            
            <main className="content">
            <Topbar /> 
              <Routes>
                <Route path="/" element={<RecommendationList/>} />
                <Route path="/profil" element={<Profil/>} />  
              </Routes>
            </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Adm;
