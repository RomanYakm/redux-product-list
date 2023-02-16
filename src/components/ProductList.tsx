import { useState } from 'react';
import Product from './Product';

type Comments = {
  id: number,
  productId: number,
  description: string
}

type ProductState = {
  id: number,
  imageUrl: string,
  name: string,
  count: number,
  size: {
    width: number,
    height: number,
  },
  weight: string,
  comments: Comments[]
}

export const ProductList = () => {
  const [newGoodTitle, setNewGoodTitle] = useState('');
  const [newGoodCount, setNewGoodCount] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newWeight, setNewWeight] = useState('');


  const [goods, setGoods] = useState<ProductState[]>([{
    "id": 1,
    'imageUrl': '',
    'name': 'Banana',
    'count': 4,
    'size': {
      'width': 200,
      'height': 200
    },
    'weight': '200g',
    'comments': [{
      'id': 3,
      'productId': 1,
      'description': 'sometext'
    }]
  }]);

  const addGood = (goodToAdd: ProductState) => {
    setGoods([...goods, goodToAdd]);
  };

  const removeGood = (goodToRemove: ProductState) => {
    setGoods(current => current.filter(
      good => good !== goodToRemove,
    ));
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const count = +newGoodCount;
    const id = Math.floor(Math.random() * 100);
    const weight = `${newWeight}g`;

    const product = {
      id,
      'imageUrl': '',
      'name': newGoodTitle,
      count,
      'size': {
        'width': 200,
        'height': 200
      },
      weight,
      'comments': [{
        'id': 0,
        'productId': id,
        'description': ''
      }]
    }

    if (!product) {
      return;
    }
    
    addGood(product);
    setNewGoodCount('');
    setNewGoodTitle('');  
  }


  return (
    <section className="ProductList">
      <h2>Products:</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={newGoodTitle}
          onChange={e => setNewGoodTitle(e.target.value)}
        />
        <input 
          type="number"
          value={newGoodCount}
          onChange={e => setNewGoodCount(e.target.value)}
        />
        <input 
          type="string"
          value={newImageUrl}
          onChange={e => setNewImageUrl(e.target.value)}
        />
        <input 
          type="number"
          value={newWeight}
          onChange={e => setNewWeight(e.target.value)}
        />
        <button>Add</button>
      </form>

      <ul>
        {goods.map((good) => (
          <li key={good.id}>
            <button
              onClick={() => removeGood(good)}
              className="delete"
            />

            {good.name} ---
            {good.count} ----
            {good.weight}
          </li>
        ))}


      </ul>


      <Product />
    </section>
  );
}

export default ProductList;
