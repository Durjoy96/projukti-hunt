import TodayProducts from "@/components/TodayProducts";

export default function Home() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-5">
        <div className="mt-12 md:mt-20">
          <TodayProducts />
        </div>
      </section>
    </>
  );
}
