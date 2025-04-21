import Products from "@/components/Products";

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-5">
        <div className="mt-12 md:mt-20">
          <h1 className="text-xl md:text-2xl font-medium text-base-content">
            Top Bangladeshi Products Launching Today
          </h1>
          <Products endpoint="today" />
        </div>
        {/* yesterday */}
        <div className="mt-12 md:mt-20">
          <h1 className="text-xl md:text-2xl font-medium text-base-content">
            Yesterday's Top Products
          </h1>
          <Products endpoint="yesterday" />
        </div>
        {/* last weeks */}
        <div className="mt-12 md:mt-20">
          <h1 className="text-xl md:text-2xl font-medium text-base-content">
            Last Week's Top Products
          </h1>
          <Products endpoint="last-weeks" />
        </div>
        {/* last months */}
        <div className="mt-12 md:mt-20">
          <h1 className="text-xl md:text-2xl font-medium text-base-content">
            Last Month's Top Products
          </h1>
          <Products endpoint="last-months" />
        </div>
      </section>
    </>
  );
}
