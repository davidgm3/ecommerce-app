//fetches the categories from the fakestoreapi
export const fetchCategories = async () => {
	const resp = await fetch('https://fakestoreapi.com/products/categories');
	const data = await resp.json();
	return data;
};
