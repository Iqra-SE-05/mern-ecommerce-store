import ProductCard from "./ProductCard";

function ProductRow({ title, subtitle, products, onAdd }) {
  if (products.length === 0) return null;

  return (
    <section className="max-w-6xl mx-auto px-8 pt-12">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-1 mb-6">{subtitle}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} onAdd={() => onAdd(p)} />
        ))}
      </div>
    </section>
  );
}

export default ProductRow;