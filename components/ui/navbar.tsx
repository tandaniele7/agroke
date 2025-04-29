"use client";

import { signOutAction } from "@/app/actions";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Home, Map, Notebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { icon: Home, name: "Home", href: "/protected", current: false },
  {
    icon: Map,
    name: "I Miei Campi",
    href: "/protected/fields",
    current: false,
  },
  {
    icon: Notebook,
    name: "Quaderno di Campagna",
    href: "/protected/field-diary",
    current: false,
  },
];

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  for (const item of navigation) {
    item.current = pathname === item.href;
  }

  return (
    <Disclosure
      as="nav"
      className="bg-white/20 backdrop-blur-md shadow-sm border-b-2 border-agroke-green/60"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button*/}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-lg p-2 text-agroke-black-light hover:bg-agroke-green/10 transition-all duration-200">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>

              {/* Logo and Navigation */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/">
                    <Image
                      src="/agroke_logo_with_text.png"
                      alt="AgroKe"
                      width={120}
                      height={40}
                      className="h-8 w-auto"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-8 sm:flex sm:space-x-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-agroke-green/65 text-agroke-black-light"
                            : "text-gray-700 hover:bg-agroke-green/10",
                          "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                        )}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* User Menu */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <MenuButton className="relative flex rounded-full items-center text-sm focus:outline-none">
                    <UserCircleIcon className="h-8 w-8 text-agroke-black-light hover:text-agroke-green transition-colors duration-200" />
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <form action={signOutAction}>
                        <button
                          type="submit"
                          className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                        >
                          Sign out
                        </button>
                      </form>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <DisclosureButton
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-agroke-green/65 text-agroke-black-light"
                        : "text-gray-700 hover:bg-agroke-green/10",
                      "flex items-center px-3 py-2 rounded-lg text-base font-medium transition-all duration-200"
                    )}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </DisclosureButton>
                );
              })}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
