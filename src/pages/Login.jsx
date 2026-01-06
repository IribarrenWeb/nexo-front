import { useState } from "react";
import LoginForm from "../components/forms/LoginForm";
import { authService } from "../services/auth-service";

const Login = () => {
    const [data, setData] = useState({});

    const { login } = authService();

    const toLogin = () => {
        login(data);
    }

    return (
      <div className="flex items-center justify-center">
        <div className="p-8 bg-white rounded-lg shadow-md w-96">
          <h1 className="mb-4 text-2xl font-bold text-center text-indigo-500">
            Login
          </h1>

          <LoginForm setData={setData} />

          <button onClick={toLogin} className="mt-9 flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Entrar
          </button>
        </div>
      </div>
    );
};

export default Login;
