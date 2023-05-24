import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import {
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  ProductInCart,
  Cart,
  addCartToDJAsync,
} from "../features/Cart";

const CartSection: React.FC = () => {
  const cart = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.products.value);
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = (productId: number) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: number) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleRemoveProduct = (productId: number) => {
    dispatch(removeProduct(productId));
  };

  const handlePlaceOrder = (cart: Cart) => {
    dispatch(addCartToDJAsync(cart));
  };

  const groupProductsByBrand = () => {
    const groupedProducts: Record<
      string,
      { products: ProductInCart[]; totalGroupPrice: number }
    > = {};
    cart.products.forEach((product) => {
      const productData = products.find((p) => p.id === product.id);
      if (productData) {
        const brand = productData.brand;
        if (!groupedProducts[brand]) {
          groupedProducts[brand] = {
            products: [],
            totalGroupPrice: 0,
          };
        }
        groupedProducts[brand].products.push(product);
        groupedProducts[brand].totalGroupPrice += product.total;
      }
    });

    return groupedProducts;
  };

  const groupedProducts = groupProductsByBrand();
  return (
    <section className="cart__section">
      THE CART
      {Object.entries(groupedProducts).map(([brand, group]) => (
        <div key={brand}>
          <h2>{brand}</h2>
          <ul>
            {group.products.map((product) => (
              <li key={product.id}>
                {product.title} - {product.quantity}
                <div className="actions">
                  <button onClick={() => handleIncreaseQuantity(product.id)}>
                    +
                  </button>
                  <button onClick={() => handleDecreaseQuantity(product.id)}>
                    -
                  </button>
                  <button onClick={() => handleRemoveProduct(product.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <p>Total: {group.totalGroupPrice}</p>
        </div>
      ))}
      <p>Grand Tota: {cart.total}</p>
      <button onClick={() => handlePlaceOrder(cart)}>Place Order</button>
    </section>
  );
};

export default CartSection;
