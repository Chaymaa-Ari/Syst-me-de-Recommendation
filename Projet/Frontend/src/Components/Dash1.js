// OffresParVillePieChart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871'];

const OffresParVillePieChart = () => {
  const [offresParVille, setOffresParVille] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/user/offerville')
      .then(response => {
        setOffresParVille(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the offers!", error);
        setError("An error occurred while fetching the offers.");
      });
  }, []);

  return (
    <Box m="5px" sx={{marginTop:'40px',height:'65px', marginLeft:'-100px'}}>
      {error && <Typography color="error">{error}</Typography>}
      <ResponsiveContainer width="50%" height={300}>
        <PieChart>
          <Pie
            data={offresParVille}
            dataKey="nombre_offres"
            nameKey="ville"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {offresParVille.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OffresParVillePieChart;