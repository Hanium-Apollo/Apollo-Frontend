import "../../../assets/css/MainPage.css";

export const Signup = () => {
  const handleSignup = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=aaf4ee42ea6e3043265c`;
    window.location.href = githubAuthUrl;
    localStorage.setItem("action", "userSignUp");
  };

  return (
    <p className="signup" onClick={handleSignup}>
      signup
    </p>
  );
};
