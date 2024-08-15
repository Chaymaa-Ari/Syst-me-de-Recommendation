import { Box} from "@mui/material";
//import { tokens } from "../theme/theme.js";
import Header from "D:/IID2/S2/Projet tuto/Django/frontend/src/Components/Header.js";

const Dashboard = () => {
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="" />

        
    </Box>
    </Box>
  );
};

export default Dashboard;
