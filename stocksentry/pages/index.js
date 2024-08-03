// src/pages/index.js
import { useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PantryForm from '../components/PantryForm';
import PantryFilter from '../components/PantryFilter';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

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
                <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Home;
