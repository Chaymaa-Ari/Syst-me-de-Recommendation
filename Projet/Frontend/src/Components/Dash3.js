// OffresParTitreBarChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const OffresParTitreBarChart = () => {
  const [offresParTitre, setOffresParTitre] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/offertitle')
      .then(response => {
        setOffresParTitre(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the offers!", error);
        setError("An error occurred while fetching the offers.");
      });
  }, []);

  return (
    <Box m="20px" sx={{marginTop:'-285px',height:'50px',marginLeft:'50px',width:'950px'}}>
      {error && <Typography color="error">{error}</Typography>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
    
          data={offresParTitre}
          margin={{
            top: -20, right: 30, left: 550, bottom: 9,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="nombre_offres" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OffresParTitreBarChart;