import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 w-full text-lg sm:w-auto sm:text-xl">
      <ul className="flex justify-center gap-6 items-start sm:flex-row sm:gap-16 sm:items-center sm:justify-end">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
