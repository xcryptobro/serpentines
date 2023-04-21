import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { polygon } from "wagmi/chains";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { addresses } from "../utils/addresses";
import { abi } from "../utils/abi";
import { utils } from "ethers";
import Footer from "../components/Footer";
import Header from "../components/Header";

const contractAddress = "0x48d4CD62A44F7f72322dad056C4Cb357C7E8cA37";
const isPublic = false;

const Home: NextPage = () => {
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const [qty, setQty] = useState(1);
  const [amt, setAmt] = useState(20);
  const [isAL, setIsAL] = useState(false);
  const [proof, setProof] = useState<string[] | null>(null);
  const [txError, setTxError] = useState("");

  const { data: isPaused } = useContractRead({
    address: contractAddress,
    abi,
    functionName: "paused",
  });
  const { data: isAllowlistPaused } = useContractRead({
    address: contractAddress,
    abi,
    functionName: "allowlistPaused",
  });

  useEffect(() => {
    if (qty > 10) {
      setQty(10);
    } else if (qty < 1) {
      setQty(1);
    } else {
      setAmt(qty * 20);
    }
  }, [qty]);

  useEffect(() => {
    if (address) {
      const leaves = addresses.map((addr) => keccak256(addr));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const root = tree.getRoot().toString("hex");
      const hashedAddress = keccak256(address);
      const proof = tree.getHexProof(hashedAddress);
      const v = tree.verify(proof, hashedAddress, root);
      setIsAL(v);
      setProof(proof);
    }
  }, [address]);

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi,
    functionName: !isPaused
      ? "mint"
      : !isAllowlistPaused
      ? "allowlistMint"
      : "",
    args: isPublic ? [address, qty] : [address, qty, proof],
    chainId: polygon.id,
    overrides: {
      from: address,
      value: utils.parseEther(`${amt}`),
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite({
    ...config,
    onError(error) {
      setTxError(error.toString());
    },
  });

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
        <div className="container mx-auto flex flex-col flex-wrap items-center pt-12 md:flex-row">
          <div className="flex w-full flex-col justify-center overflow-y-hidden xl:w-2/5">
            <p className="flex items-center text-3xl font-bold text-indigo-400 no-underline hover:no-underline">
              <span className="bg-gradient-to-r from-pink-500  to-white bg-clip-text text-transparent">
                Serpentines Season Two
              </span>
            </p>
            <p className="mb-8 text-center text-base leading-normal md:text-left md:text-2xl">
              ✅ Season One Sold Out
            </p>
            <p className="mb-8 text-center text-base leading-normal md:text-left md:text-2xl">
              {!isPaused
                ? "2K drop minting now at 20 MATIC"
                : !isAllowlistPaused
                ? "2K drop minting now at 20 MATIC for allowlist members"
                : "2K drop minting paused..."}
            </p>
            <p className="mb-8 text-center text-base leading-normal md:text-left md:text-sm">
              *pricing subject to change. Full collection size is 10K.
            </p>
            {!isPaused || !isAllowlistPaused ? (
              <div className="mb-4 w-full rounded-lg bg-gray-900 px-8 pt-6 pb-8 opacity-75 shadow-lg">
                {isConnected && chain?.name === "Polygon" ? (
                  <>
                    <div className="p-2">
                      <label
                        className="mb-2 block py-2 font-bold text-blue-300"
                        htmlFor="qty"
                      >
                        Quantity (Max 10)
                      </label>
                      <input
                        className="w-sm transform appearance-none rounded border p-3 leading-tight text-gray-700 shadow transition duration-300 ease-in-out hover:scale-105 focus:ring"
                        id="qty"
                        type="number"
                        min={1}
                        max={10}
                        value={qty}
                        onChange={(e) => {
                          setQty(parseInt(e.target.value) || 1);
                        }}
                      />
                    </div>
                    <div>
                      <p className="mb-2 block py-2 font-bold text-blue-300">
                        Total Price: {amt.toFixed(0)} MATIC
                      </p>
                    </div>
                    {isPublic || isAL ? (
                      <button
                        disabled={!write || !address || isLoading}
                        onClick={() => write?.()}
                        className="transform rounded bg-gradient-to-r from-purple-800 to-green-500 py-2 px-4 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:from-pink-500 hover:to-green-500 focus:ring"
                      >
                        {isLoading ? "Minting..." : "Mint"}
                      </button>
                    ) : (
                      <p>Not on allowlist {address}</p>
                    )}
                    {txError ? <p>{txError}</p> : null}
                    <div className="mt-6 text-right">
                      <a
                        href="#"
                        onClick={() => disconnect()}
                        className="transform rounded py-1 px-2 font-thin text-gray-300"
                      >
                        Disconnect
                      </a>
                    </div>
                  </>
                ) : !isConnected ? (
                  <div className="flex flex-col">
                    <Web3Button
                      icon="show"
                      label="Connect Wallet"
                      balance="show"
                    />
                  </div>
                ) : chain?.name !== "Polygon" ? (
                  <Web3NetworkSwitch />
                ) : null}
                {isSuccess ? (
                  <div className="p-4">
                    <Link
                      href={`https://polygonscan.com/tx/${
                        data?.hash as string
                      }`}
                      target="_blank"
                    >
                      View transaction
                    </Link>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="w-full overflow-hidden p-12 xl:w-3/5">
            <div className="fade-in flex w-full justify-center pb-24 md:justify-start lg:pb-0">
              <Image
                src="/whitedavinci.png"
                alt="Serpentines Outline"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default Home;
