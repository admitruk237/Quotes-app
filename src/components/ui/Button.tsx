type Props = {
  onClick?: () => void
  text: string
  className?: string
  variant?: 'primary' | 'secondary' | 'danger'
  disabled?: boolean
}

function Button(props: Props) {
  const { variant = 'primary' } = props

  const baseStyles =
    'py-3 px-7 rounded-2xl cursor-pointer transition-all duration-300 font-medium'

  const variantStyles = {
    primary:
      'bg-violet-600 text-white border border-violet-600 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white',
    secondary:
      'bg-transparent text-violet-600 border border-violet-600 hover:bg-emerald-600 hover:border-emerald-600 hover:text-white',
    danger:
      'bg-red-700 text-white border border-red-600 hover:bg-red-900 hover:border-red-900 hover:text-white',
  }

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
  )
}

export default Button
