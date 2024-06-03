"use server";

import { getSupabaseAuth, protect } from "../auth"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const loginAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const auth = getSupabaseAuth();

    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    if (!data.session) throw new Error("No session");
    revalidatePath(`/sign-in`);
    redirect("/reviews");
    
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { errorMessage };
  }
  
};

export const signOutAction = async () => {
  try {
    await protect();

    const auth = getSupabaseAuth();

    const { error } = await auth.signOut();
    if (error) throw error;
    revalidatePath(`/sign-in`);
    redirect("/");
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { errorMessage };
  }
  
};
