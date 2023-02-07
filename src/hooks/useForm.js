import { useState } from 'react';
//simple custom hook to handle form state
export const useForm = ({ initialFormState }) => {
	const [formState, setFormState] = useState(initialFormState);

	//updates the state on input change
	const onInputChange = (event) => {
		const { name, value } = event.target;
		setFormState({ ...formState, [name]: value });
	};

	return {
		formState,
		onInputChange,
	};
};
