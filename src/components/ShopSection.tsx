import React, { useEffect } from "react";
import { fetchProductsAsync } from "../features/Products";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import ShopProductCard from "./ShopProductCard";

const ShopSection = () => {
  const products = useAppSelector((state) => state.products.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsAsync());
  }, [dispatch]);

  return (
    <section className="shop__section">
      THE SHOP
      <div className="products__display">
        {products &&
          products.map((product) => {
            return <ShopProductCard product={product} />;
          })}
      </div>
    </section>
  );
};

export default ShopSection;
