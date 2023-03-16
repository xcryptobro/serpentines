import Link from "next/link";

const Footer = () => {
  return (
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
  );
};

export default Footer;
