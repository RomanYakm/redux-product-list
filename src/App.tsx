import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ProductList } from './components/ProductList';
import { SingleProductPage } from './components/SingleProductPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:productId" element={<SingleProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
