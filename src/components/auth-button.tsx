"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js"; // Asegúrate de importar el tipo User
import { GoogleIcon } from "./icons";

export function AuthButton() {
  const supabase = createClient(); // Cliente de Supabase en componentes cliente
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();
  }, [supabase]);

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // URL de redirección dinámica
      },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut(); // Cierra sesión en Supabase
    router.push("/login"); // Redirige a /login
    router.refresh(); // Refresca la página actual
  };

  return (
    <header>
      {user === null ? (
        <button
          onClick={handleSignIn}
          type="button"
          className="w-60 text-black bg-[#ececec] hover:bg-[#e6e6e6] focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-bold rounded-full text-md py-2 inline-flex items-center justify-start"
        >
          <GoogleIcon className="w-8 h-8 ml-1 mr-3" />
          Continuar con Google
        </button>
      ) : (
        <button
          onClick={handleSignOut}
          type="button"
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2"
        >
          Cerrar Sesión
        </button>
      )}
    </header>
  );
}
