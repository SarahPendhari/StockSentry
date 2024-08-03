import { useState } from 'react';
import { TextField } from '@mui/material';

const PantryFilter = ({ setFilteredItems, items }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredItems(items.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())));
  };

  return (
    <TextField
      label="Search"
      value={searchTerm}
      onChange={handleSearch}
      fullWidth
      margin="normal"
    />
  );
};

export default PantryFilter;
