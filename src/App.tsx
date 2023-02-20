import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { ProductList } from './components/ProductList';
import { SingleProductPage } from './components/SingleProductPage';
import { actions as productActions } from './features/products';
import { ProductState } from './types/ProductState';

function App() {
  const [newGoodTitle, setNewGoodTitle] = useState('');
  const [newGoodCount, setNewGoodCount] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [addProduct, setAddProduct] = useState(false);
  const [productId, setProductId] = useState('');
  const dispatch = useAppDispatch();

  const removeGood = (goodToRemove: ProductState) => {
    dispatch(productActions.delete(goodToRemove));
    const url = `http://localhost:8080/products/${goodToRemove.id}`;

    fetch(url, {
      method: 'DELETE',
    });
  };

  const addGood = (goodToAdd: ProductState) => {
    dispatch(productActions.add(goodToAdd));
    fetch('http://localhost:8080/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goodToAdd),
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const count = +newGoodCount;
    const id = Math.floor(Math.random() * 100);
    const weight = `${newWeight}g`;
    const imageUrl = newImageUrl;

    const product = {
      id,
      imageUrl,
      name: newGoodTitle,
      count,
      size: {
        width: 200,
        height: 200,
      },
      weight,
    };

    if (!product) {
      return;
    }

    addGood(product);
    setNewGoodCount('');
    setNewGoodTitle('');
    setNewImageUrl('');
    setNewWeight('');
    setAddProduct(!addProduct);
  };

  const updateGood = (goodToUpdate: ProductState) => {
    const url = `http://localhost:8080/products/${productId}`;

    dispatch(productActions.update(goodToUpdate));
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goodToUpdate),
    });
  };

  const navigate = useNavigate();

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();

    const count = +newGoodCount;
    const weight = `${newWeight}g`;
    const imageUrl = newImageUrl;
    const id = +productId;

    const product = {
      id,
      imageUrl,
      name: newGoodTitle,
      count,
      size: {
        width: 200,
        height: 200,
      },
      weight,
    };

    if (!product) {
      return;
    }

    updateGood(product);
    setNewGoodCount('');
    setNewGoodTitle('');
    setNewImageUrl('');
    setNewWeight('');
    setAddProduct(!addProduct);
    navigate(-1);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <ProductList
            removeGood={removeGood}
            newGoodTitle={newGoodTitle}
            setNewGoodTitle={setNewGoodTitle}
            newGoodCount={newGoodCount}
            setNewGoodCount={setNewGoodCount}
            newImageUrl={newImageUrl}
            setNewImageUrl={setNewImageUrl}
            newWeight={newWeight}
            setNewWeight={setNewWeight}
            addProduct={addProduct}
            setAddProduct={setAddProduct}
            handleSubmit={handleSubmit}
          />
        )}
      />
      <Route
        path="/products/:productId"
        element={(
          <SingleProductPage
            removeGood={removeGood}
            newGoodTitle={newGoodTitle}
            setNewGoodTitle={setNewGoodTitle}
            newGoodCount={newGoodCount}
            setNewGoodCount={setNewGoodCount}
            newImageUrl={newImageUrl}
            setNewImageUrl={setNewImageUrl}
            newWeight={newWeight}
            setNewWeight={setNewWeight}
            handleEdit={handleEdit}
            setProductId={setProductId}
            addProduct={addProduct}
            setAddProduct={setAddProduct}
          />
        )}
      />
    </Routes>
  );
}

export default App;
