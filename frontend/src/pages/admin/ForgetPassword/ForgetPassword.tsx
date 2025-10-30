import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  requestAdminPasswordChangeCode,
  verifyAdminPasswordChageCode,
  putAdminNewPassword,
  getAdminByEmail,
} from "../../../features/admin/admin.service";
import Alert from "../../../components/UI/Alert";
import { CircleX } from "lucide-react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [adminId, setAdminId] = useState<number | null>(null);
  const [confirmCodeForm, setConfirmCodeForm] = useState(false);
  const [validCode, setValidCode] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertText, setAlertText] = useState("");
  const [alertIcon, setAlertIcon] = useState<React.ReactNode | null>(null);

  const navigate = useNavigate();

  function resetAlert() {
    setAlert(false);
    setAlertColor("");
    setAlertText("");
    setAlertIcon(null);
  }

  async function sendChangePasswordCode() {
    try {
      const response = await getAdminByEmail(email);
      const id = response.id;
      setAdminId(id);
      setError(false);
      const data = {
        id: id,
      };
      try {
        setConfirmCodeForm(true);
        await requestAdminPasswordChangeCode(data);
      } catch (error) {
        let message = "Erro desconhecido";

        if (error instanceof Error) {
          message = error.message;
        } else if (typeof error === "object" && error !== null && "response" in error) {
          // @ts-ignore
          message = error.response?.data?.detail || message;
        }
        setAlert(true);
        setAlertColor("red");
        setAlertText(`Erro: (${message})`);
        setAlertIcon(<CircleX size={20} className="text-red-800" />);
      }
    } catch (error) {
      setError(true);
    }
  }

  async function verifyPasswordCode() {
    const data = {
      id: adminId ? adminId : -1,
      code: code,
    };
    try {
      const response = await verifyAdminPasswordChageCode(data);
      if (response) {
        setValidCode(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  async function changePassword() {
    const data = {
      id: adminId ? adminId : -1,
      new_password: newPassword,
    };
    try {
      setConfirmCodeForm(true);
      await putAdminNewPassword(data);
      setPasswordChanged(true);
    } catch (error) {
      let message = "Erro desconhecido";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "object" && error !== null && "response" in error) {
        // @ts-ignore
        message = error.response?.data?.detail || message;
      }
      setAlert(true);
      setAlertColor("red");
      setAlertText(`Erro: (${message})`);
      setAlertIcon(<CircleX size={20} className="text-red-800" />);
    }
  }

  function returnLoginPage() {
    navigate("/admin/login");
  }

  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="flex-1 justify-self-center self-center flex flex-col gap-6 mb-12">
          <h1 className="text-center text-3xl text-orange-400">PAINEL DE ADMINISTRADOR</h1>
          <div className="outline-1 -outline-offset-1 rounded-2xl outline-gray-200 p-10 w-1/4 self-center">
            {!confirmCodeForm && !validCode && (
              <div className="space-y-7">
                <div>
                  <h3 className="text-center text-lg text-gray-600">Digite seu email e será enviado um código para realizar a alteração da senha</h3>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm/6 font-medium text-orange-500">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
                    />
                    <p className={`text-red-400 ${error ? "" : "hidden"} pt-2 text-sm/6 font-medium`}>Email Incorreto</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={email === ""}
                    onClick={sendChangePasswordCode}
                    className="flex w-full justify-center rounded-md cursor-pointer bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:bg-orange-200 disabled:hover:bg-orange-200 disabled:cursor-not-allowed"
                  >
                    ENVIAR CÓDIGO
                  </button>
                </div>
              </div>
            )}
            {confirmCodeForm && !validCode && (
              <div className="space-y-7">
                <div>
                  <h3 className="text-center text-lg text-gray-600">Digite o código de confirmação enviado para o email digitado anteriormente</h3>
                </div>
                <div>
                  <label htmlFor="code" className="block text-sm/6 font-medium text-orange-500">
                    Código
                  </label>
                  <div className="mt-2">
                    <input
                      type="code"
                      name="code"
                      id="code"
                      autoComplete="code"
                      onChange={(e) => setCode(e.target.value)}
                      className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
                    />
                    <p className={`text-red-400 ${error ? "" : "hidden"} pt-2 text-sm/6 font-medium`}>Código Incorreto</p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={code === ""}
                    onClick={verifyPasswordCode}
                    className="flex w-full justify-center rounded-md cursor-pointer bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:bg-orange-200 disabled:hover:bg-orange-200 disabled:cursor-not-allowed"
                  >
                    CONFIRMAR CÓDIGO
                  </button>
                </div>
              </div>
            )}
            {validCode && !passwordChanged && (
              <div className="space-y-7">
                <div>
                  <h3 className="text-center text-lg text-gray-600">Digite a sua nova senha</h3>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm/6 font-medium text-orange-500">
                    Senha
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="block w-full rounded-md bg-gray-50 px-3 py-1.5 text-base text-gray-600 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-white0 focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 00 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={newPassword === ""}
                    onClick={changePassword}
                    className="flex w-full justify-center rounded-md cursor-pointer bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:bg-orange-200 disabled:hover:bg-orange-200 disabled:cursor-not-allowed"
                  >
                    CONFIRMAR
                  </button>
                </div>
              </div>
            )}
            {passwordChanged && (
              <div className="space-y-7">
                <div>
                  <h3 className="text-center text-lg text-gray-600">Senha Alterada com Sucesso!</h3>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={returnLoginPage}
                    className="flex w-full justify-center rounded-md cursor-pointer bg-orange-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:bg-orange-200 disabled:hover:bg-orange-200 disabled:cursor-not-allowed"
                  >
                    VOLTAR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {alert && <Alert color={alertColor} text={alertText} icon={alertIcon} onClose={() => resetAlert()} />}
      </div>
    </>
  );
}
