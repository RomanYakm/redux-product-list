import { ProductState } from '../types/ProductState';

type Props = {
  removeGood: (good: ProductState) => void,
  good: ProductState,
};

const Product = ({ removeGood, good }: Props) => {
  return (
    <li>
      <button
        onClick={() => removeGood(good)}
        className="delete"
        type="submit"
      >
        X

      </button>

      {good.name}
      {' '}
      ---
      {good.count}
      {' '}
      ----
      {good.weight}
    </li>
  );
};

export default Product;
