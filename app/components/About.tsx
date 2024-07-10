'use client';
import React from 'react';
import { motion } from "framer-motion";

type ContactCardProps = {
  name: string;
  title: string;
  description: string;
};

const ContactCard = ({ name, title, description }: ContactCardProps) => (
  <div className="bg-light p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-primary">
    <h2 className="text-xl font-semibold mb-2 text-primary">{name}</h2>
    <h3 className="text-md mb-4 text-secondary">{title}</h3>
    <p className="text-secondary">{description}</p>
  </div>
);

const About = () => {
  const contacts = [
    {
      name: "Brennan Lee",
      title: "Computer Vision Engineer",
      description:
        "Brennan Lee is a skilled computer vision engineer with expertise in developing advanced algorithms for healthcare applications. His work involves creating systems that can analyze medical images and videos to provide insights for clinical decision-making.",
    },
    {
      name: "Prof Teo Hock Hai",
      title: "Professor, NUS",
      description:
        "Prof Teo Hock Hai is a renowned professor at the National University of Singapore, specializing in health informatics and information systems. His research interests include the use of technology to enhance healthcare delivery and the adoption of innovative health IT solutions.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">NUS Health Informatics Lab</h1>
        <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="flex-1 bg-light p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-primary">
            <h2 className="text-2xl font-semibold mb-4 text-primary">About the Lab</h2>
            <p className="text-secondary">
              The NUS Health Informatics Lab focuses on leveraging data and informatics to improve healthcare delivery and outcomes. The lab conducts cutting-edge research and collaborates with industry and academic partners to drive innovation in health informatics.
            </p>
          </div>
          <div className="flex-1 flex flex-col space-y-8">
            {contacts.map((contact, index) => (
              <ContactCard
                key={index}
                name={contact.name}
                title={contact.title}
                description={contact.description}
              />
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default About;
