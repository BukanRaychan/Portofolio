import { subtitle, title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {Button} from "@heroui/button";
// import { Image } from "@heroui/image";
// import me from "@/assets/images/me.png";
// import { Link } from "@heroui/link";
// import { siteConfig } from "@/config/site";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import InstagramIcon from "@mui/icons-material/Instagram";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center h-full justify-center gap-4 py-8 md:py-10">
        <div className="flex justify-center w-full items-center">
          {/* Text Side */}
          <div className={`text-left`}>
            <div className={title({ fullWidth: true , size: "2xl" })}>
              <span className="">Hello, I'm Ray.</span>
              <br/>
              <span
              >
                a Software Engineer&nbsp;
              </span>
            </div>

            <div className="max-w-lg mt-9 text-primary">
              <span className={subtitle()}>
                i've built websites with various technologies.
              </span>
            </div>
            
            <Button color="primary" variant="faded" className="mt-12 font font-bold border-1 px-8 py-6">LET'S START TO NOW ABOUT ME</Button>
            {/* <div className="flex mt-2 gap-x-4 ">
              <Link isExternal href={siteConfig.links.instagram} title="GitHub">
               <InstagramIcon className="text-default-500 hover:scale-110 transition-transform" />
              </Link>
              <Link isExternal href={siteConfig.links.linkedin} title="Discord">
                <LinkedInIcon className="text-default-500 hover:scale-110 transition-transform" />
              </Link>
              <Link isExternal href={siteConfig.links.github} title="GitHub">
                <GitHubIcon className="text-default-500 hover:scale-110 transition-transform" />
              </Link>
            </div> */}
          </div>
          {/* Image Side */}
          {/* <div className="flex-1 flex justify-center">
            <Image
              isBlurred
              alt="HeroUI Album Cover"
              className="m-5 max-w-sm"
              src={me}
            />
          </div> */}
        </div>
      </section>
    </DefaultLayout>
  );
}
