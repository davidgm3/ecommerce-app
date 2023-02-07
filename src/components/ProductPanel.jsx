import React from 'react';
import { ProductCard } from './ProductCard';

//just a product panel that displays a list of product cards
export const ProductPanel = ({ products }) => {
	return (
		<div className='grid grid-cols-auto-min-160px sm:grid-cols-auto-min-200px gap-2 animate__animated animate__fadeIn'>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
};
