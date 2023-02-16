import { useState } from 'react';
import { ProductState } from '../types/ProductState';
import { AddProduct } from './AddProduct';
import Product from './Product';

export const ProductList = () => {
  const [newGoodTitle, setNewGoodTitle] = useState('');
  const [newGoodCount, setNewGoodCount] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [addProduct, setAddProduct] = useState(false);

  const [goods, setGoods] = useState<ProductState[]>([{
    id: 1,
    imageUrl: '',
    name: 'Banana',
    count: 4,
    size: {
      width: 200,
      height: 200,
    },
    weight: '200g',
    comments: [{
      id: 3,
      productId: 1,
      description: 'sometext',
    }],
  }]);

  const addGood = (goodToAdd: ProductState) => {
    setGoods([...goods, goodToAdd]);
  };

  const removeGood = (goodToRemove: ProductState) => {
    setGoods(current => current.filter(
      good => good !== goodToRemove,
    ));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const count = +newGoodCount;
    const id = Math.floor(Math.random() * 100);
    const weight = `${newWeight}g`;

    const product = {
      id,
      imageUrl: '',
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
  };

  const handleModalVisible = () => {
    setAddProduct(!addProduct);
  };

  return (
    <section className="ProductList">
      <h2>Products:</h2>

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

      />

      <ul>
        {goods.map((good) => (
          <Product
            key={good.id}
            good={good}
            removeGood={removeGood}
          />
        ))}

      </ul>
    </section>
  );
};

export default ProductList;
