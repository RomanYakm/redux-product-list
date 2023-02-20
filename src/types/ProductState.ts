// type Comments = {
//   id: number,
//   productId: number,
//   description: string,
//   date: string
// };

export type ProductState = {
  id: number,
  imageUrl: string,
  name: string,
  count: number,
  size: {
    width: number,
    height: number,
  },
  weight: string
};
