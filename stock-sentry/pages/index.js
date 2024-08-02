// pages/index.js
import Head from 'next/head';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const handleSearch = (query) => {
    // Implement search/filter logic here
  };

  return (
    <div>
      <Head>
        <title>StockSentry</title>
      </Head>
      <h1>StockSentry</h1>
      <PantryForm />
      <SearchBar onSearch={handleSearch} />
      <PantryList />
    </div>
  );
};

export default Home;
