import { Routes, Route } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { ProductPage } from '../pages/ProductPage';
import { LoginPage } from '@/pages/LoginPage';
import { CartPage } from './../pages/CartPage';
import { PrivateRouter } from './PrivateRouter';

export const MainRouter = () => {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/about' element={<AboutPage />} />
			<Route path='/product/:id' element={<ProductPage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route element={<PrivateRouter />}>
				<Route path='/cart' element={<CartPage />} />
			</Route>
		</Routes>
	);
};
