import { createContext } from 'react';
import { useReducer } from 'react';
import { useEffect } from 'react';

//types for the reducer function
const types = {
	ADD_PRODUCT: 'ADD_PRODUCT', //receives id and quantity
	REMOVE_PRODUCT: 'REMOVE_PRODUCT', //receives id and quantity
	CLEAR_CART: 'CLEAR_CART',
};

export const CartContext = createContext();

//reducer function
const productsReducer = (state, action) => {
	switch (action.type) {
		//receives id and quantity, updates the state
		case types.ADD_PRODUCT: {
			let id = action.payload.id;
			let quantity = action.payload.quantity;
			let productExists = state.hasOwnProperty(id);

			//if product isnt in the cart, add it
			//	else, update the quantity
			if (!productExists) {
				return { ...state, [id]: quantity };
			} else {
				const newQuantity = state[id] + quantity;

				return {
					...state,
					[id]: newQuantity,
				};
			}
		}

		//receives id and quantity, updates the state
		case types.REMOVE_PRODUCT: {
			//if product isnt in the cart, do nothing
			//	else, update the quantity
			let id = action.payload.id;
			let quantity = action.payload.quantity;
			let productExists = state.hasOwnProperty(id);
			if (!productExists) return state;
			if (state[id] <= quantity) {
				const { [id]: _, ...newState } = state;
				return newState;
			} else {
				return {
					...state,
					[id]: state[id] - quantity,
				};
			}
		}

		//resets the state to default
		case types.CLEAR_CART: {
			return {};
		}

		default:
			return state;
	}
};

//tries to get authInfo from local storage, if not found, returns default initialAuthInfoState
const init = () => {
	const res = JSON.parse(localStorage.getItem('productsQuantity')) || {};
	return res;
};

//provider
export const CartContextProvider = ({ children }) => {
	const [productsQuantity, dispatchProductsQuantity] = useReducer(
		productsReducer,
		{},
		init
	);

	//updates local storage when state changes
	useEffect(() => {
		localStorage.setItem(
			'productsQuantity',
			JSON.stringify(productsQuantity)
		);
	}, [productsQuantity]);

	//adds a product to the cart, given its id and quantity
	const addProduct = (id, quantity) => {
		dispatchProductsQuantity({
			type: types.ADD_PRODUCT,
			payload: { id, quantity },
		});
	};

	//removes a product from the cart, given its id and quantity
	const removeProduct = (id, quantity) => {
		dispatchProductsQuantity({
			type: types.REMOVE_PRODUCT,
			payload: {
				id,
				quantity,
			},
		});
	};

	//clears the cart
	const clearCart = () => {
		dispatchProductsQuantity({
			type: types.CLEAR_CART,
		});
	};

	return (
		<CartContext.Provider
			value={{ productsQuantity, addProduct, removeProduct, clearCart }}
		>
			{children}
		</CartContext.Provider>
	);
};
