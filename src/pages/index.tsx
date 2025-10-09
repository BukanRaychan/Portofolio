import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Image } from "@heroui/image";
import me from "@/assets/images/me.png";
import { Link } from "@heroui/link";
import { siteConfig } from "@/config/site";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center h-full justify-center gap-4 py-8 md:py-10">
        <div className="flex justify-between w-full items-center">
          {/* Text Side */}
          <div className={`flex-1 text-left`}>
            <div className={title({ fullWidth: true })}>
              <span className="">Fasya&nbsp;</span>
              <span
              >
                Raihan&nbsp;
              </span>
              <span className="">Maulana</span>
            </div>

            <div className="max-w-lg mt-9 text-primary">
              <span className={subtitle()}>
                Graduated in <span className="">Software Engineering </span>
                with internship experience in{" "}
                <span className="">backend and fullstack development</span>.
                Skilled in building <span className="">web apps</span> and{" "}
                <span className="">SaaS platforms</span>, with applied AI
                research experience in <span className="">telemedicine</span>{" "}
                and
                <span className=""> health tech</span>.
              </span>
            </div>
            <div className="mt-12 font text-default-500 font-bold">Lets Connect</div>
            <div className="flex mt-2 gap-x-4 ">
              <Link isExternal href={siteConfig.links.instagram} title="GitHub">
               <InstagramIcon className="text-default-500 hover:scale-110 transition-transform" />
              </Link>
              <Link isExternal href={siteConfig.links.linkedin} title="Discord">
                <LinkedInIcon className="text-default-500 hover:scale-110 transition-transform" />
              </Link>
              <Link isExternal href={siteConfig.links.github} title="GitHub">
                <GitHubIcon className="text-default-500 hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
          {/* Image Side */}
          <div className="flex-1 flex justify-center">
            <Image
              isBlurred
              alt="HeroUI Album Cover"
              className="m-5 max-w-sm"
              src={me}
            />
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
