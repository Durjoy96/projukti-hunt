import TodayProducts from "@/components/TodayProducts";

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-5">
        <div className="mt-12 md:mt-20">
          <h1 className="text-2xl font-medium text-base-content">
            Top Products Launching Today
          </h1>
        </div>
        <TodayProducts />
      </section>
    </>
  );
}
