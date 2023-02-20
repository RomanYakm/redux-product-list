import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import Product from './Product';

export const SingleProductPage = () => {
  const params = useParams();

  const products = useAppSelector(state => state.products);

  const product = products.products
    .find(prod => {
      if (params.productId) {
        return +prod.id === +params.productId;
      }

      return false;
    });

  if (!product) {
    return (
      <section>
        <h2>Product not found!</h2>
      </section>
    );
  }

  return (
    <section>
      <Product good={product} />
      <Link to="/">Home</Link>
    </section>
  );
};
