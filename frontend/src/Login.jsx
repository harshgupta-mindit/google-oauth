// Login.jsx

const Login = () => {
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:4002/auth/google';
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={loginWithGoogle}>Login with Google</button>
    </div>
  );
};

export default Login;
