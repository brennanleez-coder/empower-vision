"use client";
import ProcessVideo from "@components/ProcessVideo";
import Results from "@components/Results";
import { motion } from "framer-motion";
// This is Home Page
const MainContent = () => {
  return (
    <motion.main
      className="flex-grow p-4 bg-accent"
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
