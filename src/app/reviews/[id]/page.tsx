import AddReview from '@/components/add-review';
import React from 'react'
import { getUser } from '@/lib/db/auth';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/db/client';
export default async function Review({ params }: { params: { id: string } }) {
    const user = await getUser();
    if (!user) redirect("/sign-in");
    //volání dat z databáze s where id se rovná id stánce
    const { data, error } = await supabase.from("reviews").select().filter('id', 'eq', params.id).single();
    //formulář pro CUD fce a předává data na základě url, zobrazení lognutého usera
    return (
        <div className="z-10 max-w-5xl w-full mx-auto p-5 my-40 items-center justify-between font-mono text-sm ">
            <AddReview initialData={data} />
        </div>
    )
}
