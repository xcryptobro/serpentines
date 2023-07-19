import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useNetwork } from "wagmi";

const Header = () => {
  const { chain } = useNetwork();
  return (
    <div className="container mx-auto columns-1 md:columns-2">
      <div className="text-center md:text-left">
        <Image
          src={logo}
          alt="Serpentines"
          className="mx-auto max-w-[300px] pt-2"
        />
        <div className="m-2 flex justify-between">
          <Link href="/" className="uppercase text-white">
            Mint
          </Link>
          <Link href="/terrarium" className="uppercase text-white">
            Terrarium
          </Link>
          <Link href="/bridge" className="uppercase text-white">
            Bridge
          </Link>
        </div>
      </div>

      <div className="text-right">
        <Link
          href="https://magiceden.io/collections/polygon/serpentines"
          target="_blank"
          className="hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-pink-500 md:h-auto md:p-4"
        >
          <Image
            src="/magiceden.png"
            width="24"
            height="24"
            alt="Visit us on Magic Eden"
          />
        </Link>
        <Link
          className="hover:text-underline inline-block h-10 transform p-2 text-center text-blue-300 no-underline duration-300 ease-in-out hover:scale-125 hover:text-pink-500 md:h-auto md:p-4"
          href="https://twitter.com/0xSerpentines"
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
  );
};

export default Header;
