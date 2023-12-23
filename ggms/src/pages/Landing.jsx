import { Link } from "react-router-dom";
import landingImageDark from "../assets/images/landing-image.svg";
import landingImageLight from "../assets/images/landing-image-2.svg"
import { FaDumbbell } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Landing = () => {
  const {theme} = useSelector(store => store.user);

  return (
    <div>
      <nav className="flex items-center h-28 w-11/12 max-w-6xl mx-auto "> 
        <div className="flex items-center">
          <div className="bg-primary p-3.5 rounded-xl">
            <FaDumbbell className="h-7 w-7"/>
          </div>
          <p className="text-2xl text-primary font-bold capitalize ml-4 tracking-widest">gilas</p>
        </div>
      </nav>
      <div className="flex gap-x-12 w-11/12 max-w-6xl mx-auto mt-16">
        <div>
          <h1 className="capitalize text-3xl font-bold tracking-wide mb-6 md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">gym <span className="text-primary">management</span> system</h1>
          <p className="mb-6 tracking-wide max-w-xl leading-8">Experience the convenience of a cloud-based system accessible from anywhere, anytime, allowing you to stay connected and in control, even on the go. Tara laro!</p>
          <div>
            {/* <Link className="btn btn-primary btn-sm text-md font-normal capitalize tracking-wide mr-4" to="/register">Register</Link> */}
            <Link className="btn btn-primary btn-sm text-md font-normal capitalize tracking-wide" to="/login">Login</Link>
          </div>
        </div>
        <img className="h-80 hidden lg:block" src={theme === "business" ? landingImageDark : landingImageLight} alt="gym" />
      </div>
    </div>
  )
}
export default Landing