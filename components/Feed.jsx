"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const ProductCardList = ({ data, handleMetaDataClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          handleMetaDataClick={handleMetaDataClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allProducts, setAllProducts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch("/api/product");
    const data = await response.json();

    setAllProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filterProducts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allProducts.filter(
      (item) =>
      regex.test(item.creator.username) ||
      regex.test(item.productName) ||
      regex.test(item.metaData) ||
      regex.test(item.description) 
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterProducts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleMetaDataClick = (metaData) => {
    setSearchText(metaData);

    const searchResult = filterProducts(metaData);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a product or userName or SEO ketwords'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Products */}
      {searchText ? (
        searchedResults.length > 0 ? (
          <ProductCardList
            data={searchedResults}
            handleMetaDataClick={handleMetaDataClick}
          />
        ) : (
          <div className="mt-10 text-gray-600 text-center mx-auto">
            <p>"{searchText}" Not found</p>
            <span className="text-green-700">Try restructuring the words</span>
          </div>
        )
      ) : (
        <ProductCardList data={allProducts} handleMetaDataClick={handleMetaDataClick} />
      )}
    </section>
  );
};

export default Feed;