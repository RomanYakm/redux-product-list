import { useState } from 'react';
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
  const goods = useAppSelector(state => state.products);

  const addGood = (goodToAdd: ProductState) => {
    dispatch(productActions.add(goodToAdd));
  };

  const removeGood = (goodToRemove: ProductState) => {
    dispatch(productActions.delete(goodToRemove));
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
      comments: [{
        id: 0,
        productId: id,
        description: '',
        date: '',
      }],
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

  return (
    <section className="ProductList">
      <h2>Products:</h2>

      <ul>
        {goods && goods.map((good) => (
          <Product
            key={good.id}
            good={good}
            removeGood={removeGood}
          />
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
