import DefaultLayout from "@/layouts/default";
import Home from "./home";
import About from "./about";
import Works from "./works";
import Contact from "./contact";

export default function Index() {
  return (
    <DefaultLayout>
      <main className="scroll-smooth snap-y snap-mandatory">
        <section
          id="home"
          className="h-[calc(100dvh-60px)] flex flex-col justify-center items-center snap-start"
        >
          <Home />
        </section>

        <section
          id="about"
          className="lg:h-[calc(100dvh-60px)] flex flex-col snap-start"
        >
          <About />
        </section>

        <section
          id="works"
          className="min-h-[calc(100dvh-60px)] snap-start"
        >
          <Works />
        </section>

        <section
          id="contact"
          className="h-[calc(100dvh-60px)] overflow-hidden snap-start"
        >
          <Contact />
        </section>
      </main>
    </DefaultLayout>
  );
}
