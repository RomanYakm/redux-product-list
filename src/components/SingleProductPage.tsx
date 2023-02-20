import { useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { ProductState } from '../types/ProductState';
import Product from './Product';

type SingleProductPageState = {
  removeGood: (good: ProductState) => void,
  handleEdit: (e: React.FormEvent) => void,
  newGoodTitle: string,
  setNewGoodTitle: React.Dispatch<React.SetStateAction<string>>,
  newGoodCount: string,
  setNewGoodCount: React.Dispatch<React.SetStateAction<string>>,
  newImageUrl: string,
  setNewImageUrl: React.Dispatch<React.SetStateAction<string>>,
  newWeight: string,
  setNewWeight: React.Dispatch<React.SetStateAction<string>>,
  setProductId: React.Dispatch<React.SetStateAction<string>>,
  addProduct: boolean,
  setAddProduct: React.Dispatch<React.SetStateAction<boolean>>,
};

export const SingleProductPage = ({
  removeGood, handleEdit, newGoodTitle, setNewGoodTitle,
  newGoodCount, setNewGoodCount, newImageUrl, setNewImageUrl,
  newWeight, setNewWeight, setProductId, addProduct, setAddProduct,
}: SingleProductPageState) => {
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
        <Link to="/">Home</Link>
      </section>
    );
  }

  setProductId(`${product.id}`);

  const handleModalVisible = () => {
    setAddProduct(!addProduct);
  };

  const handleVisibileModal = addProduct ? 'AddProduct__visible' : 'AddProduct';

  return (
    <section>
      <button type="button" onClick={handleModalVisible}>
        Edit Product
      </button>
      <Product good={product} removeGood={removeGood} />
      <Link to="/">Home</Link>
      <section className={handleVisibileModal}>
        <div className="popup-wrapper">
          <div className="popup">
            <button
              className="popup-close"
              onClick={handleModalVisible}
              type="button"
            >
              x
            </button>
            <div className="popup-content">
              <form onSubmit={handleEdit} className="form">
                <label>
                  Name:
                  <input
                    type="text"
                    value={newGoodTitle}
                    onChange={e => setNewGoodTitle(e.target.value)}
                    placeholder={product.name}
                    required
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    value={newGoodCount}
                    onChange={e => setNewGoodCount(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Image URL:
                  <input
                    type="string"
                    value={newImageUrl}
                    onChange={e => setNewImageUrl(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Weight(g):
                  <input
                    type="number"
                    value={newWeight}
                    onChange={e => setNewWeight(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Edit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
