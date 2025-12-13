const ValidationErrText = ({ text }: {text?: string}) => {
  return (
    <p className="text-red-500 m-0 p-0 text-sm">{text}</p>
  )
}

export default ValidationErrText