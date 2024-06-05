"use client";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createReview, updateReview } from "@/lib/db/actions/review";
import { Star } from "lucide-react";
import { Review } from "@/types";

export const dynamic = "force-dynamic";

type Props = {
    initialData: Review | null;
}

export default function AddReview({ initialData }: Readonly<Props>) {
    const action = initialData ? 'Upravit' : 'Odeslat';
    const pending = initialData ? "Upravuji..." : "Odesílám...";
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState({
        id: initialData?.id,
        fullname: initialData?.fullname || "",
        image: initialData?.image || "",
        content: initialData?.content || "",
        stars: initialData?.stars || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSelectChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
    }

    const handleCreateReview = async (formData: FormData) => {
        startTransition(async () => {
            await createReview(formData);
            setForm({
                id: 0,
                fullname: "",
                image: "",
                content: "",
                stars: "",
            })
        });
    }

    const handleUpdateReview = async (formData: FormData) => {
        startTransition(async () => {
            await updateReview(formData);
            setForm({
                id: 0,
                fullname: "",
                image: "",
                content: "",
                stars: "",
            })
        });
    }

    return (
        <div className="w-full lg:w-1/2 mx-auto p-5 border rounded-[25px] bg-white lg:p-10 ">
            <form className="" action={initialData ? handleUpdateReview : handleCreateReview}>
                <div className="text-2xl my-5">
                    <label htmlFor="fullname">Celé jméno</label>
                </div>
                <div className="mb-5 border-b-2 border-solid border-black">
                    <input className=" w-full p-2" type="text" name='fullname' id='fullname' value={form.fullname} onChange={handleChange} required />
                </div>
                <div className="text-2xl my-5">
                    <label htmlFor="image">Url adresa obrázku: <i>https://www...</i></label>
                </div>
                <div className="mb-5 border-b-2 border-solid border-black">
                    <input className=" w-full p-2" type="text" name='image' id='image' value={form.image} onChange={handleChange} />
                </div>
                <div className="text-2xl my-5">
                    <label htmlFor="stars">Hodnocení</label>
                </div>
                <Select name="stars" value={String(form.stars)} onValueChange={(value) => handleSelectChange("stars", value)} disabled={isPending}>
                    <SelectTrigger className="w-full lg:w-2/3  h-12">
                        <SelectValue placeholder="Počet hvězd" />
                    </SelectTrigger>
                    <SelectContent className="backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
                        <SelectItem value="1"><Star /></SelectItem>
                        <SelectItem value="2"><div className="flex flex-row" ><Star /><Star /></div></SelectItem>
                        <SelectItem value="3"><div className="flex flex-row" ><Star /><Star /><Star /></div></SelectItem>
                        <SelectItem value="4"><div className="flex flex-row" ><Star /><Star /><Star /><Star /></div></SelectItem>
                        <SelectItem value="5"><div className="flex flex-row" ><Star /><Star /><Star /><Star /><Star /></div></SelectItem>
                    </SelectContent>
                </Select>

                <div className="text-2xl my-5">
                    <label htmlFor="content">Zpráva</label>
                </div>
                <div className="mb-5 border-b-2 border-solid border-black">
                    <textarea className=" w-full p-2" name='content' id='content' value={form.content} onChange={handleChange} required></textarea>
                </div>
                {initialData && (
                    <input type="hidden" name="id" value={form.id} />
                )}
                <div className="text-xl font-semibold ">
                    <Button size="lg" className="border px-5 py-3 rounded-[10px]" type="submit" disabled={isPending}>{isPending ? "Odesílám..." : "Odeslat"}</Button>
                </div>
            </form>
        </div>
    )
}
