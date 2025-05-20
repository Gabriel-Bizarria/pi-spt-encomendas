import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/slices/authSlice";
import InputField from "../components/InputField";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username }));
    navigate("/dashboard");
  };

  return (
    <div className="bg-gray-200 h-screen w-full flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-[440px] p-8">
        <div className="bg-gray-100 w-full h-[120px] mx-auto mb-8 flex items-center justify-center">
          {/* Replace this div with your logo */}
          <span className="text-gray-400">Logo</span>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Usuário</label>
            <InputField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="admin@example.com"
              className="w-full"
              labelTop={false}
              label=""
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <InputField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full"
              labelTop={false}
              label=""
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-800 text-white rounded hover:bg-green-700 transition-colors mt-6"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
