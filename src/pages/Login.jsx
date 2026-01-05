const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="mb-4 text-2xl font-bold text-center text-blue-600">
          Login
        </h1>
        <p className="text-gray-600">Bienvenido a clipper.</p>
        <button className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600">
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
