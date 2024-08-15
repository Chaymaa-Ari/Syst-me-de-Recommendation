// import { useState } from "react";
// import { Routes, Route } from "react-router-dom";
import Topbar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Topbar1.js";
import Sidebar from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Sidebar1.js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";
import './Adm.css';
import Dashboard from 'D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Dashboard.js';
import Stati from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Statistique.js";
import Dash1 from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Dash1.js";
import Dash2 from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Dash2.js";
import Dash3 from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Dash3.js";

//import Calendar from "./scenes/calendar/calendar";

function Adm() {


    const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
         <Sidebar/>
          <main className="content">
            <Topbar />
            <Dashboard/>
            <Stati className="stat"/>
            <Dash1/>
            <Dash2/>
            <Dash3/>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
   
  );
}

export default Adm;
