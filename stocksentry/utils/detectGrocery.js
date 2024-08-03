// utils/detectGrocery.js

import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

export const detectGroceryItem = async (image) => {
  const img = new Image();
  img.src = image;

  return new Promise((resolve, reject) => {
    img.onload = async () => {
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      
      // Filter predictions for grocery items
      const groceryItems = ['apple', 'banana', 'orange', 'milk', 'bread']; // List of grocery items
      const detectedItems = predictions.filter(pred => groceryItems.includes(pred.class));
      
      resolve(detectedItems);
    };

    img.onerror = (error) => reject(error);
  });
};
