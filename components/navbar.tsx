import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href={"/"}>
        <span className="bg-black text-white p-2 w-10 h-10 font-semibold">
          M4
        </span>
        <span className="bg-white ml-1">Dev</span>
      </Link>
      <a href="https://github.com/musegit88" target="_blank">
        <FaGithub size={20} />
      </a>
    </div>
  );
};

export default Navbar;
