import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContextProvider';
import { useContext, useState, useEffect } from 'react';
import { fetchProducts } from '@/api/fetchProducts';
import { Loading } from '@/components/Loading';

export const CartPage = () => {
	const { productsQuantity, addProduct, removeProduct, clearCart } =
		useContext(CartContext);

	const [productsInfo, setProductsInfo] = useState([]);
	const [loading, setLoading] = useState(false);

	//loads products info from api
	const loadProductsInfo = async () => {
		setLoading(true);

		//gets all products from api
		const allProductsInfo = await fetchProducts();

		//contains the ids of products from the cart
		const productsId = Object.keys(productsQuantity).map((id) =>
			parseInt(id)
		);

		//filters products from api to only include products from the cart
		const productsInfoFiltered = allProductsInfo.filter((product) => {
			return productsId.includes(product.id);
		});

		//maps products info to include quantity
		const res = productsInfoFiltered.map((product) => {
			return {
				...product,
				quantity: productsQuantity[product.id],
			};
		});
		setProductsInfo(res);
		setLoading(false);
	};

	//loads products info when productsQuantity changes
	//not optimal, needs fix
	useEffect(() => {
		loadProductsInfo();
	}, [productsQuantity]);

	return (
		<>
			<div className='flex flex-col items-center justify-start h-screen container'>
				<h1 className='text-3xl font-bold mb-3'>Cart</h1>
				<hr className='bg-dark border-dark mb-3' />
				<div className='flex flex-col items-center justify-center w-full max-w-[700px]'>
					<div className='flex  flex-col items-center justify-center gap-4 w-full'>
						{productsInfo.length === 0 && loading && (
							<Loading size={50} />
						)}
						{productsInfo.map((product) => {
							return (
								<div
									key={product.id}
									className='flex items-center justify-between gap-0 bg-white shadow-xl rounded-md p-4 w-full flex-col xs:flex-row animate__animated animate__fadeInUp animate__faster'
								>
									<div className='flex gap-1 items-start'>
										<img
											src={product.image}
											alt=''
											className='w-10 h-auto aspect-square object-cover'
										/>
										<button
											onClick={() =>
												!loading &&
												removeProduct(product.id, 1)
											}
											className='text-gray-500 text-sm mt-2 text-white bg-orange leading-none rounded-full font-semibold py-1 px-2'
										>
											-
										</button>
										<p className='text-gray-500 text-sm mt-2 text-white bg-orange leading-none rounded-md font-semibold py-1 px-4'>
											{loading ? (
												<Loading size={14} />
											) : (
												product.quantity
											)}
										</p>
										<button
											className='text-gray-500 text-sm mt-2 text-white bg-orange leading-none rounded-full font-semibold py-1 px-2'
											onClick={() =>
												!loading &&
												addProduct(product.id, 1)
											}
										>
											+
										</button>
									</div>

									<h2 className='text-gray-800 text-sm font-medium flex-shrink-[100] justify-self-end'>
										{product.title} -{' '}
										<b>
											${product.price * product.quantity}
										</b>
									</h2>
								</div>
							);
						})}
						<Link
							to='/'
							className='bg-orange text-white rounded-md px-4 py-1 text-md font-semibold'
						>
							Continue Shopping
						</Link>
						<button
							className='bg-orange text-white rounded-md px-4 py-1 text-md font-semibold'
							onClick={clearCart}
						>
							Clear cart
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
