import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useDispatch } from "react-redux";
import {
  productSelector,
  getInitialStateAsync,
} from "../../redux/reducers/productReducer";
import { useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const products = useSelector(productSelector);

  // show all the product items inside products array initially by
  // calling dispatch(getInitialStateAsync()) on loading of page
  useEffect(() => {
    dispatch(getInitialStateAsync());
  }, []);

  // filter the products based on
  // searching an item inside input field, price range of product and category of product
  useEffect(() => {
    const updatedProducts = products?.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      return matchesSearch && matchesPriceRange && matchesCategory && product;
    });

    setFilteredProducts(updatedProducts);
  }, [products, searchQuery, priceRange, selectedCategories]);

  // calling handlehandleCategoryChange func and passing category inside it
  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((categoryItem) => categoryItem !== category) // Remove category if already selected
      : [...selectedCategories, category]; // Add category if not selected
    setSelectedCategories(updatedCategories);
  };

  return (
    <>
      <div className={styles.inputContainer}>
        <input
          placeholder="Search By Name"
          onChange={(e) => setSearchQuery(e.target.value)} // searching a product item using onChange method
        />
      </div>
      <div className={styles.outerContainer}>
        <div className={styles.filterComponent}>
          <div className={styles.filterContainer}>
            <h1 className={styles.filter}>Filter</h1>
          </div>
          <div className={styles.priceContainer}>
            <h4 className={styles.price}>Price: {priceRange[1]} </h4>
          </div>
          <div className={styles.input}>
            <input
              type="range"
              onChange={
                (e) =>
                  setPriceRange((prev) => (prev = [0, Number(e.target.value)])) // setting the price range of the product
              }
              min={1}
              max={1000}
              step={1}
              className={styles.rangeInput}
            ></input>
          </div>
          <div className={styles.categoryContainer}>
            <h1 className={styles.category}> Category</h1>
          </div>
          <div className={styles.checkboxContainer}>
            <div className={styles.menClothing}>
              <input
                type="checkbox"
                id="menClothing"
                name="menClothing"
                value="men's clothing"
                onChange={(e) => handleCategoryChange(e.target.value)} // calling
                // handlehandleCategoryChange func and passing category inside it for Men's Clothing
              />
              <label htmlFor="menClothing"> Men's Clothing</label>
            </div>
            <div className={styles.womanClothing}>
              <input
                type="checkbox"
                id="womenClothing"
                name="womenClothing"
                value="women's clothing"
                onChange={(e) => handleCategoryChange(e.target.value)}
                // calling
                // handlehandleCategoryChange func and passing category inside it for Women's Clothing
              />

              <label htmlFor="womenClothing"> Women's Clothing</label>
            </div>
            <div className={styles.jewelery}>
              <input
                type="checkbox"
                id="jewelery"
                name="jewelery"
                value="jewelery"
                onChange={(e) => handleCategoryChange(e.target.value)}
                // calling
                // handlehandleCategoryChange func and passing category inside it for Jewelery
              />
              <label htmlFor="jewelery"> Jewelery</label>
            </div>
            <div className={styles.electronics}>
              <input
                type="checkbox"
                id="electronics"
                name="electronics"
                value="electronics"
                onChange={(e) => handleCategoryChange(e.target.value)}
                // calling
                // handlehandleCategoryChange func and passing category inside it for Electronics
              />
              <label htmlFor="electronics"> Electronics</label>
            </div>
          </div>
        </div>
        {/* if searchQuery ||
        priceRange[0] !== 1 ||
        priceRange[1] !== 1 ||
        selectedCategories.length !== 0 then map over filteredProducts array 
        and pass values to Product Card Component else if conditions are not true 
        then map over products array 
        and pass values to Product Card Component */}
        {searchQuery ||
        priceRange[0] !== 1 ||
        priceRange[1] !== 1 ||
        selectedCategories.length !== 0
          ? filteredProducts?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              );
            })
          : products?.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                />
              );
            })}
      </div>
    </>
  );
};

export default Home;
