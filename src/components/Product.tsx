import { useState } from 'react';
import { ProductState } from '../types/ProductState';

type Props = {
  removeGood?: (good: ProductState) => void,
  good: ProductState,
};

const Product = ({ removeGood, good }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const handleModalVisible = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <li className="ProductList__item item">
        <button
          onClick={handleModalVisible}
          className="delete"
          type="submit"
        >
          X

        </button>

        <div>
          <p>
            Product Name:
            {good.name}
          </p>
          <p>
            Product Count:
            {good.count}
          </p>
          <p>
            Product Weight:
            {good.weight}
          </p>
        </div>
        <img
          src={good.imageUrl}
          alt={good.name}
          width={good.size.width}
          height={good.size.height}
        />
      </li>
      <div className={modalVisible ? 'popup-wrapper' : 'popup-wrapper__none'}>

        <div className="popup">
          <button
            className="popup-close"
            onClick={handleModalVisible}
            type="button"
          >
            x
          </button>
          <div className="popup-content">
            <button
              onClick={() => removeGood?.(good)}
              type="button"
            >
              Yes, delete
              {good.name}
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default Product;
