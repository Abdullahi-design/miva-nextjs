import Link from "next/link";
import ProductCard from "./ProductCard";

const Profile = ({ name, desc, data, handleAffiliateClick, handleEdit, handleDelete }) => {

  return (
    <section className='w-full'>
      <div className="flex justify-between w-full">
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Profile</span>
        </h1>
      </div>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleAffiliateClick={() => handleAffiliateClick && handleAffiliateClick(product)}
            handleEdit={() => handleEdit && handleEdit(product)}
            handleDelete={() => handleDelete && handleDelete(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;