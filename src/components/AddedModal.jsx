import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '@/contexts/CartContextProvider';

//modal using radix-ui
export const AddedModal = ({ product, isOpen, onClose }) => {
	const { image, title, price } = product;
	const navigate = useNavigate();
	const { productsQuantity } = useContext(CartContext);
	const quantity = productsQuantity[product.id];

	//navigation
	const goToCart = () => {
		navigate('/cart');
	};
	const goToHome = () => {
		navigate('/');
	};

	return (
		<Dialog.Root open={isOpen} className=''>
			<Dialog.Portal>
				<Dialog.Overlay className='bg-dark z-40 fixed bg-opacity-50 w-screen h-screen inset-0 grid place-items-center animate__fadeIn animate__100'>
					<Dialog.Content className='w-8/12 bg-white p-3 rounded-lg'>
						<p className='text-dark font-semibold'>
							Added to cart!
						</p>
						<hr className='my-2' />
						<div className='flex items-center justify-between gap-8'>
							<div className='flex items-center gap-1'>
								<img
									src={image}
									alt=''
									className='w-10 h-10 object-cover'
								/>
								<p className='text-dark font-bold text-2xl'>
									x{quantity}
								</p>
							</div>
							<p>
								{title} - <b>${price}</b>
							</p>
						</div>
						<hr className='my-2' />
						<button
							className=' py-1 px-3 leading-none bg-orange font-semibold text-white rounded-md'
							onClick={() => onClose()}
						>
							Ok
						</button>
						<button
							className=' py-1 px-3 leading-none border-2 bg-orange font-semibold text-white rounded-md'
							onClick={() => goToCart()}
						>
							See my cart
						</button>
						<button
							className=' py-1 px-3 leading-none border-2 bg-orange font-semibold text-white rounded-md'
							onClick={() => goToHome()}
						>
							Home
						</button>
					</Dialog.Content>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
