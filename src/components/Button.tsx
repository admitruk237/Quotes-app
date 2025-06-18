type ButtonPropsType = {
  onClick: () => void;
  text: string;
};

function Button(props: ButtonPropsType) {
  return (
    <div className="text-center mb-10">
      <button
        className="py-3 px-7 text-white rounded-2xl bg-violet-900 cursor-pointer transition-colors duration-300 hover:bg-violet-700"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </div>
  );
}

export default Button;
