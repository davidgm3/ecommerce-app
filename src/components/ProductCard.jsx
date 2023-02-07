import React from 'react';
import { Link } from 'react-router-dom';

//component for displaying a product card in the product panel
export const ProductCard = ({ product }) => {
	const { title, price, image, id } = product;

	return (
		<Link
			to={`/product/${id}`}
			className='flex flex-col items-stretch justify-between p-4 bg-white
			shadow-xl rounded-md'
		>
			<img
				src={image}
				alt=''
				className='w-full h-auto aspect-square object-cover'
			/>
			<div className='flex flex-col items-start'>
				<h2 className='text-gray-800 text-sm font-medium mt-2'>
					{title}
				</h2>
				<p className='text-gray-500 text-sm mt-2'>${price}</p>
			</div>
		</Link>
	);
};
