import underConstruction from "../assets/images/under-construction.svg"

const UnderConstruction = () => {
  return (
    <>
      <div className="text-3xl font-semibold">Coming Soon!</div>
      <img src={underConstruction} alt="under-construction-svg" className="h-96"/>
    </>
  )
}

export default UnderConstruction