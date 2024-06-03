"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { loginAction } from "@/lib/db/actions/users";
export default function SignInForm() {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleClickLoginButton = (formData: FormData) => {
        startTransition(async () => {
            const { errorMessage } = await loginAction(formData);
            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                setForm({
                    email: "",
                    password: "",
                })
                toast.success("Logged in");
                router.push("/");
            }
        });
    };
    return (
        <div>
            <form className="w-full  p-5 border rounded-[25px] 2xl:m-5" action={handleClickLoginButton}>
                <div className="text-2xl my-5">
                    <label htmlFor="email">Email</label>
                </div>
                <div className="mb-5 border-b-2 border-solid border-black">
                    <input className="w-full p-2" type="email" name="email" id='email' value={form.email} onChange={handleChange} required />
                </div>
                <div className="text-2xl my-5">
                    <label htmlFor="password">Heslo</label>
                </div>
                <div className="mb-5 border-b-2 border-solid border-black">
                    <input className=" w-full p-2" type="password" name='password' id='password' value={form.password} onChange={handleChange} required />
                </div>

                <div className="text-xl font-semibold ">
                    <Button className="border px-5 py-3 rounded-[10px]" type="submit" disabled={isPending}>{isPending ? "Přihlašování..." : "Přihlásit se"}</Button>
                </div>
            </form>
        </div>
    )
}