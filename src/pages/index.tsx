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
  useContractWrite,
  usePrepareContractWrite,
  // useWaitForTransaction,
} from "wagmi";
import { polygon } from "wagmi/chains";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { addresses } from "../utils/addresses";
import { abi } from "../utils/abi";
import { utils } from "ethers";
import logo from "../../public/logo.png";

const isPublic = false;

const Home: NextPage = () => {
  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const [qty, setQty] = useState(1);
  const [amt, setAmt] = useState(5.1);
  const [isAL, setIsAL] = useState(false);
  const [proof, setProof] = useState<string[] | null>(null);
  const [txError, setTxError] = useState("");

  useEffect(() => {
    if (qty > 10) {
      setQty(10);
    } else if (qty < 1) {
      setQty(1);
    } else {
      setAmt(qty * 5.1);
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
    address: "0x48d4CD62A44F7f72322dad056C4Cb357C7E8cA37",
    abi,
    functionName: isPublic ? "mint" : "allowlistMint",
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
        <div className="container mx-auto">
          <div className="flex w-full items-center justify-between">
            <Image
              src={logo}
              alt="Serpentines"
              className="max-w-[300px] pt-2"
            />
            <div className="flex w-1/2 content-center justify-end">
              <Link
                className="hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-pink-500 md:h-auto md:p-4"
                href="https://twitter.com/hostofspaces"
                target="_blank"
              >
                <svg
                  className="h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path d="M30.063 7.313c-.813 1.125-1.75 2.125-2.875 2.938v.75c0 1.563-.188 3.125-.688 4.625a15.088 15.088 0 0 1-2.063 4.438c-.875 1.438-2 2.688-3.25 3.813a15.015 15.015 0 0 1-4.625 2.563c-1.813.688-3.75 1-5.75 1-3.25 0-6.188-.875-8.875-2.625.438.063.875.125 1.375.125 2.688 0 5.063-.875 7.188-2.5-1.25 0-2.375-.375-3.375-1.125s-1.688-1.688-2.063-2.875c.438.063.813.125 1.125.125.5 0 1-.063 1.5-.25-1.313-.25-2.438-.938-3.313-1.938a5.673 5.673 0 0 1-1.313-3.688v-.063c.813.438 1.688.688 2.625.688a5.228 5.228 0 0 1-1.875-2c-.5-.875-.688-1.813-.688-2.75 0-1.063.25-2.063.75-2.938 1.438 1.75 3.188 3.188 5.25 4.25s4.313 1.688 6.688 1.813a5.579 5.579 0 0 1 1.5-5.438c1.125-1.125 2.5-1.688 4.125-1.688s3.063.625 4.188 1.813a11.48 11.48 0 0 0 3.688-1.375c-.438 1.375-1.313 2.438-2.563 3.188 1.125-.125 2.188-.438 3.313-.875z"></path>
                </svg>
              </Link>
              {chain?.name !== "Polygon" ? (
                <div className="mr-2">
                  <Web3NetworkSwitch />
                </div>
              ) : null}
              <Web3Button icon="show" label="Connect Wallet" balance="show" />
            </div>
          </div>
        </div>
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
              2K drop minting now at 5.1 MATIC for Season One HODLers 💎🙌
            </p>
            <p className="mb-8 text-center text-base leading-normal md:text-left">
              * Future drops subject to change. Full collection size 10K.
            </p>
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
                      Total Price: {amt.toFixed(1)} MATIC
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
                    href={`https://polygonscan.com/tx/${data?.hash as string}`}
                    target="_blank"
                  >
                    View transaction
                  </Link>
                </div>
              ) : null}
            </div>
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
        <div className="fade-in mx-auto pt-16 pb-6 text-center text-sm text-gray-300">
          <Link
            href="https://twitter.com/hostofspaces"
            target="_blank"
            className="text-2xl text-pink-500"
          >
            A 51 project.{" "}
          </Link>
          Art by{" "}
          <Link
            href="https://twitter.com/DEWMONE"
            target="_blank"
            className="text-pink-500"
          >
            @DewmOne
          </Link>
          . Code by{" "}
          <Link
            href="https://twitter.com/xCryptoBro"
            target="_blank"
            className="text-pink-500"
          >
            @xCryptoBro
          </Link>
          .{" "}
          <Link
            href="https://polygonscan.com/address/0x48d4cd62a44f7f72322dad056c4cb357c7e8ca37#code"
            target="_blank"
            className="underline"
          >
            Contract
          </Link>
          .{" "}
          <Link
            href="https://github.com/xcryptobro/serpentines"
            target="_blank"
            className="underline"
          >
            Website
          </Link>
          . Need to{" "}
          <Link href="/bridge" className="underline">
            bridge to Polygon
          </Link>
          ?
        </div>
      </main>
    </>
  );
};

export default Home;
