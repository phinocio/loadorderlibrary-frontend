type InputErrorProps = {
	messages: Array<string>;
	className: string;
};

// eslint-disable-next-line react/function-component-definition
const InputError = ({ messages = [], className = '' }: InputErrorProps) => (
	// eslint-disable-next-line react/jsx-no-useless-fragment
	<>
		{messages.length > 0 && (
			<>
				{messages.map((message) => (
					<p
						className={`${className} text-sm text-red-600`}
						key={message}
					>
						{message}
					</p>
				))}
			</>
		)}
	</>
);

export default InputError;
