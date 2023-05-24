import React, { useState } from "react";
import { useAppDispatch } from "../hooks/storeHooks";
import { ProductProps } from "../features/Products";
import { addToCart, ProductInCart } from "../features/Cart";

const ShopProductCard: React.FC<ProductProps> = ({ product }) => {
  const changeValue: number = 1;
  const defaultQunatity: number = 1;

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<number>(defaultQunatity);

  const handleIncrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuantity(quantity + changeValue);
  };
  const handleDecrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQuantity(quantity - changeValue);
  };

  const handleAddingToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    const productToAdd: ProductInCart = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      total: product.price * quantity,
      discountPercentage: 0,
      discountedPrice: product.price * quantity,
    };
    dispatch(addToCart(productToAdd));
    setQuantity(defaultQunatity);
  };

  return (
    <article>
      <div className="thumbnail">
        <img src={product.thumbnail} alt={`${product.title} thumbnail`} />
      </div>
      <div className="content">
        <div className="content__top">
          <title>{product.title}</title>
          <span>{product.brand}</span>
        </div>
        <p>{product.description}</p>
        <div className="content__bottom">
          <span>{product.price * quantity}$</span>
          <div className="actions">
            <span>{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock ? true : false}
            >
              +
            </button>
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1 ? true : false}
            >
              -
            </button>
            <button onClick={handleAddingToCart}>
              <svg
                height="20"
                viewBox="0 0 48 48"
                width="48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h48v48h-48zm36.62 12l-5.52 10z" fill="none" />
                <path d="M22 18h4v-6h6v-4h-6v-6h-4v6h-6v4h6v6zm-8 18c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm20 0c-2.21 0-3.98 1.79-3.98 4s1.77 4 3.98 4 4-1.79 4-4-1.79-4-4-4zm-19.65-6.5c0-.09.02-.17.06-.24l1.8-3.26h14.9c1.5 0 2.81-.83 3.5-2.06l7.72-14.02-3.5-1.92h-.01l-2.21 4-5.51 10h-14.03l-.26-.54-4.49-9.46-1.9-4-1.89-4h-6.53v4h4l7.2 15.17-2.71 4.9c-.31.58-.49 1.23-.49 1.93 0 2.21 1.79 4 4 4h24v-4h-23.15c-.28 0-.5-.22-.5-.5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ShopProductCard;
