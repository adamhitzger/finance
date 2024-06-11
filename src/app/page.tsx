
import { ReviewCards } from '@/components/reviewCard';
import Contact from "@/components/contact";
import { StarRating } from "@/lib/utils";
import { supabase } from "@/lib/db/client";
import MainLayout from '@/components/pageComponents/main';


export const dynamic = "force-dynamic";


export default async function Home() {

  const { data, error } = await supabase.from("reviews").select("*").order("id", { ascending: false });

  console.log(data)
  return (
    <main className="min-h-screen">
      {/** Header Something about us*/}
      <MainLayout />
      <section className='min-h-screen flex flex-col p-10 gap-y-5'>
        <h1 className="text-center text-5xl pb-5">Reference</h1>
        <h2 className="text-center text-2xl">Reference mluví za nás. Odrážejí skutečné zkušenosti a spokojenost našich klientů a kvality našich služeb.</h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
          {data &&
            data.map((review) => (
              <ReviewCards key={review.id} id={review.id} title={<StarRating rating={review.stars} />} subtitle={review.fullname} content={review.content} imgUrl={review?.imageUrl} />
            ))}
        </div>
      </section>
      <section className='my-10 mx-5'>
        <h1 className="text-center text-5xl pb-5">První krok.
          K prvnímu kroku.</h1>
        <h2 className="text-center text-2xl">Rádi se vám ozveme a domluvíme si s Vámi schůzku.</h2>
        <Contact />
      </section>
    </main>
  );
}
