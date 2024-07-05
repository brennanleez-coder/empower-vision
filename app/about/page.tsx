'use client';
import { motion } from "framer-motion";

type TestTypeProps = {
  title: string;
  description: string;
};

const TestCard = ({ title, description }: TestTypeProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    <div className="w-full h-48 mb-4 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-200">
      <span className="text-gray-500">Video Placeholder</span>
    </div>
    <p className="text-gray-700">{description}</p>
  </div>
);

const About = () => {
  const tests = [
    {
      title: "5 Seconds Sit Stand",
      description:
        "The 5 Seconds Sit Stand test measures the time it takes for a person to sit down and stand up five times as quickly as possible. This test is an indicator of lower body strength and endurance.",
    },
    {
      title: "Timed Up and Go",
      description:
        "The Timed Up and Go test (TUG) measures the time it takes for a person to rise from a chair, walk three meters, turn around, walk back to the chair, and sit down. It assesses mobility, balance, walking ability, and fall risk.",
    },
    {
      title: "4m Gait Speed Walk Test",
      description:
        "The 4m Gait Speed Walk Test measures the time it takes to walk four meters at a comfortable pace. This test is an indicator of overall walking ability and has been linked to functional independence and survival in older adults.",
    },
  ];

  return (
    <motion.main
      className="flex-grow p-8 bg-gray-50 text-gray-800"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="container mx-auto max-w-screen-lg">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-800">About Our Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tests.map((test, index) => (
            <TestCard key={index} title={test.title} description={test.description} />
          ))}
        </div>
      </section>
    </motion.main>
  );
};

export default About;
