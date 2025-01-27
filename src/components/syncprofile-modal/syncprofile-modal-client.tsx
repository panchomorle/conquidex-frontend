"use client";

import { handleModal, SyncPersonToUser } from "./actions";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import SuccessModal from "../modals/success-modal";
import ErrorModal from "../modals/error-modal";
import { createClient } from "@/utils/supabase/client";
import { supabaseAdmin } from "@/utils/supabase/service-role";
import { revalidatePath } from "next/cache";

interface Props{
    isOpenedByDefault: boolean;
    isOpen: boolean;
    onClose: () => void
  }

export default function SyncProfileModal({isOpenedByDefault, isOpen, onClose}: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [errorModal, setErrorModal] = useState<React.ReactNode>(null);
    const [successModal, setSuccessModal] = useState<React.ReactNode>(null);
    const [member, setMember] = useState<Member | null>(null);


    useEffect(() => {
        (async () => {
            const member = await handleModal(isOpenedByDefault)
            console.log(member);
            setMember(member);
        })();
    }, [isOpenedByDefault]);

    const handleSync = async () => {
        try {
            setIsLoading(true);
            setErrorModal(null);
            const result = await SyncPersonToUser();
            
            if (result.success) {
                setSuccessModal(`Sincronización exitosa`);
            } else {
                setErrorModal(`${result.error}` || `Sincronización fallida`)}
        } catch (err) {
            setErrorModal(`Error desconocido`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        isOpen && member &&
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold mb-4">🍌 ATENCIÓN 🐒</h2>
                <p className="mb-3">
                    Parece que te registraron antes en el club <b>{member.club_name}</b> como <b>{member.name + " " + member.surname}</b>.
                </p>
                <p className="mb-6">¿Sos vos mape?</p>
                
                <div className="flex justify-center space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        onClick={handleSync}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Procesando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
            <ErrorModal onClose={() => setErrorModal(null)}>
            {errorModal}
            </ErrorModal>
            <SuccessModal onClose={() => {setSuccessModal(null); redirect("/");}}>
                {successModal}
            </SuccessModal>
        </div>
        
    );
}

function revalidate(arg0: string) {
    throw new Error("Function not implemented.");
}
