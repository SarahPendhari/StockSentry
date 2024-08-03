// src/components/PantryForm.js
import { useState } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const PantryForm = ({ addItem }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName && quantity) {
      addItem({ itemName, quantity });
      setItemName('');
      setQuantity('');
    }
  };

  return (
    <Paper elevation={3}>
      <Typography variant="h6" gutterBottom>Add New Pantry Item</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit">Add Item</Button>
      </Box>
    </Paper>
  );
};

export default PantryForm;
