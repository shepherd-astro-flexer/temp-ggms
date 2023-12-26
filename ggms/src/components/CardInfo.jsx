const CardInfo = ({Icon, property}) => {
  return (
    <div className="flex items-center gap-2">
        <Icon className="h-5 w-5"/>
        <p className="capitalize font-semibold">{property}</p>
    </div>
  )
}
export default CardInfo