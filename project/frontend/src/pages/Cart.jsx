import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal, removeFromCart, updateQty, clearCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-500">Your cart is empty</p>
        <Link to="/" className="text-[#e94560] hover:underline font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold text-[#1a1a2e] mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1a1a2e] line-clamp-1">{item.title}</p>
              <p className="text-sm text-gray-500">${item.price}</p>
            </div>
            <input
              type="number"
              min={1}
              value={item.qty}
              onChange={(e) => dispatch(updateQty({ id: item.id, qty: Number(e.target.value) }))}
              className="w-16 border rounded-lg px-2 py-1 text-sm text-center"
            />
            <p className="w-20 text-right font-semibold text-[#1a1a2e]">
              ${(item.price * item.qty).toFixed(2)}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-400 hover:text-red-600 text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-6">
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm text-gray-400 hover:text-red-500 cursor-pointer"
        >
          Clear Cart
        </button>
        <div className="flex items-center gap-6">
          <p className="text-lg font-bold text-[#1a1a2e]">Total: ${total}</p>
          <Link
            to="/checkout"
            className="bg-[#e94560] hover:bg-[#c73652] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cart;
