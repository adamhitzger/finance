"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../client";
import { redirect } from "next/navigation";

export async function createReview(formData: FormData){
    try{
        const fullname = String(formData.get("fullname"));
        const image = String(formData.get("image"));
        const content = String(formData.get("content"));
        const stars = Number(formData.get("stars"));

        const {data, error} = await supabase.from("reviews").insert({
            fullname: fullname,
            imageUrl: image,
            created_at: new Date().toISOString(),
            content: content,
            stars: stars,
        });
        console.log(fullname + "|" + image + "|"+ content + "|" + stars)
    }catch(error){
        console.error(error); 
    }
    revalidatePath("/reviews");
}

export async function updateReview(formData: FormData){
        const id = Number(formData.get("id"));
        const fullname = String(formData.get("fullname"));
        const image = String(formData.get("image"));
        const content = String(formData.get("content"));
        const stars = Number(formData.get("stars"));

    try{
        
        const {data, error} = await supabase.from("reviews").update({
            id: id,
            fullname: fullname,
            imageUrl: image,
            created_at: new Date().toISOString(),
            content: content,
            stars: stars,
        }).eq("id", id);
        console.log(fullname + "|" + content + "|" + stars)
        
    }catch(error){
        console.error(error); 
    }
    revalidatePath(`/reviews/${id}`);
    revalidatePath(`/reviews`);
    redirect("/reviews");
}

export async function deleteReview(formData: FormData){
    try{
        const id = Number(formData.get("id"));
        const {data, error} = await supabase.from("reviews").delete().eq("id", id).single();
    }catch (error) {
        console.error(error);
      }
      revalidatePath(`/reviews`); 
}