import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="btn btn-block btn-primary" onClick={() => loginWithRedirect()} type="button">Log In</button>;
};

export default LoginButton;