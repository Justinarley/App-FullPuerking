import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Decodificar el token para obtener el rol (Usa jwt-decode si es necesario)
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userRole = decodedToken.role;

    const pathname = req.nextUrl.pathname;

    // Verificar rutas específicas para cada rol
    const adminRoutes = ["/admin"];
    const superAdminRoutes = ["/superadmin"];
    const clienteRoutes = ["/cliente"];

    // Redirigir según el rol
    if (adminRoutes.includes(pathname) && userRole !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (superAdminRoutes.includes(pathname) && userRole !== "superadmin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (clienteRoutes.includes(pathname) && userRole !== "cliente") {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirigir a la página correspondiente si el rol no está autorizado para la ruta
    if (userRole === "superadmin" && !pathname.startsWith("/superadmin")) {
      return NextResponse.redirect(new URL("/superadmin/home", req.url));
    }
    if (userRole === "admin" && !pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (userRole === "cliente" && !pathname.startsWith("/cliente")) {
      return NextResponse.redirect(new URL("/cliente", req.url));
    }
  } catch (error) {
    console.error("Error al procesar el token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/superadmin/:path*", "/admin/:path*", "/cliente/:path*"],
};
