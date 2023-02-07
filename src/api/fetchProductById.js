//gets a product by its id
export const fetchProductById = async (id) => {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`);
	const data = await response.json();
	return data;
};
