import Image from "next/image";

export const displayMedia = (formData) => {
    if (formData.videos.startsWith("data:image")) {
      return (
        <div className="rounded-lg overflow-hidden md:w-[20rem] w-[18rem] md:h-[20rem] h-[18rem] relative">
          <Image
            src={formData.videos}
            alt={formData.name}
            fill
          />
        </div>
      );
    } else if (formData.videos.startsWith("data:video")) {
      return (
        <div className="rounded-lg overflow-hidden w-[20rem] h-[20rem] relative">
          <video  
          className="object-cover" 
          autoPlay loop muted controls
        >
            <source src={formData.videos} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (formData.videos.startsWith("data:application/pdf")) {
      return (
        <object
          data={formData.videos}
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