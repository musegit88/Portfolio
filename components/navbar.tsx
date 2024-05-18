import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ThemeToggle } from "./theme-toggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href={"/"} className="flex items-center">
        <div className="bg-black border rounded-tl-md rounded-bl-md text-white p-2 font-semibold">
          M4
        </div>
        <div className="border rounded-tr-md rounded-br-md p-2  font-semibold shadow-md">
          Dev
        </div>
      </Link>
      <div className="flex items-center gap-4">
        <a href="https://github.com/musegit88" target="_blank">
          <FaGithub size={20} />
        </a>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
