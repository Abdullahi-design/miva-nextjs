import Link from "next/link";
import ProductCard from "./ProductCard";

const Profile = ({ name, desc, data, handleAffiliate, handleEdit, handleDelete }) => {

  const items = [
    { name: 'Affiliate', href: '/affiliate'},
    { name: 'Sales', href: '/sales'},
    { name: 'Analytics', href: '/analytics'},
  ]
  return (
    <section className='w-full'>
      <div className="flex justify-between w-full">
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name} Profile</span>
        </h1>
        <div className="mt-8 mx-auto flex justify-evenly gap-4">
          {items.map((item, index) => (
            <Link href={item.href} key={index}>
              <button 
              className={`w-fit px-4 py-2 text-lg border border-primary-orange rounded-md font-satoshi ${item.name == 'Sales' ? 'hover:bg-primary-orange bg-white hover:text-white text-gray-700' : 'bg-primary-orange hover:bg-white text-white hover:text-gray-700'}`}
              >
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            handleAffiliate={() => handleAffiliate && handleAffiliate(product)}
            handleEdit={() => handleEdit && handleEdit(product)}
            handleDelete={() => handleDelete && handleDelete(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;