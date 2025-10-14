import DefaultLayout from "@/layouts/default";
import Home from "./home";
import About from "./about";
import Works from "./works";
import Contact from "./contact";
import ScrollSpy from "react-ui-scrollspy";

export default function Index() {
  return (
    <DefaultLayout>
      <ScrollSpy 
      useBoxMethod
      scrollThrottle={80}
      offsetTop={60}
      offsetBottom={0}
      activeClass="active-scroll-spy"
      updateHistoryStack={false}
      onUpdateCallback={(activeId) => {
        if (!activeId) return;
        history.replaceState(null, "", `#${activeId}`);
      }} 
      >
        <section
          id="home"
          className="h-[calc(100dvh-60px)] flex flex-col justify-center items-center"
        >
          <Home />
        </section>
        <section
          id="about"
          className="h-[calc(100dvh-60px)] flex flex-col"
        >
          <About />
        </section>
        <section
          id="works"
          className="min-h-[calc(100dvh-60px)] flex flex-col justify-center items-center"
        >
          <Works />
        </section>
        <section
          id="contact"
          className="h-[calc(100dvh-60px)] relative pb-12 overflow-hidden "
        >
          <Contact />
        </section>
      </ScrollSpy>
    </DefaultLayout>
  );
}
