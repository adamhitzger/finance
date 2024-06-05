import AddReview from '@/components/add-review'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/db/client';
import { Cards, ReviewCards } from '@/components/reviewCard';
import Link from 'next/link'
import Contact from '@/components/contact';
import { StarRating } from '@/lib/utils';

export default async function Reviews() {
    const { data, error } = await supabase.from("reviews").select("*").order("id", { ascending: false });


    console.log(data)
    return (
        <main className="min-h-screen">
            <section className="flex p-10 items-center w-full min-h-screen bg-[url('/img/money.png')] bg-repeat bg- bg-center">
                <div className="flex flex-col justify-start w-full text-justify">

                    <div className="w-full md:w-1/2 flex flex-col gap-y-4 my-28 lg:my-10">
                        <h1 className='text-7xl'>Co o nás píšou klienti.</h1>
                        <p className="text-xl leading-relaxed lg:text-2xl ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga sit id esse labore repudiandae perspiciatis, deserunt accusamus dolor magnam ipsum debitis minus at asperiores amet eveniet suscipit et dignissimos molestiae.</p>
                        <Button variant="destructive" size="lg" className="w-1/2 px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200" asChild>
                            <Link href="/#contact" className="text-xl">Kontaktujte nás</Link>
                        </Button>

                    </div>
                </div>
            </section>
            <section className='min-h-screen flex flex-col p-10 gap-y-5'>
                <h1 className="text-center text-5xl pb-5">Napište nám hodnocení</h1>
                <h2 className="text-center text-2xl">Pomůžete nejen nám ale i ostatním aby se rozhodli zda s námi spolupracovat</h2>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                    {data &&
                        data.map((review) => (
                            <ReviewCards key={review.id} id={review.id} title={<StarRating rating={review.stars} />} subtitle={review.fullname} content={review.content} imgUrl={review?.imageUrl} />
                        ))}
                </div>
                <hr />
                <AddReview initialData={null} />
            </section>
            <section className='my-10 mx-5'>
                <h1 className="text-center text-5xl pb-5">Přesvědčili jsme Vás</h1>
                <h2 className="text-center text-2xl">Neváhejte nás kontaktovat a domluvte si s námi schůzku.</h2>
                <Contact />
            </section>

        </main>
    )
}

