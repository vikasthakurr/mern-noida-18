import { useState } from "react";

const Card = ({
  title = "Tailwind Card",
  description = "This is a reusable card component built with Tailwind CSS.",
  image = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  badge = "Featured",
  buttonText = "Add to Cart",
}) => {
  const [qty, setQty] = useState(0);

  return (
    <article className="max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <img src={image} alt={title} className="h-48 w-full object-cover" />

      <div className="space-y-4 p-5">
        <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
          {badge}
        </span>

        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm leading-6 text-slate-600">{description}</p>

        {qty === 0 ? (
          // show add button when not in cart
          <button
            type="button"
            onClick={() => setQty(1)}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            {buttonText}
          </button>
        ) : (
          // show qty controls once added
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQty((q) => q - 1)}
              className="w-8 h-8 rounded-lg bg-slate-200 text-slate-800 font-bold text-lg flex items-center justify-center hover:bg-slate-300 transition"
            >
              −
            </button>
            <span className="text-sm font-semibold text-slate-900 w-4 text-center">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-lg flex items-center justify-center hover:bg-slate-700 transition"
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default Card;
