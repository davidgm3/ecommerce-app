import { useState, useEffect } from 'react';
import { fetchCategories } from '@/api/fetchCategories';
import { useSearchParams } from 'react-router-dom';
import { Loading } from './Loading';

export const CategoriesFilter = ({ categories, setCategories }) => {
	const [categoriesList, setCategoriesList] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [loading, setLoading] = useState(true);

	//loads categories from api
	const loadCategories = async () => {
		setLoading(true);
		const categories = await fetchCategories();
		categories.push('all');
		setCategoriesList(categories);
		setLoading(false);
	};

	//loads categories when component mounts
	useEffect(() => {
		loadCategories();
	}, []);

	//if category is not set, set it to 'all'
	useEffect(() => {
		if (!!searchParams.get('category') == false) {
			setSearchParams({
				category: 'all',
			});
		}
	}, [searchParams]);

	return (
		<div className='container flex justify-center '>
			<div className='flex bg-white mt-8 py-4 px-2 sm:px-4 rounded-md justify-center max-w-[900px] w-full gap-4 font-semibold text-dark flex-wrap'>
				{!loading &&
					categoriesList &&
					categoriesList.map((category) => (
						<button
							key={category}
							className={`${
								category === searchParams.get('category')
									? 'text-orange'
									: ' text-dark'
							} px-4 py-2 rounded-md`}
							onClick={() =>
								setSearchParams({
									category: category,
								})
							}
						>
							{category}
						</button>
					))}
				{loading && <Loading />}
			</div>
		</div>
	);
};
