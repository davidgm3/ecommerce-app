import { MainNavbar } from '@/components/MainNavbar';
import { fetchProducts } from '@/api/fetchProducts';
import { ProductPanel } from '@/components/ProductPanel';
import { useState, useEffect } from 'react';
import { Loading } from '@/components/Loading';
import { CategoriesFilter } from './../components/CategoriesFilter';
import { useSearchParams } from 'react-router-dom';

export const MainPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const [category, setCategory] = useState();

	//loads products from api and filters them by category
	const loadProducts = async () => {
		setLoading(true);
		const products = await fetchProducts();
		const filteredProducts = products.filter(
			(product) => product.category === category || !category
		);
		setProducts(filteredProducts);
		setLoading(false);
	};

	//loads products when category changes
	useEffect(() => {
		loadProducts();
	}, [category]);

	//updates category when searchParams changes
	useEffect(() => {
		const category = searchParams.get('category') || '';
		setCategory(category === 'all' ? '' : category);
	}, [searchParams]);

	return (
		<>
			<MainNavbar />
			<CategoriesFilter />

			<div id='body' className='container mt-4 '>
				{loading && <Loading />}
				{products && !loading && <ProductPanel products={products} />}
			</div>
		</>
	);
};
