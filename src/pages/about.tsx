import { motion } from "framer-motion";
import { Chip } from "@heroui/chip"; // or @heroui/chip depending on your setup

const imageModules = import.meta.glob("../assets/images/about/*.jpg", {
  eager: true,
});
const images = Object.values(imageModules).map((mod: any) => mod.default);
const mid = Math.ceil(images.length / 2);
const topImages = images.slice(0, mid);
const bottomImages = images.slice(mid);

const interests = [
  "Web Development",
  "Artificial Intelligence",
  "Backend Engineering",
  "Data Structure",
  "System Engineering",
  "Data Engineering",
  "Gym",
  "Traveling",
  "Game Online (Roblox)",
];

type ChipColor = "default" | "secondary" | "success" | "danger" | "warning" | "primary";
const chipColors: ChipColor[] = ["primary", "secondary", "success", "danger"];

export default function About() {
  return (
    <section className="flex flex-col items-center text-center relative h-full w-full ">
      <div className="relative overflow-hidden group flex-col flex gap-1 ">
        {/* Top moving row */}
        <motion.div
          className="flex gap-1 w-full relative"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 80,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[
            ...topImages,
            ...topImages,
            ...topImages,
            ...topImages,
            ...topImages,
          ].map((img, i) => (
            <motion.div
              key={`top-${i}`}
              className="flex-shrink-0"
              whileHover={{ zIndex: 30 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src={img}
                alt={`top-${i}`}
                className="lg:h-[250px] h-[200px] rounded-sm w-auto object-cover transition-all duration-300 group-hover:opacity-60 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom moving row (reverse direction) */}
        <motion.div
          className="flex gap-1 w-full relative"
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            duration: 80,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[
            ...bottomImages,
            ...bottomImages,
            ...bottomImages,
            ...bottomImages,
            ...bottomImages,
          ].map((img, i) => (
            <motion.div
              key={`bottom-${i}`}
              className="flex-shrink-0"
              whileHover={{ zIndex: 30 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src={img}
                alt={`bottom-${i}`}
                className="lg:h-[250px] h-[200px] rounded-sm w-auto object-cover transition-all duration-300 group-hover:opacity-60 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="h-full w-12 bg-gradient-to-r from-background/75 to-background/0 absolute left-0 " />
        <div className="h-full w-12 bg-gradient-to-l from-background/75 to-background/0 absolute right-0 " />
      </div>
      <div className="px-12 grid grid-cols-1 space-y-8 lg:space-y-0 py-8 lg:pt-0 lg:grid-cols-2 place-items-center flex-1 lg:w-4/5">
        <motion.p
          className="text-default-700 md:text-base flex-none text-left leading-relaxed max-w-xl  md:pr-6 "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-lg font-light">
            Hi, I’m <span className="text-success font-semibold">Ray</span> — a
            passionate software engineer who loves exploring about new technologies and AI. 
            I specialize in building web applications that combine clean design and high performance. 
            I enjoy learning new technologies and collaborating with other creators to make the software a
            more beautiful and accessible space.
          </div>
        </motion.p>

        {/* Interests */}
        <div className="flex flex-wrap justify-start md:justify-center pr-16 md:pr-0 items-center gap-4 max-w-xl flex-none md:pl-6">
          <div className="relative w-full text-start md:text-center font-semibold md:text-3xl text-2xl text-warning mb-2">
            Interests
            <div className="absolute top-0 md:left-1/2 md:-translate-x-1/2 blur-sm ">
              Interests
            </div>
          </div>
          {interests.map((interest, i) => (
            <motion.div
              key={interest}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
            >
              <Chip
                color={`${chipColors[i % 4]}`}
                variant="flat"
                className="cursor-default hover:scale-105 transition-transform"
              >
                {interest}
              </Chip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
