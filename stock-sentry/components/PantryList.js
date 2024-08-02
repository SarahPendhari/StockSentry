// components/PantryList.js
import { useEffect, useState } from 'react';
import { getPantryItems, deletePantryItem } from '../pages/api/pantry';

const PantryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getPantryItems();
      setItems(items);
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    await deletePantryItem(id);
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name} - {item.quantity}
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default PantryList;
