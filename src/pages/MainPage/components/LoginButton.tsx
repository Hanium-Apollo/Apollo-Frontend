import github from "../../../assets/images/github_logo.png";
import "../../../assets/css/button.css";

export function handleLogout() {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  window.location.href = "/";
}

const LoginButton = () => {
  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=7600733c0c5ed7849ce6`;
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
