// import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
// import { Avatar } from "@heroui/avatar";
// import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
// import { Chip } from "@heroui/chip";
import { motion } from "framer-motion";
import GithubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import me from "@/assets/images/me.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// if you keep social links in your siteConfig:
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

export default function Contact() {
  const email = "fasyaraihan82@gmail.com";
  return (
    <div className="flex  items-center justify-center h-full ">
      <div className="text-center flex flex-col gap-y-12 ">
        <div className="group relative inline-block cursor-pointer select-none ">
          <div className="text-left ml-1 text-default-500 text-sm">
            Click here too
          </div>

          <a
            href={`mailto:${email}?subject=Hello%20Fasya&body=Hi%20Fasya,%0D%0A`}
            className="flex items-center gap-3 overflow-visible "
          >
            <motion.div
              className="relative flex items-center"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-visible">
                <span
                  className={`relative text-primary transition-all duration-300 `}
                >
                  <span className={title({ size: "3xl", font: "bold" , color: "success"})}>
                    Contact Me
                    
                    <div className="absolute -translate-y-full 
                      blur-sm pointer-events-none -z-50 opacity-0 group-hover:opacity-50  
                      transition-all duration-300">
                      <span className={title({ size: "3xl", font: "bold" , color: "success"})}>Contact Me</span>
                    </div>
                  </span>
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 5 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="ml-3 flex items-center"
              >
                <ChevronRightIcon className="w-7 h-7 text-danger-600 drop-shadow-lg" />
              </motion.div>
            </motion.div>
          </a>
        </div>

        <div className="flex gap-4 items-center justify-center h-full">
          <Link
            isExternal
            href={siteConfig.links.github}
            aria-label="GitHub"
            className="text-default hover:text-default-700 transition hover:scale-[1.05]"
          >
            <GithubIcon fontSize="large" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.linkedin}
            aria-label="LinkedIn"
            className="text-default hover:text-default-700 transition hover:scale-[1.05]"
          >
            <LinkedInIcon fontSize="large" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.instagram}
            aria-label="Instagram"
            className="text-default hover:text-default-700 transition hover:scale-[1.05]"
          >
            <InstagramIcon fontSize="large" />
          </Link>
        </div>
      </div>
    </div>
  );
}
