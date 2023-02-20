import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ProductState } from '../types/ProductState';
import { AddProduct } from './AddProduct';
import Product from './Product';
import { actions as productActions } from '../features/products';

type ProductListProps = {
  removeGood: ((good: ProductState) => void),
  newGoodTitle: string,
  setNewGoodTitle: React.Dispatch<React.SetStateAction<string>>,
  newGoodCount: string,
  setNewGoodCount: React.Dispatch<React.SetStateAction<string>>,
  newImageUrl: string,
  setNewImageUrl: React.Dispatch<React.SetStateAction<string>>,
  newWeight: string,
  setNewWeight: React.Dispatch<React.SetStateAction<string>>,
  addProduct: boolean,
  setAddProduct: React.Dispatch<React.SetStateAction<boolean>>,
  handleSubmit: (e: React.FormEvent) => void,
};

export const ProductList = ({
  removeGood, newGoodTitle, setNewGoodTitle,
  newGoodCount, setNewGoodCount, newImageUrl,
  setNewImageUrl, newWeight, setNewWeight, addProduct, setAddProduct,
  handleSubmit,
}: ProductListProps) => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);

  useEffect(() => {
    dispatch(productActions.setLoading(true));
    fetch('http://localhost:8080/products?_sort=name,count&_order=asc,desc')
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
        {products && products.map(good => (
          <React.Fragment key={good.id}>
            <Product
              good={good}
              removeGood={removeGood}
            />
            <Link to={`/products/${good.id}`}>
              View Post
            </Link>
          </React.Fragment>
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
