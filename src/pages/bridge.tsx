import { type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Bridge: NextPage = () => {
  return (
    <>
      <Head>
        <title>Serpentines</title>
        <meta
          name="description"
          content="Serpentines Digital Collectible NFT Minting on Polygon Blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b  from-[#7b3fe4] to-[#15162c] bg-cover bg-fixed leading-normal tracking-normal text-indigo-400">
        <Header />
        <div className="container mx-auto flex flex-col flex-wrap items-center pt-2 md:flex-row md:pt-4">
          <iframe
            src="https://umbria.network/widgetv2/"
            width="100%"
            height="800"
            className="overflow-hidden"
          ></iframe>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Bridge;
