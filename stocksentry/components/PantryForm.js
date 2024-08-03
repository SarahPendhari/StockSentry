// src/components/PantryForm.js

import { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper, Typography } from '@mui/material';

const PantryForm = ({ addItem, updateItem, itemToEdit }) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setItemName(itemToEdit.itemName);
      setQuantity(itemToEdit.quantity);
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemName && quantity) {
      if (itemToEdit) {
        // Update existing item
        updateItem({ ...itemToEdit, itemName, quantity });
      } else {
        // Add new item
        addItem({ itemName, quantity });
      }
      // Clear form fields
      setItemName('');
      setQuantity('');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        {itemToEdit ? 'Edit Pantry Item' : 'Add New Pantry Item'}
      </Typography>
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
        <Button variant="contained" color="primary" type="submit">
          {itemToEdit ? 'Update Item' : 'Add Item'}
        </Button>
      </Box>
    </Paper>
  );
};

export default PantryForm;
