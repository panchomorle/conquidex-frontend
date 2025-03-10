"use client";

import { useUser } from "@/contexts/UserContext";
import PersonForm from "@/components/forms/person-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/buttons/button";
import { MoveLeft } from "lucide-react";

export default function MemberAdd() {
    const { activeProfile } = useUser();
    const router = useRouter();
    if (activeProfile?.role_id === 0 || activeProfile?.role_id === 1) {
        router.push('/home');
    }
    return(
    <>
    <div className="w-full h-full relative p-4 space-y-2">
        <div className="absolute left-4 top-4 z-10">
        <Link href={`/home`}>
            <Button>
            <MoveLeft size={32} />
            </Button>
        </Link>
        </div>
        <h1 className="text-xl font-bold text-center">Nuevo miembro</h1>
        <div className="pt-8">
        <PersonForm></PersonForm>
        </div>
    </div>
    </>
    )

}