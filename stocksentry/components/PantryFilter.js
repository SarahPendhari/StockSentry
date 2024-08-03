// src/components/PantryFilter.js
import { useState } from 'react';
import { Box, TextField, Paper, Typography } from '@mui/material';

const PantryFilter = ({ setFilteredItems, items }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredItems(items.filter(item => item.itemName.toLowerCase().includes(term)));
  };

  return (
    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
      <Typography variant="h6" gutterBottom>Filter Pantry Items</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Search Items"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
    </Paper>
  );
};

export default PantryFilter;
