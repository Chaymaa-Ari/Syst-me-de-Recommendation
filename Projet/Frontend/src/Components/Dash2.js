// UsersByDomainChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Doughnut} from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistrer les éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const UsersByDomainChart = () => {
  const [usersByDomain, setUsersByDomain] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/usersbydomain')
      .then(response => {
        setUsersByDomain(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user data!", error);
        setError("An error occurred while fetching the user data.");
      });
  }, []);

  const data = {
    labels: usersByDomain.map(item => item.domain),
    datasets: [{
      data: usersByDomain.map(item => item.nombre_users),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB'
      ],
      hoverBackgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0', '#9966FF', '#FF6384', '#36A2EB'
      ]
    }]
  };

  return (
    <Box m="10px" sx={{marginTop:'-30px',marginLeft:'230px',width:'560px'}}>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h4" gutterBottom></Typography>
      <Box display="flex" justifyContent="center">
        <Box width="50%" height={250}>
          <Doughnut data={data} />
        </Box>
      </Box>
    </Box>
  );
};

export default UsersByDomainChart;