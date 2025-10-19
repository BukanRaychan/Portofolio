import { Link } from "@heroui/link";
import { motion } from "framer-motion";
import GithubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { siteConfig } from "@/config/site";
import { title } from "@/components/primitives";

export default function Contact() {
  const email = "fasyaraihan82@gmail.com";

  return (
    <motion.div
      className="relative flex items-center justify-center h-full w-full overflow-hidden "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* ✨ Animated gradient background */}
      {/* <div
        className="absolute h-full bottom-0 w-full opacity-20 scale-125 blur-3xl"
        style={{
          zIndex: 0,
          background:
            "linear-gradient(120deg, #ff7096, #7b61ff, #3ee9e5, #ffb347)",
          backgroundSize: "400% 400%",
          animation: "moveGradient 15s ease-in-out infinite",
        }}
      /> */}

      {/* 🕳 Fade overlay for cinematic gradient */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-background via-background/100 to-background/0 pointer-events-none" /> */}

      {/* 💬 Main content */}
      <div className="relative z-10 text-center flex flex-col gap-y-6 sm:gap-y-12">
        <motion.div
          className="group relative inline-block cursor-pointer select-none"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-left ml-1 text-default-500 text-sm">
            Click here to
          </div>

          <a
            href={`mailto:${email}?subject=Hello%20Fasya&body=Hi%20Fasya,%0D%0A`}
            className="flex items-center gap-3 overflow-visible"
          >
            <motion.div
              className="relative flex items-center"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative overflow-visible">
                <span className="relative text-primary transition-all duration-300">
                  <span
                    className={title({
                      size: "4xl",
                      font: "bold",
                      color: "danger",
                    })}
                  >
                    Contact Me
                    <div
                      className="absolute -translate-y-full blur-md pointer-events-none -z-50 opacity-0 group-hover:opacity-40    
                  transition-all duration-500"
                    >
                      <span
                        className={title({
                          size: "4xl",
                          font: "bold",
                          color: "danger",
                        })}
                      >
                        Contact Me
                      </span>
                    </div>
                  </span>
                </span>
              </div>

              <div
                className="absolute right-0 top-1/2 
            sm:translate-x-9 transition duration-150 translate-x-0 group-hover:translate-x-9 -translate-y-1
            opacity-0 group-hover:opacity-100 sm:group-hover:translate-x-12 ease-in-out sm:translate-y-0"
              >
                <ChevronRightIcon className="sm:scale-200 text-danger-500 drop-shadow-lg" />
              </div>
            </motion.div>
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="flex gap-6 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <Link
            isExternal
            href={siteConfig.links.github}
            aria-label="GitHub"
            className="text-default hover:text-default-700 transition  hover:scale-[1.1]"
          >
            <GithubIcon fontSize="large" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.linkedin}
            aria-label="LinkedIn"
            className="text-default hover:text-default-700 transition hover:scale-[1.1]"
          >
            <LinkedInIcon fontSize="large" />
          </Link>
          <Link
            isExternal
            href={siteConfig.links.instagram}
            aria-label="Instagram"
            className="text-default hover:text-default-700 transition hover:scale-[1.1]"
          >
            <InstagramIcon fontSize="large" />
          </Link>
        </motion.div>
      </div>

      {/* 🎨 Gradient animation keyframes */}
      <style>
        {`
      @keyframes moveGradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `}
      </style>
    </motion.div>
  );
}
