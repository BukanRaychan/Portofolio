import { title, subtitle } from "@/components/primitives";
import { motion } from "framer-motion";
// import { SvgIcon } from "@mui/material";
// import LanguageIcon from '@mui/icons-material/Language';
// import CodeIcon from "@mui/icons-material/Code";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center h-full w-full justify-center gap-6 overflow-hidden ">
      {/* Spinning MUI logo ornaments */}
      {/* <motion.div
        className="absolute bottom-0 left-20 sm:scale-150 text-warning/5 blur-xs translate-y-1/3"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <SvgIcon component={LanguageIcon} sx={{ fontSize: 120 }} />
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-20 sm:scale-200 text-warning/5 blur-xs translate-y-1/3"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        <SvgIcon component={CodeIcon} sx={{ fontSize: 90 }} />
      </motion.div> */}

      {/* Greeting text */}
      <motion.div
        className="text-left flex flex-col items-start gap-6 z-10 px-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 80 }}
      >
        <motion.h1
          className={title({ fullWidth: true, size: "2xl",  color:"primary" })}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
        >
          Hello, I'm Ray.
          <br />
          <span className="">A Software Engineer.</span>
        </motion.h1>

        <motion.p
          className={`${subtitle()} max-w-[800px]`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          A software engineering enthusiast, constantly eager to learn and explore cutting-edge technologies to build innovative software solutions.
        </motion.p>
      </motion.div>

      {/* Floating glow ornament */}
      {/* <motion.div
        className="absolute top-1/2 left-1/2 w-[220px] h-[220px]
                  -translate-x-1/2 -translate-y-1/2 rounded-full z-0
                  bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT)_0%,transparent_70%)]
                  opacity-40 blur-[100px]"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      /> */}
    </section>
  );
}
