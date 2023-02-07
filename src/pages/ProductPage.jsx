import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainNavbar } from '@/components/MainNavbar';
import { fetchProductById } from '@/api/fetchProductById';
import { Loading } from './../components/Loading';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContextProvider';
import { AddedModal } from '@/components/AddedModal';
const ProductPageBody = ({ product }) => {
	const { title, price, image, id, description } = product;
	const { addProduct } = useContext(CartContext);
	const [isOpenAddedModal, setIsOpenAddedModal] = useState(false);

	//called when add to cart button is clicked, opens modal for confirmation
	const onAddToCart = () => {
		addProduct(id, 1);
		setIsOpenAddedModal(true);
	};

	return (
		<>
			<AddedModal
				product={product}
				isOpen={isOpenAddedModal}
				onClose={() => setIsOpenAddedModal(false)}
			/>

			<div className='grid grid-cols-12 gap-4 overflow-x-hidden'>
				<div className='col-start-2 col-span-10 sm:col-span-6 sm:col-start-1 shadow-2xl rounded-lg animate__animated animate__fadeInLeft animate__faster'>
					<img
						src={image}
						alt=''
						className='aspect-square object-contain bg-white rounded-lg'
					/>
				</div>
				<div className='content col-span-12 sm:col-span-6 text-dark animate__animated animate__fadeInRight animate__faster'>
					<h1 className='text-xl font-semibold mb-3'>{title}</h1>
					<p className='mb-3'>{description}</p>
					<div className='flex items-center justify-between'>
						<p className='w-fit text-dark font-bold rounded-full '>
							${price}
						</p>
						<button
							onClick={onAddToCart}
							className='bg-orange text-white px-4 py-1 text-md rounded-full font-semibold'
						>
							Add to cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export const ProductPage = () => {
	const { id } = useParams();

	const [product, setProduct] = useState();
	const [loading, setLoading] = useState(true);

	//fetches product by id and loads it into state
	const loadProduct = async () => {
		setLoading(true);
		const product = await fetchProductById(id);
		setProduct(product);
		setLoading(false);
	};

	//loads product on mount
	useEffect(() => {
		loadProduct();
	}, []);
	return (
		<>
			<MainNavbar />
			<div id='body' className='container mt-4'>
				{product && <ProductPageBody product={product} />}
				{loading && <Loading />}
			</div>
		</>
	);
};
