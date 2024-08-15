import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {useState } from "react";
const Topbar = () => {
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const handleSearch = async () => {
    if (searchValue.trim() === "") {
      alert("Please enter a location.");
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/user/search?location=${searchValue}`);
      console.log("Search Results:", response.data);
      navigate('/search', { state: {location: searchValue } });
    } catch (error) {
      console.error("Error during search:", error);
      
    }
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
