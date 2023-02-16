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
  addProduct: boolean
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
}: AddProductProps) => {
  const handleVisibileModal = addProduct ? 'AddProduct__visible' : 'AddProduct';

  return (
    <section className={handleVisibileModal}>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={newGoodTitle}
            onChange={e => setNewGoodTitle(e.target.value)}
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            value={newGoodCount}
            onChange={e => setNewGoodCount(e.target.value)}
          />
        </label>
        <label>
          Image URL:
          <input
            type="string"
            value={newImageUrl}
            onChange={e => setNewImageUrl(e.target.value)}
          />
        </label>
        <label>
          Weight(g):
          <input
            type="number"
            value={newWeight}
            onChange={e => setNewWeight(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </section>
  );
};
