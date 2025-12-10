import Link from "next/link";

export const Navigation = () => {
  return (
    <nav className="bg-gray-100 p-4 flex space-x-4">
      <Link href="/about" className="text-gray-800 hover:text-gray-600">
        About
      </Link>
    </nav>
  );
};