import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import axios from "axios";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

const Item = ({ title, to, icon, selected, setSelected, onClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title);
        if (onClick) onClick();
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {to && <Link to={to} />}
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const imageDataUrl = process.env.PUBLIC_URL + '/image/islah.jpg';
 
  // State to hold user data
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  // Fetch user data from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user1'));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await client.post('/user/logout'); // Adjust the URL to your actual logout endpoint
      localStorage.removeItem('user'); // Clear user data from local storage
      navigate('/'); // Redirect to home page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
 
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]} fontWeight="bold">
                  Job<br />Match
                  <span style={{ color: 'yellow', fontWeight: 'bold' }}>+</span>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt=""
                  width="100px"
                  height="100px"
                  src={user.image || imageDataUrl} // Use user image or default
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}`: 'User Name'} {/* User name */}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Administrator
                </Typography>
              </Box>
            </Box>
          )}
        
          <Box paddingLeft={isCollapsed ? undefined : "10%"} sx={{
            marginTop:'80px',
            height:'290px'
          }}>
            <Item
              title="Dashboard"
              to="/dash"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            
            
           
            <Item
              title="Manage Offre"
              to="/list2"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="LogOut"
              icon={<PieChartOutlineOutlinedIcon />}
              onClick={handleLogout}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
