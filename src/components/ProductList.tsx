import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ProductState } from '../types/ProductState';
import { AddProduct } from './AddProduct';
import Product from './Product';
import { actions as productActions } from '../features/products';

export const ProductList = () => {
  const [newGoodTitle, setNewGoodTitle] = useState('');
  const [newGoodCount, setNewGoodCount] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [addProduct, setAddProduct] = useState(false);

  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(productActions.setLoading(true));
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => {
        dispatch(productActions.set(data));
      })
      .catch(() => {
        dispatch(productActions.setError('Someting went wrong'));
      })
      .finally(() => {
        dispatch(productActions.setLoading(false));
      });
  }, []);

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

  const removeGood = (goodToRemove: ProductState) => {
    dispatch(productActions.delete(goodToRemove));
    const url = `http://localhost:8080/products/${goodToRemove.id}`;

    fetch(url, {
      method: 'DELETE',
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

  const handleModalVisible = () => {
    setAddProduct(!addProduct);
  };

  if (loading) {
    return (
      <h2>Loading...</h2>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="ProductList">
      <h2>Products:</h2>

      <ul>
        {products && products.map((good) => (
          <>
            <Product
              key={good.id}
              good={good}
              removeGood={removeGood}
            />
            <Link to={`/products/${good.id}`}>
              View Post
            </Link>
          </>
        ))}

      </ul>

      <button onClick={handleModalVisible} type="button">
        Add Product
      </button>

      <AddProduct
        handleSubmit={handleSubmit}
        newGoodTitle={newGoodTitle}
        setNewGoodTitle={setNewGoodTitle}
        newGoodCount={newGoodCount}
        setNewGoodCount={setNewGoodCount}
        newImageUrl={newImageUrl}
        setNewImageUrl={setNewImageUrl}
        newWeight={newWeight}
        setNewWeight={setNewWeight}
        addProduct={addProduct}
        handleModalVisible={handleModalVisible}

      />

    </section>
  );
};

export default ProductList;
