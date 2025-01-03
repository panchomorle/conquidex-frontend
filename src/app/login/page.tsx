import { AuthButtonServer } from "@/app/components/auth-button-server";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <img src="./logo.png" alt="conquidex-logo" className="w-1/2" />
      </div>
      <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>
      <AuthButtonServer />
      <p className="mt-4 text-sm">
        ¿Problemas para iniciar sesión?{" "}
        <a href="/help" className=" text-sm text-yellow-400 underline">
          Contáctanos
        </a>
      </p>
    </div>
  );
}
