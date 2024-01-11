export default function Page({ params }) {
  console.log(params);
  return <div>My Product Id: {params.id}</div>
}