// src/components/EditItemDialog.js

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditItemDialog = ({ item, onUpdateItem, onClose }) => {
  const [updatedItem, setUpdatedItem] = useState({ ...item });

  const handleChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onUpdateItem(updatedItem);
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Item Name"
          name="itemName"
          value={updatedItem.itemName}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Quantity"
          name="quantity"
          value={updatedItem.quantity}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditItemDialog;
