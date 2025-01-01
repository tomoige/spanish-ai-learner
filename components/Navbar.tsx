import React from "react";
import Link from "next/link";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

interface NavbarItemType {
  link: string;
  icon: React.ReactElement;
  label: string;
}

function NavbarItem({ link, icon, label }: NavbarItemType) {
  return (
    <Link href={link} className="flex items-center p-2">
      <span className="text-2xl mr-2">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function Navbar() {
  return (
    <div className="p-4 h-screen bg-one text-white shrink-0">
      <Link href="/">
        <h1 className="text-lg">Language Learning</h1>
      </Link>
      <div className="flex flex-col">
        <NavbarItem
          link={"/ai-chat"}
          icon={<IoChatbubbleEllipsesOutline />}
          label="AI Chat"
        />
      </div>
    </div>
  );
}

export default Navbar;
