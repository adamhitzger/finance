import DeleteAccountButton from '@/components/DeleteAccountButton';
import SignInForm from '@/components/signinform'
import { getUser } from '@/lib/db/auth'
import React from 'react'

export default async function SignInPage() {
    const user = await getUser();
    return (
        <main className="my-40 mx-10 text-center flex flex-col justify-center gap-y-5">
            <div className='mx-auto w-full lg:w-1/2 gap-y-5'>
                {user &&
                    <div className='flex justify-between my-10'>
                        <span>Přihlášen uživatel: {user?.email}</span> <span><DeleteAccountButton /></span>
                    </div>
                }
                <div className="w-full flex flex-col py-3">
                    <h1 className="text-center text-5xl pb-5">Přihlášení</h1>
                    <h2 className="text-center text-2xl">Funguje pouze pro adminy webu.</h2>
                </div>

                <SignInForm />


            </div>
        </main>
    )
}
