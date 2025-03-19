type ButtonProps = {
  text: string
  onClick?: () => void
  color?: 'primary' | 'secondary'
}

const Button = ({ text, onClick, color = 'primary' }: ButtonProps) => {
  const baseStyle = 'py-2 px-4 rounded-md transition w-full text-center'
  const primaryStyle = 'bg-red-500 text-white hover:bg-red-600'
  const secondaryStyle = 'bg-gray-200 text-gray-800 hover:bg-gray-300'

  return (
    <button
      className={`${baseStyle} ${color === 'primary' ? primaryStyle : secondaryStyle}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
