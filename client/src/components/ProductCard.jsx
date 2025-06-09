import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems,navigate } = useAppContext();

  return (
    product && (
      <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
                          scrollTo(0,0);
      }} className="border border-gray-300 rounded-md p-3 bg-white w-full max-w-xs mx-auto">
        {/* Product Image */}
        <div className="group cursor-pointer flex items-center justify-center">
          <img
            className="group-hover:scale-105 transition-transform w-24 h-24 object-contain md:w-36 md:h-36"
            src={product.image[0]}
            alt={product.name}
          />
        </div>

        {/* Product Details */}
        <div className="text-gray-600 text-sm mt-2">
          <p className="text-xs text-gray-400">{product.category}</p>
          <p className="text-gray-800 font-semibold text-base truncate">
            {product.name}
          </p>

          {/* Star Rating */}
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  className="w-3 md:w-4"
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                />
              ))}
            <p className="text-xs text-gray-400">(4)</p>
          </div>

          {/* Price + Cart Controls */}
          <div className="flex items-end justify-between mt-3">
            <p className="text-base md:text-lg font-medium text-primary">
              {currency}{product.offerPrice}{" "}
              <span className="text-gray-400 line-through text-xs">
                {product.price}
              </span>
            </p>

            {/* Cart Controls */}
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary"
            >
              {!cartItems[product._id] ? (
                <button
                  className="flex items-center gap-1 bg-primary/10 border border-primary/30 px-2 py-1 rounded text-sm"
                  onClick={() => addToCart(product._id)}
                >
                  <img
                    src={assets.cart_icon}
                    alt="cart_icon"
                    className="w-4 h-4"
                  />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-primary/20 px-2 py-1 rounded">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="px-2 text-sm"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-sm">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="px-2 text-sm"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
