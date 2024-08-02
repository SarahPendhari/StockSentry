// pages/api/pantry.js
import { db } from '../../lib/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const pantryCollection = collection(db, 'pantryItems');

export async function getPantryItems() {
  const snapshot = await getDocs(pantryCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addPantryItem(item) {
  await addDoc(pantryCollection, item);
}

export async function deletePantryItem(id) {
  await deleteDoc(doc(db, 'pantryItems', id));
}

export async function updatePantryItem(id, updatedItem) {
  await updateDoc(doc(db, 'pantryItems', id), updatedItem);
}
