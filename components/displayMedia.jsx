import Image from "next/image";

export const displayMedia = (product) => {
    if (product.coverImage.startsWith("data:image")) {
      return (
        <div className="rounded-lg overflow-hidden w-[20rem] h-[20rem] relative">
          <Image
            src={product.coverImage}
            alt={product.productName}
            fill
          />
        </div>
      );
    } else if (product.coverImage.startsWith("data:video")) {
      return (
        <div className="rounded-lg overflow-hidden w-[20rem] h-[20rem] relative">
          <video controls className="object-cover" autoPlay loop muted>
            <source src={product.coverImage} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (product.coverImage.startsWith("data:application/pdf")) {
      return (
        <object
          data={product.coverImage}
          type='application/pdf'
          width='100%'
          height='400px'
        >
          <p>PDF cannot be displayed</p>
        </object>
      );
    } else {
      return <p>Unsupported media type</p>;
    }
};