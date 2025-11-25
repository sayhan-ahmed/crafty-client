import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-center">
      <Link href="/" className="p-5">
        Home
      </Link>
      <Link href="/products" className="p-5">
        Products
      </Link>
      <Link href="/about" className="p-5">
        About
      </Link>
      <Link href="/contact" className="p-5">
        Contact
      </Link>
      <Link href="/login" className="p-5">
        Login
      </Link>
      <Link
        href="/register"
        className="p-5 bg-amber-700 text-white rounded-4xl"
      >
        Register
      </Link>
    </div>
  );
}
