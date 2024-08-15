import React from "react";
import Topbar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Topbar.js";
import Sidebar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Sidebar.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";
import Favoris from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Favoris.js";
import './Favoris1.css';
function Favoris1() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
        
            <Sidebar />
            
            <main className="content">
            <Topbar /> 
             <Favoris/>
            </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Favoris1;
