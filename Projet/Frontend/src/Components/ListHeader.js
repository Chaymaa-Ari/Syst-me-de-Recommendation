import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/theme/theme.js";
import { Link } from 'react-router-dom';
import './ListHeader.css';
const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" ,
        marginLeft: "20px"

        }}
      >
        {'Manage Offres'}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}
      sx={{ m: "0 0 5px 0" ,
      marginLeft: "20px"

      }}>
        {'Ready to have an idea about the offres'}
      </Typography>
      <Link to="/addoffre"> 
                        <button className="button6">Add Offer</button>
      </Link>
    </Box>
  );
};

export default Header;
