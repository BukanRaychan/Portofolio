import { title, subtitle } from "@/components/primitives";
import { Button } from "@heroui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center h-full justify-center gap-4 py-8 md:py-10">
      <div className="flex justify-center w-full items-center">
        {/* Text Side */}
        <div className={`text-left`}>
          <div className={title({ fullWidth: true, size: "2xl" })}>
            <span className="">Hello, I'm Ray.</span>
            <br />
            <span>a Software Engineer&nbsp;</span>
          </div>

          <div className="max-w-lg mt-9 text-primary">
            <span className={subtitle()}>
              i've built websites with various technologies.
            </span>
          </div>

          <Button
            color="primary"
            variant="flat"
            className="group mt-12 font font-bold hover:scale-[1.01] px-8 py-6"
          >
            CLICK HERE PWEASEE
            <span className="group-hover:hidden">🥺</span>
            <span className="hidden group-hover:block">🥰</span>
          </Button>
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
  );
}
