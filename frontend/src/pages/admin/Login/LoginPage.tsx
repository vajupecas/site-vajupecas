import { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!auth) return;
    setError(false);
    try {
      await auth?.login(email, password);
      navigate("/admin/home");
    } catch {
      setError(true);
    }
  }

  async function handleForgetPassoword() {
    navigate("/admin/forget-password");
  }

  return (
    <>
      <div className="h-screen w-screen content-center ">
        <div className="justify-self-center flex flex-col gap-6 mb-12">
          <h1 className="text-center text-3xl font-semibold text-orange-400">PAINEL DE ADMINISTRADOR</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            method="POST"
            className="space-y-6 outline-2 -outline-offset-1 rounded-2xl outline-gray-300 p-10"
          >
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-orange-500">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-orange-500">
                  Senha
                </label>
                <div className="text-sm">
                  <div onClick={() => handleForgetPassoword()} className="font-semibold text-orange-500 hover:text-orange-600 cursor-pointer">
                    Esqueceu a senha?
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
                />
              </div>
              <p className={`text-red-400 ${error ? "" : "hidden"} pt-2 text-sm/6 font-medium`}>Email ou senha incorretos</p>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md cursor-pointer bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
