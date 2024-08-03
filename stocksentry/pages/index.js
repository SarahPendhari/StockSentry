// src/pages/index.js

import React, { useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, IconButton, ListItemSecondaryAction, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import WebcamCapture from '../components/WebcamCapture';
import PantryForm from '../components/PantryForm';
import PantryFilter from '../components/PantryFilter';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import EditItemDialog from '../components/EditItemDialog';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const addItem = async (item) => {
    const docRef = await addDoc(collection(db, 'pantry'), item);
    setItems([...items, { ...item, id: docRef.id }]);
    setFilteredItems([...items, { ...item, id: docRef.id }]);
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'pantry', id));
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    setFilteredItems(updatedItems);
  };

  const handleEditItem = (item) => {
    setEditItem(item);
  };

  const updateItem = async (updatedItem) => {
    const itemRef = doc(db, 'pantry', updatedItem.id);
    await updateDoc(itemRef, updatedItem);
    const updatedItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item));
    setItems(updatedItems);
    setFilteredItems(updatedItems);
    setEditItem(null);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>StockSentry</Typography>
      <PantryForm addItem={addItem} />
      <PantryFilter setFilteredItems={setFilteredItems} items={items} />
      
      <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
        <Typography variant="h6" gutterBottom>Pantry Items</Typography>
        <List>
          {filteredItems.map((item) => (
            <ListItem key={item.id} sx={{ borderBottom: '1px solid #ddd' }}>
              <ListItemText primary={item.itemName} secondary={`Quantity: ${item.quantity}`} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditItem(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>

      {editItem && <EditItemDialog item={editItem} onUpdateItem={updateItem} onClose={() => setEditItem(null)} />}
    </Container>
  );
};

export default Home;
