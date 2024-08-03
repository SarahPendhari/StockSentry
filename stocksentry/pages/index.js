// src/pages/index.js

import React, { useState } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Paper, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import WebcamCapture from '../components/WebcamCapture';
import PantryForm from '../components/PantryForm';
import PantryFilter from '../components/PantryFilter';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { detectGroceryItem } from '../utils/detectGrocery';

const Home = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [detectionResult, setDetectionResult] = useState([]);

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

  // const handleCapture = async (imageSrc) => {
  //   try {
  //     const detectedItems = await detectGroceryItem(imageSrc);
  //     setDetectionResult(detectedItems);

  //     detectedItems.forEach(async (item) => {
  //       await addDoc(collection(db, 'pantry'), {
  //         item: item.class,
  //         timestamp: new Date()
  //       });
  //     });

  //     console.log('Detected items:', detectedItems);
  //   } catch (error) {
  //     console.error('Error detecting items:', error);
  //   }
  // };

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
      
      {/* <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>Capture and Detect Grocery Items</Typography>
        <WebcamCapture onCapture={handleCapture} />
        {detectionResult.length > 0 && (
          <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
            <Typography variant="h6" gutterBottom>Detection Results</Typography>
            <List>
              {detectionResult.map((item, index) => (
                <ListItem key={index} sx={{ borderBottom: '1px solid #ddd' }}>
                  <ListItemText primary={`Detected item: ${item.class}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box> */}
    </Container>
  );
};

export default Home;
