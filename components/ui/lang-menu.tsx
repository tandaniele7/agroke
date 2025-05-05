"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import Flag from "react-world-flags";

export default function LanguageMenu({ language }: { language: "gb" | "ita" }) {
  return (
    <Menu as="div" className="relative ml-3 px-4">
      <MenuButton className="relative flex items-center h-10 w-10 rounded-full focus:outline-none">
        <Flag code={language} width={600} className="rounded-full"/>
      </MenuButton>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <MenuItem>
          <Link
            href="/"
            className="flex px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden hover:bg-black-500"
          >
            <Flag code="ita" className="h-6 w-6" />
            <p className="my-auto px-2">Italiano</p>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            href="/en"
            className="flex px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden hover:bg-black-500"
          >
            <Flag code="gb" className="h-6 w-6" />
            <p className="my-auto px-2">English</p>
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
