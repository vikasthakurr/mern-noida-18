import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotal, removeFromCart, updateQty, clearCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-gray-50">
        <div className="bg-white rounded shadow-sm p-12 flex flex-col items-center gap-4">
          <span className="text-6xl">🛒</span>
          <p className="text-lg font-semibold text-gray-700">Your cart is empty!</p>
          <p className="text-sm text-gray-400">Add items to it now.</p>
          <Link to="/"
            className="mt-2 bg-[#2874f0] hover:bg-blue-700 text-white px-10 py-2.5 rounded font-bold text-sm transition-colors">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* items list */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="bg-white rounded shadow-sm p-4">
            <h1 className="text-lg font-bold text-gray-800 mb-1">My Cart ({items.length})</h1>
          </div>

          {items.map((item) => (
            <div key={item.id} className="bg-white rounded shadow-sm p-4 flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain bg-gray-50 rounded p-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.title}</p>
                <p className="text-xs text-green-600 mt-1">In Stock</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      onClick={() => dispatch(updateQty({ id: item.id, qty: Math.max(1, item.qty - 1) }))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer font-bold text-base transition-colors">
                      −
                    </button>
                    <span className="px-4 py-1 text-sm font-semibold border-x border-gray-300">{item.qty}</span>
                    <button
                      onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 cursor-pointer font-bold text-base transition-colors">
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-sm text-gray-500 hover:text-red-500 cursor-pointer transition-colors">
                    Remove
                  </button>
                </div>
              </div>
              <p className="text-base font-bold text-gray-900 shrink-0">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="bg-white rounded shadow-sm p-4 flex justify-between items-center">
            <button onClick={() => dispatch(clearCart())}
              className="text-sm text-gray-400 hover:text-red-500 cursor-pointer transition-colors">
              Clear Cart
            </button>
            <Link to="/checkout"
              className="bg-[#fb641b] hover:bg-orange-600 text-white px-10 py-3 rounded font-bold text-sm transition-colors">
              Place Order
            </Link>
          </div>
        </div>

        {/* price summary */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded shadow-sm p-5">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4 border-b pb-2">
              Price Details
            </h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Price ({items.length} items)</span>
                <span>${total}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>− $0.00</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t pt-3 text-base">
                <span>Total Amount</span>
                <span>${total}</span>
              </div>
              <p className="text-green-600 text-xs font-medium">
                You will save $0 on this order
              </p>
            </div>
          </div>

          <div className="bg-white rounded shadow-sm p-4 flex items-center gap-3">
            <span className="text-xl">🔒</span>
            <p className="text-xs text-gray-500">Safe and Secure Payments. Easy returns. 100% Authentic products.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
