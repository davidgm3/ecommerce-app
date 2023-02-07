import { useForm } from '../hooks/useForm';
import { AuthContext } from '../contexts/AuthContextProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
	const navigate = useNavigate();
	const { formState, onInputChange } = useForm({ id: '', password: '' });

	const { login } = useContext(AuthContext);

	//called when user tries to login. Navigates to main page if succesful
	const onLogin = (e) => {
		e.preventDefault();
		const loginSuccesful = login(formState.id, formState.password);
		if (loginSuccesful) {
			navigate('/');
		} else {
			alert('Login failed');
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='bg-white shadow-xl rounded-xl text-dark p-5'>
				<h1 className='text-3xl font-bold mb-3'>Login</h1>
				<hr className='bg-dark border-dark mb-3' />
				<form>
					<input
						type='text'
						name='id'
						className='border-2 border-dark block mb-3 rounded-md'
						placeholder='User'
						onChange={onInputChange}
					/>
					<input
						type='password'
						name='password'
						className='border-2 border-dark block rounded-md mb-3'
						placeholder='Password'
						onChange={onInputChange}
					/>
					<button
						onClick={onLogin}
						type='submit'
						className='bg-orange text-white rounded-md px-4 py-1 text-md font-semibold'
					>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};
