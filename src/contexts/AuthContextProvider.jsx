import { useEffect, createContext } from 'react';
import { useReducer } from 'react';
import { userDb } from '../userDb/userDb';

export const AuthContext = createContext();

//structure of authInfo
const initialAuthInfoState = {
	user: {
		id: null,
		name: null,
	},
	loggedIn: false,
};

//tries to get authInfo from local storage, if not found, returns default initialAuthInfoState
export const init = (initialAuthInfoState) => {
	const res =
		JSON.parse(localStorage.getItem('authInfo')) || initialAuthInfoState;
	return res;
};

//types for the reducer function
const types = {
	LOGIN_USER: 'LOGIN_USER',
	LOGOUT: 'LOGOUT',
};

//reducer function
const authInfoReducer = (state, action) => {
	switch (action.type) {
		//receives user info as payload, updates the state
		case types.LOGIN_USER:
			return {
				...state,
				user: {
					id: action.payload.id,
					name: action.payload.name,
				},

				loggedIn: true,
			};
		//resets the state to default
		case types.LOGOUT:
			return {
				...state,
				user: {
					id: null,
					name: null,
				},
				loggedIn: false,
			};
		default:
			return state;
	}
};

export const AuthContextProvider = ({ children }) => {
	//sets up the reducer
	const [authInfo, dispatchAuthInfo] = useReducer(
		authInfoReducer,
		initialAuthInfoState,
		init
	);

	//login function, returns true if login is successful, false otherwise
	const login = (id, password) => {
		//if matching pw/id is found, update the state and return true, else, return false
		const user = userDb.find(
			(user) => user.id === id && user.password === password
		);
		if (user) {
			dispatchAuthInfo({
				type: types.LOGIN_USER,
				payload: user,
			});

			return true;
		}
		return false;
	};

	//logout function, resets the state
	const logout = () => {
		dispatchAuthInfo({
			type: types.LOGOUT,
		});
	};

	//everytime an action is performed on the state, update the local storage
	useEffect(() => {
		localStorage.setItem('authInfo', JSON.stringify(authInfo));
	}, [authInfo]);

	return (
		<AuthContext.Provider value={{ authInfo, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
