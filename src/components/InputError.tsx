type InputErrorProps = {
	message: string;
	className: string;
};

// eslint-disable-next-line react/function-component-definition
const InputError = ({ message = '', className = '' }: InputErrorProps) => (
	<div>
		<span className={`${className} text-sm text-red-600`}>{message}</span>
	</div>
);

export default InputError;
