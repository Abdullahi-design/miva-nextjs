import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const Form = ({ type, product, setProduct, submitting, handleSubmit }) => {

  const [file, setFile] = useState(undefined)
  const [fileUrl, setFileUrl] = useState(undefined)

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    setFile(file)
  
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl)
    }

    if (file) {
      // Read the selected image file and convert it to a data URL
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setProduct({
      //     ...product,
      //     coverImage: reader.result, // Set the data URL, not the entire file object
      //     imagePreview: reader.result,
      //   });
      // };
      // reader.readAsDataURL(file);

      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setProduct({
        ...product,
        coverImage: url
      });
    } else {
      setFileUrl(undefined);
    }
  };  

  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} your Product</span>
      </h1>
      <p className='desc text-left max-w-md'>
        Buy and sell anything you want 
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Product Name{" "}
          </span>
          <input
            value={product.productName}
            onChange={(e) => setProduct({ ...product, productName: e.target.value })}
            type='text'
            placeholder='Product Name'
            required
            className='form_input'
          />
        </label>

        <label className="flex flex-col w-full items-center justify-center mx-auto border-2 border-gray-600 p-4">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Cover Image {" "}
          </span>
          {
            fileUrl ? 
            (
              null
            ):(
              <span className="text-center py-2 text-sm text-gray-500">Images should be horizontal, at least 1280x720px, and 72 DPI (dots per inch).</span>
            )
          }
          <input
            onChange={(e) => handleImageChange(e)}
            type='file'
            accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm"
            required
            className='hidden'
            id='coverImageInput'
          />
          <label
            htmlFor='coverImageInput'
            className='flex w-fit cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
          >
            <span className="">
              <MdOutlineFileUpload className="w-6 h-6"/>
            </span>
            Upload Image
          </label>
          {fileUrl && file && (
            <div className="flex gap-4 items-center">
              {file.type.startsWith("image/") ? (
                <div className="rounded-lg overflow-hidden w-32 h-32 relative">
                  <Image
                    src={fileUrl}
                    width={300}
                    height={300}
                    alt='Cover Image Preview'
                    className='mt-2 max-w-full h-auto rounded-md'
                  />
                </div>
              ):(
                <div className="rounded-lg overflow-hidden w-32 h-32 relative">
                  <video width={300} height={300} src={fileUrl} className="object-cover" autoPlay loop muted />
                </div>
              )}

              <button
                type="button"
                className="border rounded-xl px-4 py-2"
                onClick={() => {
                  setFile(undefined)
                  setFileUrl(undefined)
                }}
              >
                remove
              </button>
            </div>
          )}
        </label>

        <label className='flex flex-col items-start mt-4'>
          <span className='font-satoshi font-semibold text-base text-gray-700 mb-2'>
            Product Category
          </span>

          <select
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            required
            className='form_select appearance-none w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
          >
            <option value="" disabled>Select product category</option>
            <option value="physical product">Physical Product</option>
            <option value="news letter">News Letter</option>
            <option value="digital products">Digital Products</option>
            <option value="membership">Membership</option>
          </select>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Prodcut description
          </span>

          <textarea
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            placeholder='Write your description here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Price {" "}
            <span className='font-normal'>(₦)</span>
          </span>
          <input
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            type='number'
            placeholder='₦100'
            required
            className='form_input'
          />
        </label>

        <label className='flex flex-col items-start mt-4'>
          <span className='font-satoshi font-semibold text-base text-gray-700 mb-2'>
            Call to action
          </span>

          <select
            value={product.cta}
            onChange={(e) => setProduct({ ...product, cta: e.target.value })}
            required
            className='form_select appearance-none w-full py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500'
          >
            <option value="" disabled>Select CTA</option>
            <option value="i want this!">I want this!</option>
            <option value="buy this!">Buy this!</option>
            <option value="pay">pay</option>
          </select>
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Enter some SEO keywords here{" "}
            <span className='font-normal'>
              (#Educational, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={product.metaData}
            onChange={(e) => setProduct({ ...product, metaData: e.target.value })}
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm px-5 py-1 rounded-full hover:border-2 hover:border-primary-orange'>
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;