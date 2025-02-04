import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token"); // Eliminar el token
    router.push("/login"); // Redirigir al login
  };

  return (
    <div>
      <h1>Home principal de usuario</h1>
      <button onClick={handleLogout} className="mt-4 p-2 bg-red-500 text-white rounded">
        Cerrar sesión
      </button>
    </div>
  );
}
