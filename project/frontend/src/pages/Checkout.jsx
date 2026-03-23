import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal, clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const STEPS = { IDLE: "idle", PROCESSING: "processing", SUCCESS: "success" };

const EMPTY_ADDRESS = { firstName: "", lastName: "", address: "", city: "", pin: "", phone: "" };

const REQUIRED = {
  firstName: "First name is required",
  lastName:  "Last name is required",
  address:   "Address is required",
  city:      "City is required",
  pin:       "PIN code is required",
  phone:     "Phone number is required",
};

// defined outside Checkout so React never remounts it on re-render
function Field({ name, placeholder, type = "text", value, touched, error, onChange, onBlur }) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type} name={name} placeholder={placeholder}
        value={value}
        onChange={onChange} onBlur={onBlur}
        className={`border rounded px-3 py-2 text-sm focus:outline-none transition-colors ${
          touched && error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-[#2874f0]"
        }`}
      />
      {touched && error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items    = useSelector(selectCartItems);
  const total    = useSelector(selectCartTotal);

  const [step, setStep]         = useState(STEPS.IDLE);
  const [countdown, setCountdown] = useState(5);
  const [addr, setAddr]         = useState(EMPTY_ADDRESS);
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});

  const validate = (values) => {
    const errs = {};
    Object.keys(REQUIRED).forEach((key) => {
      if (!values[key].trim()) errs[key] = REQUIRED[key];
    });
    if (values.phone && !/^\d{7,15}$/.test(values.phone.trim()))
      errs.phone = "Enter a valid phone number";
    if (values.pin && !/^\d{4,10}$/.test(values.pin.trim()))
      errs.pin = "Enter a valid PIN code";
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...addr, [name]: value };
    setAddr(updated);
    if (touched[name]) {
      const errs = validate(updated);
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(addr);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handlePlaceOrder = () => {
    const allTouched = Object.keys(REQUIRED).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(addr);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStep(STEPS.PROCESSING);
    let secs = 5;
    const timer = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs <= 0) {
        clearInterval(timer);
        // save order to MongoDB
        const orderItems = items.map((item) => ({
          name:      item.title,
          qty:       item.qty,
          price:     item.price,
          image:     item.image,
          productId: String(item.id),
        }));
        axiosInstance
          .post("/orders", { orderItems, totalPrice: parseFloat(total) })
          .catch((err) => console.error("Order save failed:", err.response?.data || err.message));
        dispatch(clearCart());
        setStep(STEPS.SUCCESS);
        setTimeout(() => navigate("/orders"), 2000);
      }
    }, 1000);
  };

  // --- processing screen ---
  if (step === STEPS.PROCESSING) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded shadow-sm p-12 flex flex-col items-center gap-6 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full border-4 border-[#2874f0] border-t-transparent animate-spin" />
          <div>
            <h2 className="text-lg font-bold text-gray-800">Processing Payment</h2>
            <p className="text-sm text-gray-500 mt-1">Please do not close this window...</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-[#2874f0] h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((5 - countdown) / 5) * 100}%` }} />
          </div>
          <p className="text-3xl font-bold text-[#2874f0]">{countdown}s</p>
          <p className="text-xs text-gray-400">Verifying your payment details</p>
        </div>
      </div>
    );
  }

  // --- success screen ---
  if (step === STEPS.SUCCESS) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded shadow-sm p-12 flex flex-col items-center gap-4 max-w-sm w-full text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-4xl">✅</div>
          <h2 className="text-xl font-bold text-gray-800">Payment Successful!</h2>
          <p className="text-sm text-gray-500">Your order has been placed. Redirecting you to home...</p>
          <div className="w-8 h-1 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  // helper: renders an input with error — defined outside component to avoid remount
  const hasErrors = Object.keys(validate(addr)).length > 0;

  // --- main checkout screen ---
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* left col */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* order summary */}
          <div className="bg-white rounded shadow-sm p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h2>
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                <img src={item.image} alt={item.title} className="w-14 h-14 object-contain bg-gray-50 rounded p-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
                </div>
                <p className="text-sm font-bold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>

          {/* delivery address */}
          <div className="bg-white rounded shadow-sm p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Delivery Address</h2>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Field name="firstName" placeholder="First Name"  value={addr.firstName} touched={touched.firstName} error={errors.firstName} onChange={handleChange} onBlur={handleBlur} />
                <Field name="lastName"  placeholder="Last Name"   value={addr.lastName}  touched={touched.lastName}  error={errors.lastName}  onChange={handleChange} onBlur={handleBlur} />
              </div>
              <Field name="address" placeholder="Address" value={addr.address} touched={touched.address} error={errors.address} onChange={handleChange} onBlur={handleBlur} />
              <div className="grid grid-cols-2 gap-3">
                <Field name="city" placeholder="City"     value={addr.city} touched={touched.city} error={errors.city} onChange={handleChange} onBlur={handleBlur} />
                <Field name="pin"  placeholder="PIN Code" value={addr.pin}  touched={touched.pin}  error={errors.pin}  onChange={handleChange} onBlur={handleBlur} />
              </div>
              <Field name="phone" placeholder="Phone Number" type="tel" value={addr.phone} touched={touched.phone} error={errors.phone} onChange={handleChange} onBlur={handleBlur} />
            </div>
          </div>

          {/* payment method */}
          <div className="bg-white rounded shadow-sm p-5">
            <h2 className="text-lg font-bold text-gray-800 mb-3">Payment Method</h2>
            <div className="flex flex-col gap-2">
              {[["💳","Credit / Debit Card"],["🏦","Net Banking"],["📱","UPI"],["💵","Cash on Delivery"]].map(([icon, label]) => (
                <label key={label} className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:border-[#2874f0] hover:bg-blue-50 transition-colors">
                  <input type="radio" name="payment" defaultChecked={label === "Credit / Debit Card"} className="accent-[#2874f0]" />
                  <span className="text-base">{icon}</span>
                  <span className="text-sm text-gray-700">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* right col */}
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
                <span>Discount</span><span>− $0.00</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Charges</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t pt-3 text-base">
                <span>Total Amount</span><span>${total}</span>
              </div>
              <p className="text-green-600 text-xs font-medium">You will save $0 on this order</p>
            </div>

            <button onClick={handlePlaceOrder}
              className={`mt-5 w-full py-3 rounded font-bold text-sm transition-colors cursor-pointer text-white ${
                hasErrors
                  ? "bg-orange-300 cursor-not-allowed"
                  : "bg-[#fb641b] hover:bg-orange-600"
              }`}>
              Pay ${total}
            </button>

            {hasErrors && Object.keys(touched).length > 0 && (
              <p className="text-red-500 text-xs text-center mt-2">
                Please fill in all delivery details to proceed.
              </p>
            )}
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

export default Checkout;
