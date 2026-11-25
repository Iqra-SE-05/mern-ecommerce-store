function Hero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white">
      <div className="max-w-6xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <p className="uppercase tracking-widest text-sm mb-3 opacity-90">
            New Season Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
            Shop Smart, <br /> Live Better
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-md">
            Discover the best products at the best prices, with Cash on
            Delivery across Pakistan.
          </p>
          <a
            href="#products"
            className="inline-block bg-white text-pink-600 font-bold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
          >
            Shop Now
          </a>
        </div>

        <div className="flex-1 flex justify-center">
  <img
    src="/hero.jpg"
    alt="Shopping"
    className="w-full max-w-md h-80 object-cover rounded-3xl shadow-2xl"
  />
</div>
      </div>
    </section>
  );
}

export default Hero;