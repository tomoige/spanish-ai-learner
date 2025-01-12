import React from "react";
import Link from "next/link";
import { IoChatboxOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";

interface NavbarItemType {
  link: string;
  icon: React.ReactElement;
  label: string;
}

function NavbarItem({ link, icon, label }: NavbarItemType) {
  return (
    <Link href={link} className="flex items-center p-4 hover:bg-white/5">
      <span className="text-2xl mr-2  ">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function Navbar() {
  return (
    <div className="flex flex-col justify-between p-6 h-screen bg-one text-white shrink-0">
      <div>
        <Link href="/">
          <h1 className="text-lg">Language Learning</h1>
        </Link>
        <div className="flex flex-col mt-4">
          <NavbarItem
            link={"/ai-chat"}
            icon={<IoChatboxOutline />}
            label="AI Chat"
          />
          <NavbarItem link={"/quiz"} icon={<FaQuestion />} label="Word Quiz" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <button className="w-24 bg-four hover:bg-four/80 px-4 py-2 rounded-md">
          Log In
        </button>
        <button className="w-24 bg-three hover:bg-three/80 px-4 py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Navbar;
