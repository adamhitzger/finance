import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { Cards, ReviewCards } from '@/components/reviewCard';
import Link from "next/link";
import { Words, CardType } from "@/types";
import Image from "next/image";
import Contact from "@/components/contact";
import { StarRating } from "@/lib/utils";
import { supabase } from "@/lib/db/client";

export const dynamic = "force-dynamic";


export default async function Home() {
  const { data, error } = await supabase.from("reviews").select("*").order("id", { ascending: false });
  const words: Words[] = [
    {
      text: "Pomůžeme",
    },
    {
      text: "Vám",
    },
    {
      text: "s",
    },
    {
      text: " financemi.",
      className: "text-amber-800",
    }
  ];

  const steps: CardType[] = [
    {
      imgUrl: "/img/target.png",
      title: "První schůzka",
      subtitle: "Vaše situace",
      content: "Seznámení se a společná analýza vašich přání a cílů. Zhodnocení dosud využívaných produktů i finančních možností. Společná definice zadání pro vytvoření finančního plánu.",

    },
    {
      imgUrl: "/img/plan.png",
      title: "Druhá schůzka",
      subtitle: "Stanovení priorit a plánů",
      content: "Prezentace prvních návrhů osobního finančního plánu. Diskuze nad předloženými variantami. Výběr optimální cesty a její případné úpravy. Společná dohoda o dalším postupu. Dejte nám důvěru a my uděláme vše, abychom předčili vaše očekávání.",

    },
    {
      imgUrl: "/img/coins-chart.png",
      title: "Další schůzky",
      subtitle: "Řešení",
      content: "Nastavování stávajících i nových finančních produktů podle osobního finančního plánu. Průběžné upozorňování na důležité termíny, změny a novinky. Pravidelné aktualizace osobního finančního plánu.",

    },
  ];
  console.log(data)
  return (
    <main className="min-h-screen">
      {/** Header Something about us*/}
      <section className="flex p-10 items-center w-full min-h-screen bg-[url('/img/demo-header.jpg')]">
        <div className="flex flex-col justify-start w-full text-justify">
          <TypewriterEffectSmooth words={words} />
          <div className="w-full md:w-1/2 flex flex-col gap-y-4">
            <p className="text-xl leading-relaxed lg:text-2xl ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga sit id esse labore repudiandae perspiciatis, deserunt accusamus dolor magnam ipsum debitis minus at asperiores amet eveniet suscipit et dignissimos molestiae.</p>
            <Button variant="destructive" size="lg" className="w-1/2 px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200" asChild>
              <Link href="/#contact" className="text-xl">Kontaktujte nás</Link>
            </Button>
          </div>
        </div>
      </section>
      {/**Our service */}
      <section className="p-10 w-full bg-skin">
        <div className="flex flex-col w-full gap-x-8">
          <h1 className="text-center text-6xl my-5">Naše služby</h1>
          <p className="text-center text-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
          <div className="flex flex-wrap flex-row gap-y-10 place-content-center sm:gap-x-10 m-10">
            <Cards
              title="Naše služby"
              subtitle="Námi nabízené finanční služby"
              content={
                <>
                  <ul className="list-disc list-inside">
                    <li>Finančního plánování a analýzy</li>
                    <li>Správy investic</li>
                    <li>Účetnictví</li>
                    <li>Daňového poradenství</li>
                  </ul>
                </>
              }
              className="w-fit"
            />
            <Cards
              title="Naše specializace"
              subtitle="Připravíme Vás do budoucna"
              content={
                <>
                  <ul className="list-disc list-inside">
                    <li>Zajištění přijmů</li>
                    <li>Financování bydlení</li>
                    <li>Penze</li>
                    <li>Investice</li>
                    <li>Ochrana majetku</li>
                  </ul>
                </>
              }
              className="w-fit"
            />
          </div>
          <Button variant="destructive" size="lg" className="m-auto w-1/3 px-5 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200" asChild>
            <Link href="/about-us" className="text-2xl">Zjistěte o nás více</Link>
          </Button>
        </div>
      </section >
      {/**How to be our client */}
      <section className="p-10 w-full bg-skin text-center">
        <h1 className="my-10 text-5xl">Jak se stát naším klientem</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center my-10 gap-y-10 md:gap-x-14">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col my-5">
              <Image src={step.imgUrl!} alt={step.imgUrl!} width={180} height={180} className="m-auto" />

              <Cards
                title={step.title}
                subtitle={step.subtitle}
                content={step.content}
                className="border-none text-justify"
              />
            </div>
          ))}
        </div>
        <Button variant="destructive" size="lg" className="m-auto w-1/2 sm:w-1/3 px-5 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200" asChild>
          <Link href="/#contact" className="text-2xl">Obraťte se na nás</Link>
        </Button>
      </section>
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
