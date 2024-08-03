import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button } from '@mui/material';

const PantryForm = ({ currentId, setCurrentId, items, setItems }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      const itemRef = doc(db, 'pantry', currentId);
      await updateDoc(itemRef, { name, quantity });
      setItems(items.map(item => (item.id === currentId ? { id: currentId, name, quantity } : item)));
      setCurrentId(null);
    } else {
      const docRef = await addDoc(collection(db, 'pantry'), { name, quantity });
      setItems([...items, { id: docRef.id, name, quantity }]);
    }

    setName('');
    setQuantity('');
  };

  const handleDelete = async (id) => {
    const itemRef = doc(db, 'pantry', id);
    await deleteDoc(itemRef);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {currentId ? 'Update Item' : 'Add Item'}
      </Button>
      {currentId && (
        <Button onClick={() => setCurrentId(null)} variant="contained" color="secondary" fullWidth>
          Cancel
        </Button>
      )}
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name} - {item.quantity}</span>
          <Button onClick={() => setCurrentId(item.id)} variant="outlined">Edit</Button>
          <Button onClick={() => handleDelete(item.id)} variant="outlined" color="secondary">Delete</Button>
        </div>
      ))}
    </form>
  );
};

export default PantryForm;
