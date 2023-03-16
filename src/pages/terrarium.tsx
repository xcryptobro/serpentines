import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Terrarium: NextPage = () => {
  return (
    <>
      <Head>
        <title>Terrarium 1.0</title>
        <meta
          name="description"
          content="Serpentines Digital Collectible NFT Minting on Polygon Blockchain"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gradient-to-b  from-[#7b3fe4] to-[#15162c] bg-cover bg-fixed leading-normal tracking-normal text-indigo-400">
        <Header />
        <div className="container mx-auto my-24 flex flex-col flex-wrap items-center pt-12 md:flex-row">
          <h2 className="mb-2 text-center text-6xl leading-normal text-white">
            Terrarium 1.0
          </h2>
          <Image
            src="/terrarium1.png"
            alt="Terrarium 1.0"
            width={2400}
            height={500}
          />
          <div className="flex-row text-white">
            <p className="text-2xl font-bold text-pink-500">
              A) 1,000 Serpentines Minted
            </p>
            <ul>
              <li>100 MATIC holder raffle.</li>
              <li>5 x Serpentine holder raffles.</li>
            </ul>
            <p className="text-2xl font-bold text-pink-500">
              B) 3,000 Serpentines Minted
            </p>
            <ul>
              <li>Donate 1 robot to a school to help children with autism.</li>
              <li>5 x 100 MATIC holder raffle.</li>
              <li>25 x Serpentine holder raffles.</li>
            </ul>
            <p className="text-2xl font-bold text-pink-500">
              C) 6,000 Serpentines Minted
            </p>
            <ul>
              <li>Donate 1 robot to a school to help children with autism.</li>
              <li>10 x 100 MATIC holder raffle.</li>
              <li>51 x Serpentine holder raffles.</li>
            </ul>
            <p className="text-2xl font-bold text-pink-500">
              D) 10,000 Serpentines Minted
            </p>
            <ul>
              <li>Donate 1 robot to a school to help children with autism.</li>
              <li>51 x 100 MATIC holder raffle.</li>
              <li>151 x Serpentine holder raffles.</li>
            </ul>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Terrarium;
