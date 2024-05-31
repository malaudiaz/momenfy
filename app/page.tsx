import { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./ui/fonts";

export const metadata: Metadata = {
  title:
    "Momenfy | Aquí comienza tú legado",
  description: "Prepara tú legado para tus seres queridos",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Bienvenido a Momenfy.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>


          <Link
            href="/auth/signin"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>


        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* <Image src='/hero-desktop.png' alt='Screenshots of desktop' height={760} width={1000} className='hidden md:block' />
          <Image src='/hero-mobile.png' alt='Screenshots of desktop' height={760} width={1000} className='block md:hidden' /> */}



        </div>
      </div>


    </main>
  );
}
