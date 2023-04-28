import Head from "next/head";
import { Inter } from "next/font/google";
import NoteOperations from "@/components/NoteOperations";
import NoteDetails from "@/components/NoteDetails.tsx";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [id, setId] = useState<string | null>(null);
  const getSingleNote = (id: string) => {
    setId(id);
  };

  return (
    <>
      <HeadCompnent />
      <main
        className={`flex min-h-screen items-center content-center p-6 ${inter.className}`}
      >
        {/* <h1 className="text-3xl font-bold underline text-red-400">Notes!</h1> */}

        <div className="flex flex-col-reverse md:flex-row justify-start w-full content-center p-2">
        {/* h-[calc(100vh_-_4rem)] */}
          <div className="md:w-1/2 md:px-6">
            <NoteOperations getSingleNote={getSingleNote} />
          </div>
          <div className="pb-8 md:w-1/2 md:px-6">
            <NoteDetails ID={id} />
          </div>
        </div>
      </main>
    </>
  );
}

const HeadCompnent = () => {
  return (
    <Head>
      <title>Notes App w/firebase</title>
      <meta name="description" content="C-Notes" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
