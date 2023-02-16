type AddProductProps = {
  handleSubmit: (e: React.FormEvent) => void,
  newGoodTitle: string,
  setNewGoodTitle: React.Dispatch<React.SetStateAction<string>>,
  newGoodCount: string,
  setNewGoodCount: React.Dispatch<React.SetStateAction<string>>,
  newImageUrl: string,
  setNewImageUrl: React.Dispatch<React.SetStateAction<string>>,
  newWeight: string,
  setNewWeight: React.Dispatch<React.SetStateAction<string>>,
  addProduct: boolean,
  handleModalVisible: () => void;
};

export const AddProduct = ({
  handleSubmit,
  newGoodTitle,
  setNewGoodTitle,
  newGoodCount,
  setNewGoodCount,
  newImageUrl,
  setNewImageUrl,
  newWeight,
  setNewWeight,
  addProduct,
  handleModalVisible,
}: AddProductProps) => {
  const handleVisibileModal = addProduct ? 'AddProduct__visible' : 'AddProduct';

  return (
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
            <form onSubmit={handleSubmit} className="form">
              <label>
                Name:
                <input
                  type="text"
                  value={newGoodTitle}
                  onChange={e => setNewGoodTitle(e.target.value)}
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
              <button type="submit">Add</button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
