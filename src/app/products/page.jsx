import Link from "next/link";

export default async function ProductsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return (
    <div className="flex flex-col">
      <h1>This is Product page</h1>
      {data.map((user) => (
        <Link key={user.id} href={`/products/${user.id}`}>
          {user.name}
        </Link>
      ))}
    </div>
  );
}
