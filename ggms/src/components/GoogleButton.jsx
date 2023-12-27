// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import {FaGoogle} from "react-icons/fa"
import { customFetch } from "../utils";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleButton = () => {
  const navigate = useNavigate()
    
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const {data} = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        })
        
        await customFetch.post("/auth/google-login", data)
        toast.success("Logged in successfully")
        navigate("/dashboard")
      } catch (error) {
        console.log(error);
      }
    }
  })

  return <button type="button" className="btn btn-secondary capitalize" onClick={() => login()}><FaGoogle className="w-5 h-5"/> Login with Google</button>;
  
}
export default GoogleButton

