import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <span className={title()}>Fasya&nbsp;</span>
          <span className={title({ color: "violet" })}>Raihan&nbsp;</span>
          <span className={title()}>Maulana</span>
        </div>
        
      </section>
    </DefaultLayout>
  );
}
