import React from "react";
import Topbar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Topbar.js";
import Sidebar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Sidebar.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";
import './Adm.css';

import List from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/list.js';
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
              <List/>
            </main>
          
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Adm;
