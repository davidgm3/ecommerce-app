import * as Popover from '@radix-ui/react-popover';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContextProvider';
import userIcon from '@/assets/user-icon.png';
import { Link } from 'react-router-dom';

// This component is used in the header to display the login state of the user. Uses radix-ui
export const LoginStateButton = () => {
	const { authInfo, login, logout } = useContext(AuthContext);
	if (authInfo.loggedIn) {
		return (
			<Popover.Root>
				<Popover.Trigger>
					<div className='flex justify-center items-center'>
						<img src={userIcon} className='w-5 h-5'></img>
						<p className=''>{authInfo.user.id}</p>
					</div>
				</Popover.Trigger>
				<Popover.Content
					className='z-10 animate__animated animate__fadeInDownSmall animate__faster'
					sideOffset={10}
				>
					<div className='bg-white p-6 shadow-2xl text-dark'>
						<p className=''>Welcome, {authInfo.user.name}</p>
						<hr className='mb-3' />
						<button
							onClick={logout}
							className='bg-orange px-2 text-white rounded-md'
						>
							Logout
						</button>
					</div>
				</Popover.Content>
			</Popover.Root>
		);
	} else {
		return (
			<Link
				to='/login'
				className='px-2 bg-orange text-white font-semibold rounded-md'
			>
				Login
			</Link>
		);
	}
};
