"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { signOutAction } from "@/lib/db/actions/users";


function DeleteAccountButton() {
    const [isPending, startTransition] = useTransition();

    const handleClickDeleteAccountButton = async () => {
        startTransition(async () => {
            const { errorMessage } = await signOutAction();
            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                toast.success("Uživatel odhlášen");
            }
        });
    };

    return (
        <Button
            onClick={handleClickDeleteAccountButton}
            variant="outline"
            size="default"
        >
            {isPending ? "Odhlašování..." : "Odhlásit se"}
        </Button>
    );
}

export default DeleteAccountButton;