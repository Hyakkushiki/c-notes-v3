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
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        {/* <h1 className="text-3xl font-bold underline text-red-400">Notes!</h1> */}

        <div className="flex flex-row justify-between p-4 w-full h-[calc(100vh_-_4rem)]">
          <div className="w-80 md:w-1/2">
            <NoteOperations getSingleNote={getSingleNote} />
          </div>
          <div className="w-80 md:w-1/2">
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
