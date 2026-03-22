import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQty, selectCartItems } from "../store/slices/cartSlice";

function Card({ id, image, title, price, rating, category }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((i) => i.id === id);
  const qty = cartItem?.qty ?? 0;

  const handleDecrement = () => {
    if (qty === 1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQty({ id, qty: qty - 1 }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
        <img src={image} alt={title} loading="lazy" className="max-h-full max-w-full object-contain" />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#e94560]">
          {category}
        </span>
        <h3 className="text-sm font-semibold text-[#1a1a2e] leading-snug line-clamp-2 m-0">
          {title}
        </h3>
        <div className="flex justify-between items-center mt-auto pt-2">
          <span className="text-lg font-bold text-[#1a1a2e]">${price}</span>
          <span className="text-xs text-gray-500">⭐ {rating}</span>
        </div>

        {qty === 0 ? (
          <button
            onClick={() => dispatch(addToCart({ id, image, title, price }))}
            className="mt-2 w-full py-2 bg-[#e94560] hover:bg-[#c73652] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-2 flex items-center justify-between bg-gray-50 rounded-lg px-2 py-1">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 rounded-lg bg-[#e94560] hover:bg-[#c73652] text-white font-bold text-lg flex items-center justify-center cursor-pointer transition-colors"
            >
              −
            </button>
            <span className="text-sm font-semibold text-[#1a1a2e]">{qty}</span>
            <button
              onClick={() => dispatch(updateQty({ id, qty: qty + 1 }))}
              className="w-8 h-8 rounded-lg bg-[#e94560] hover:bg-[#c73652] text-white font-bold text-lg flex items-center justify-center cursor-pointer transition-colors"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
