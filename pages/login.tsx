import Image from "next/image";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";
import authService from "../services/authService";  // Importar authService

export default function Login() {
  const router = useRouter();
  const [ciruc, setCiruc] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const payload = {
        email: username,  // Asegúrate de pasar el 'email'
        contrasena: password,
        rucCI: ciruc,
      };
  
      // Llama al servicio de login
      const response = await authService.login(payload);
  
      console.log("Datos de la respuesta:", response);
      const { accessToken, role } = response;  // Extrae correctamente el role

      console.log("Acceso recibido:", accessToken);  // Verifica que el accessToken esté presente
      console.log("Rol recibido:", role);
  
      if (role) {
        Cookies.set("token", accessToken, { expires: 1, path: "/" });
        console.log("Rol recibido:", role);
  
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/principal");
        }
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Error al iniciar sesión. Verifique sus credenciales.");
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
        <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
          ¡Bienvenido!
        </h1>

        {/* Formulario */}
        <div className="bg-darkForm p-6 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-primary">RUC o CI:</label>
              <input
                type="text"
                placeholder="Ingrese su RUC o CI"
                value={ciruc}
                onChange={(e) => setCiruc(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-darkInput text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-primary">Usuario:</label>
              <input
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-darkInput text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-primary">Contraseña:</label>
              <input
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-darkInput text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex justify-between text-sm mt-2">
              <button 
                type="button"
                className="text-primary underline hover:text-opacity-80"
                onClick={() => router.push("/register")}
              >
                Registrarse
              </button>
              <button type="button" className="text-primary underline hover:text-opacity-80">
                Olvidé mi contraseña
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-black font-bold py-2 rounded-md hover:bg-opacity-80 transition mt-4"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between w-full max-w-md mt-6 text-primary">
        <span>JUSTIN Y ERICK</span>
        <button
          onClick={() => router.push("/admin")}
          className="hover:underline"
        >
          Admin →
        </button>
      </div>
    </div>
  );
}
