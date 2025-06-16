type ButtonPropsType = {
  onClick: () => void;
  text: string;
  className?: string;
  variant?: 'primary' | 'secondary';
};

function Button(props: ButtonPropsType) {
  const { variant = 'primary' } = props;

  const baseStyles =
    'py-3 px-7 rounded-2xl cursor-pointer transition-all duration-300 font-medium';

  const variantStyles = {
    primary:
      'bg-violet-600 text-white border border-violet-600 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white',
    secondary:
      'bg-transparent text-violet-600 border border-violet-600 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white',
  };

  return (
    <div className={`text-center ${props.className ?? ''}`}>
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${
          props.className ?? ''
        }`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
