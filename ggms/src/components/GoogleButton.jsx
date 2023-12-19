import axios from "axios";
import {FcGoogle} from "react-icons/fc";
import { customFetch } from "../utils";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


const SubmitBtn = () => {
    const navigate = useNavigate()

    const gmailSignIn = async () => {
        try {
          const response = await customFetch("/v1/auth/google");
            console.log(response.data);
        //   console.log('OAuth Response:', response.data);
          // Handle the response, which may redirect or return data for further handling
        //   navigate("/api/v1/auth/google")
        } catch (error) {
          console.error('Error initiating OAuth:', error);
        }
    };

  return (
    <button type="button" className={`btn btn-primary btn-block mt-4`} onClick={gmailSignIn}>
        <FcGoogle />
    </button>
  );
};
export default SubmitBtn;
