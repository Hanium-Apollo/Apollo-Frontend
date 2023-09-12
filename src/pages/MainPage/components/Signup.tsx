import "../../../assets/css/MainPage.css";

export const Signup = () => {
  const handleSignup = () => {
    const githubAuthUrl = process.env.REACT_APP_AUTH_URL as string;
    window.location.href = githubAuthUrl;
    localStorage.setItem("action", "userSignUp");
  };

  return (
    <p className="signup" onClick={handleSignup}>
      signup
    </p>
  );
};
