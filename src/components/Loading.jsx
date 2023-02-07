export const Loading = ({ size }) => {
	//default sizes
	if (!size) {
		size = 50;
	}
	return (
		<div className='flex items-center justify-center h-full'>
			<div
				className={`animate-spin rounded-full border-t-2 border-b-2 border-gray-900`}
				style={{ width: size, height: size }}
			></div>
		</div>
	);
};
