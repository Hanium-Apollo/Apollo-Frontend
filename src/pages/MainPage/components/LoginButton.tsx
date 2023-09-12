import github from "../../../assets/images/github_logo.png";
import "../../../assets/css/button.css";

const LoginButton = () => {
  const handleLogin = () => {
    const githubAuthUrl = process.env.REACT_APP_AUTH_URL as string;
    window.location.href = githubAuthUrl;
    localStorage.setItem("action", "userSignIn");
  };

  return (
    <button className="login" onClick={handleLogin}>
      <img src={github} className="github" alt="github" />
      Login with GitHub
    </button>
  );
};

export default LoginButton;
