import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import PantryForm from '../components/PantryForm';
import PantryFilter from '../components/PantryFilter';

export default function Home() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'pantry'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(itemsData);
      setFilteredItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Pantry Items</h1>
      <PantryFilter setFilteredItems={setFilteredItems} items={items} />
      <PantryForm currentId={currentId} setCurrentId={setCurrentId} items={items} setItems={setItems} />
      <div>
        {filteredItems.map(item => (
          <div key={item.id}>
            <span>{item.name} - {item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
