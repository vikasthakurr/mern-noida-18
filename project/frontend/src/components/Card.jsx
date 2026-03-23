import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQty, selectCartItems } from "../store/slices/cartSlice";

function Card({ id, image, title, price, rating, category }) {
  const dispatch  = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem  = cartItems.find((i) => i.id === id);
  const qty       = cartItem?.qty ?? 0;

  const handleDecrement = () =>
    qty === 1 ? dispatch(removeFromCart(id)) : dispatch(updateQty({ id, qty: qty - 1 }));

  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden flex flex-col group transition-all duration-200 hover:shadow-lg hover:border-gray-300">

      {/* image */}
      <div className="relative h-44 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
        <img src={image} alt={title} loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
        <button className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors cursor-pointer text-sm border border-gray-100">
          ♡
        </button>
      </div>

      {/* body */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#2874f0]">
          {category}
        </span>
        <h3 className="text-xs font-medium text-gray-800 leading-snug line-clamp-2">
          {title}
        </h3>

        {/* rating */}
        <div className="flex items-center gap-1">
          <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            {rating} ★
          </span>
          <span className="text-[10px] text-gray-400">(reviews)</span>
        </div>

        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-sm font-bold text-gray-900">${price}</span>
          <span className="text-[10px] text-green-600 font-medium">Free delivery</span>
        </div>

        {qty === 0 ? (
          <button
            onClick={() => dispatch(addToCart({ id, image, title, price }))}
            className="mt-1 w-full py-1.5 bg-[#ff9f00] hover:bg-yellow-500 text-white text-xs font-bold rounded transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-1 flex items-center justify-between bg-[#ff9f00] rounded px-1 py-0.5">
            <button onClick={handleDecrement}
              className="w-7 h-7 rounded text-white font-bold flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-colors text-base">
              −
            </button>
            <span className="text-xs font-bold text-white">{qty}</span>
            <button onClick={() => dispatch(updateQty({ id, qty: qty + 1 }))}
              className="w-7 h-7 rounded text-white font-bold flex items-center justify-center cursor-pointer hover:bg-yellow-600 transition-colors text-base">
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
