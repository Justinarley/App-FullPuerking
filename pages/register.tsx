import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import authService from "../services/authService";  // Asegúrate de importar el servicio

export default function Register() {
  const router = useRouter();

  const [rucCI, setRucCI] = useState("");
  const [email, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [contrasenaValida, setContrasenaValida] = useState({
    minLength: false,
    hasUpperCase: false,
    hasSpecialChar: false,
  });
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  const validatePassword = (password: string) => {
    setContrasenaValida({
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newUser = {
      rucCI,
      email,
      contrasena,
      role: "cliente",
    };

    try {
      // Usamos el servicio authService para registrar el usuario
      await authService.register(newUser);
      console.log("Usuario creado exitosamente:", newUser);
      setMessage({ type: "success", text: "Usuario creado exitosamente" });
      setTimeout(() => router.push("/login"), 2000);
    } catch {
      setMessage({ type: "error", text: "Hubo un error al registrar el usuario. Inténtalo de nuevo." });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-6">
      {/* Logo */}
      <Image
        src="/logo.png"
        alt="Logo de la empresa"
        width={180}
        height={120}
        className="mb-6"
      />

      {/* Contenedor principal */}
      <div className="bg-darkGray p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Mensaje de bienvenida */}
        <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
          ¡Regístrate!
        </h1>

        {/* Mensaje de éxito o error */}
        {message && (
          <div
            className={`p-4 mb-4 rounded-lg text-white ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Formulario */}
        <div className="bg-darkForm p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-primary">RUC o CI:</label>
              <input
                type="text"
                value={rucCI}
                onChange={(e) => setRucCI(e.target.value)}
                placeholder="Ingrese su RUC o CI"
                className="w-full p-2 border border-gray-500 rounded-md bg-darkInput text-white focus:outline-none focus:ring-2 focus:ring-primary"
                minLength={9}
                maxLength={13}
                required
              />
            </div>

            <div>
              <label className="block text-primary">Usuario (Correo):</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese su correo"
                className="w-full p-2 border border-gray-500 rounded-md bg-darkInput text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-primary">Contraseña:</label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => {
                  setContrasena(e.target.value);
                  validatePassword(e.target.value);
                }}
                placeholder="Ingrese su contraseña"
                className="w-full p-2 border border-gray-500 rounded-md bg-darkInput text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <ul className="text-sm mt-2 text-gray-400">
                <li className={`${contrasenaValida.minLength ? "text-green-500" : "text-red-500"}`}>
                  {contrasenaValida.minLength ? "✔ Mínimo 8 caracteres" : "❌ Mínimo 8 caracteres"}
                </li>
                <li className={`${contrasenaValida.hasUpperCase ? "text-green-500" : "text-red-500"}`}>
                  {contrasenaValida.hasUpperCase ? "✔ Al menos una mayúscula" : "❌ Al menos un a mayúscula"}
                </li>
                <li className={`${contrasenaValida.hasSpecialChar ? "text-green-500" : "text-red-500"}`}>
                  {contrasenaValida.hasSpecialChar ? "✔ Al menos un carácter especial" : "❌ Al menos un carácter especial"}
                </li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-black font-bold py-2 rounded-md hover:bg-opacity-80 transition mt-4"
              disabled={
                !contrasenaValida.minLength ||
                !contrasenaValida.hasUpperCase ||
                !contrasenaValida.hasSpecialChar ||
                !rucCI ||
                !email
              }
            >
              Registrar
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between w-full max-w-md mt-6 text-primary">
        <button
          onClick={() => router.push("/login")}
          className="text-primary underline hover:text-opacity-80"
        >
          Ya tengo cuenta
        </button>
      </div>
    </div>
  );
}
