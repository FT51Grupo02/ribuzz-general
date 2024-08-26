import { FC } from 'react';
import { notFound } from 'next/navigation';
import Product from '@/components/ProductDetail/Products';
import { products } from '@/components/ProductDetail/productData';

interface Props {
  params: {
    productId: string;
  };
}

const ProductPage: FC<Props> = ({ params }) => {
  const { productId } = params;


  const product = products.find(p => p.id === productId);


  return (
    <div>
      {product ? (
        <Product {...product} />
      ) : (
        notFound() 
      )}
    </div>
  );
};

export default ProductPage;
