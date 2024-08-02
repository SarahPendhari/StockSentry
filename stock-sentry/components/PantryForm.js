// components/PantryForm.js
import { useState } from 'react';

const PantryForm = ({ onSubmit, initialValues = {} }) => {
  const [name, setName] = useState(initialValues.name || '');
  const [quantity, setQuantity] = useState(initialValues.quantity || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, quantity });
    setName('');
    setQuantity('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default PantryForm;
