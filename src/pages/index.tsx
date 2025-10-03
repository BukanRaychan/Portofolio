import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/image";
import me from "@/assets/images/me.png";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center h-full justify-center gap-4 py-8 md:py-10">
        <div className="flex justify-between w-full items-center">
          {/* Image Side */}
          <div className="flex-1 flex justify-center">
            <Image
              isBlurred
              alt="HeroUI Album Cover"
              className="m-5 max-w-xs"
              src={me}
            />
          </div>

          {/* Text Side */}
          <div className={`flex-1 text-left`}>
            <div className={title({fullWidth:true})}>
              <span className={title({ size: "xl" , font:"bold"})}>Fasya&nbsp;</span>
              <span className={title({ color: "violet", size: "xl", font:"bold" })}>
                Raihan
              </span>
              <br />
              <span className={title({ size: "xl", font:"bold" })}>Maulana</span>
            </div>
            <div className={`${title({ size: "xs" , font: "light"})}`}>
                Graduated in{" "}
                <span className="font-semibold">Software Engineering{" "}</span>
                with internship experience in{" "}
                <span className="font-semibold">
                  backend and fullstack development
                </span>
                . Skilled in building{" "}
                <span className="font-semibold">web apps</span> and{" "}
                <span className="font-semibold">SaaS platforms</span>, with
                applied AI research experience in{" "}
                <span className="font-semibold">telemedicine</span> and
                <span className="font-semibold"> health tech</span>.
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
