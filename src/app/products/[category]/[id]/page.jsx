export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  return <div>This is product details : {id}</div>;
}
