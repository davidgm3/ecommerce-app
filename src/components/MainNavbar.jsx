import { Link, NavLink } from 'react-router-dom';
import mainLogo from '@/assets/main-logo.png';
import cartIcon from '@/assets/cart-icon.png';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useContext, useState, useEffect } from 'react';
import { LoginStateButton } from '@/components/LoginStateButton';
import { CartContext } from '../contexts/CartContextProvider';

export const MainNavbar = () => {
	const { productsQuantity } = useContext(CartContext);
	const [length, setLength] = useState('7');

	//computes total items in cart for cart icon
	useEffect(() => {
		const totalItems = Object.keys(productsQuantity)
			.reduce((accum, key) => {
				return accum + parseInt(productsQuantity[key]);
			}, 0)
			.toString();

		setLength(totalItems);
	}, [productsQuantity]);

	return (
		<header className='bg-white py-2 sticky top-0 z-10 shadow-2xl'>
			<div className='container mx-auto px-4'>
				<div className='flex justify-between items-center '>
					<Link to='/' className='h-10'>
						<img src={mainLogo} alt='' className='h-full' />
					</Link>
					<nav className='flex justify-between items-center gap-6'>
						<NavLink
							to='/'
							className={({
								isActive,
							}) => `text-gray hover:text-orange rounded-md text-md font-medium
                            ${
								isActive
									? 'text-orange after:absolute relative after:h-[3px] after:w-full after:bg-orange after:-bottom-3.5 after:left-0 after:rounded-md after:z-10 '
									: ''
							}`}
						>
							Home
						</NavLink>
						<NavLink
							to='/about'
							className={({
								isActive,
							}) => `text-gray hover:text-orange rounded-md text-md font-medium
                            ${
								isActive
									? 'text-orange after:absolute relative after:h-[3px] after:w-full after:bg-orange after:-bottom-3.5 after:left-0 after:rounded-md after:z-10 '
									: ''
							}`}
						>
							About
						</NavLink>
						<LoginStateButton />

						<Link to='/cart' className='relative'>
							<div className='absolute -top-2 -right-2 bg-orange rounded-full min-w-[20px] h-[20px] px-2 flex items-center justify-center text-white text-sm font-bold'>
								{length}
							</div>
							<img src={cartIcon} className='h-[30px]' alt='' />
						</Link>
					</nav>
				</div>
			</div>
		</header>
	);
};
