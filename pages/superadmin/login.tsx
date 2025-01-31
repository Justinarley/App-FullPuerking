import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Usuario Admin quemado
  const ADMIN_CREDENTIALS = {
    username: "superadmin",
    password: "superadmin123",
    role: "superadmin",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Generar token quemado
      const token = JSON.stringify({
        username: ADMIN_CREDENTIALS.username,
        role: ADMIN_CREDENTIALS.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expira en 1 hora
      });

      // Guardar en cookies
      Cookies.set("adminToken", token, { expires: 1, path: "/" });

      // Redirigir al dashboard
      router.push("/superadmin/Home");
    } else {
      alert("Credenciales incorrectas");
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
          ¡Bienvenido Admin!
        </h1>

        {/* Formulario */}
        <div className="bg-darkForm p-6 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-primary">Usuario:</label>
              <input
                type="text"
                placeholder="Ingrese su usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md bg-darkInput text-white focus:outline-none focus:ring-2 focus:ring-primary"
                required
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
                required
              />
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
    </div>
  );
}
