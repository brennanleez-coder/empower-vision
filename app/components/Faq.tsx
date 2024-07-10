'use client';
import React from 'react';
import { motion } from "framer-motion";

type FAQProps = {
  question: string;
  answer: string;
};

const FAQItem = ({ question, answer }: FAQProps) => (
  <div className="bg-light p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-primary">
    <h2 className="text-xl font-semibold mb-4 text-primary">{question}</h2>
    <p className="text-secondary">{answer}</p>
  </div>
);

const FAQ = () => {
  const faqs = [
    {
      question: "What is frailty testing?",
      answer: "Frailty testing is a comprehensive assessment to determine an individual's level of frailty through various physical tests.",
    },
    {
      question: "How does gait analysis work?",
      answer: "Gait analysis involves assessing walking patterns using advanced algorithms to identify potential issues related to mobility and balance.",
    },
    {
      question: "What are the benefits of health monitoring?",
      answer: "Health monitoring helps track progress, provides insights into overall health and well-being, and aids in early detection of potential health issues.",
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
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">Frequently Asked Questions</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>
    </motion.main>
  );
};

export default FAQ;
