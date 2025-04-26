import Products from "@/components/Products";
import Footer from "@/shared/Footer/Footer";

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-5">
        {/* today products */}
        <div className="mt-12 md:mt-20 lg:mt-20">
          <h1 className="text-xl md:text-2xl font-medium text-base-content">
            Top Bangladeshi Products Launching Today
          </h1>
          <Products endpoint="today" />
        </div>
        {/* yesterday */}
        <div className="mt-12 md:mt-20 lg:mt-32">
          <h2 className="text-xl md:text-2xl font-medium text-base-content">
            Yesterday's Top Products
          </h2>
          <Products endpoint="yesterday" />
        </div>
        {/* last weeks */}
        <div className="mt-12 md:mt-20 lg:mt-32">
          <h2 className="text-xl md:text-2xl font-medium text-base-content">
            Last Week's Top Products
          </h2>
          <Products endpoint="last-weeks" />
        </div>
        {/* last months */}
        <div className="mt-12 md:mt-20 lg:mt-32">
          <h2 className="text-xl md:text-2xl font-medium text-base-content">
            Last Month's Top Products
          </h2>
          <Products endpoint="last-months" />
        </div>
        <div className="mt-12 md:mt-20 lg:mt-32">
          <Footer />
        </div>
      </section>
    </>
  );
}
