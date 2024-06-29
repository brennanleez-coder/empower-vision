"use client";
import ProcessVideo from "@/app/components/ProcessVideo";
import Results from "@/app/components/Results";
import { motion } from "framer-motion";
const MainContent = () => {
  return (
    <motion.main
      className="flex-grow p-4"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <ProcessVideo />
      <Results />
    </motion.main>
  );
};

export default MainContent;
