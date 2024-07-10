'use client';
import { motion } from "framer-motion";

type TestTypeProps = {
  title: string;
  description: string;
};

const TestCard = ({ title, description }: TestTypeProps) => (
  <div className="bg-light p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-primary">
    <h2 className="text-xl font-semibold mb-4 text-primary">{title}</h2>
    <div className="w-full h-48 mb-4 bg-accent rounded-lg flex items-center justify-center border border-primary">
      <span className="text-secondary">Video Placeholder</span>
    </div>
    <p className="text-secondary">{description}</p>
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
      className="flex-grow p-8 bg-accent text-primary"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <section className="container mx-auto max-w-screen-lg">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 text-primary">About Our Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tests.map((test, index) => (
            <TestCard key={index} title={test.title} description={test.description} />
          ))}
        </div>
      </section>
      <section className="mt-12 p-6 bg-light rounded-lg shadow-md">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 text-primary">Optimal Camera Setup</h2>
        <div className="space-y-12">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-secondary">Gait Speed Walk Test and Timed Up and Go</h3>
            <p className="text-lg md:text-xl text-secondary text-center mb-6">
              For accurate analysis, ensure that the camera angle is perpendicular to the direction of movement and placed at chest level of the participant. This setup will help us capture the most precise data for your assessment.
            </p>
            <div className="flex justify-center">
              <img src="/images/camera-setup-gait.png" alt="Camera Setup for Gait Speed Walk Test and Timed Up and Go" className="w-full max-w-md rounded-lg shadow-md"/>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-center mb-4 text-secondary">5 Repetition Chair Rise</h3>
            <p className="text-lg md:text-xl text-secondary text-center mb-6">
              The camera should be positioned to show the side view of a person sitting down. Ensure the camera captures the full motion of sitting down and rising up for accurate assessment.
            </p>
            <div className="flex justify-center">
              <img src="/images/camera-setup-chair-rise.png" alt="Camera Setup for 5 Repetition Chair Rise" className="w-full max-w-md rounded-lg shadow-md"/>
            </div>
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default About;
