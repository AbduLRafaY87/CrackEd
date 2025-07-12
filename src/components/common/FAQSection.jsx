import React, { useState } from 'react';

const faqs = [
  {
    question: 'What is CrackEd LMS?',
    answer: 'CrackEd is a modern Learning Management System offering flashcards, MCQs, mock exams, notes, past papers, and AI-powered tutoring.'
  },
  {
    question: 'How do I sign up?',
    answer: 'Click the Sign Up button on the top right and fill in your details to create an account.'
  },
  {
    question: 'Is CrackEd free to use?',
    answer: 'CrackEd offers both free and premium features. You can start for free and upgrade anytime.'
  },
  // Add more FAQs as needed
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section my-5">
      <h2 className="mb-4 text-center">Frequently Asked Questions</h2>
      <div className="accordion" id="faqAccordion">
        {faqs.map((faq, idx) => (
          <div className="accordion-item" key={idx}>
            <h2 className="accordion-header" id={`faqHeading${idx}`}>
              <button
                className={`accordion-button${openIndex === idx ? '' : ' collapsed'}`}
                type="button"
                aria-expanded={openIndex === idx}
                aria-controls={`faqCollapse${idx}`}
                onClick={() => toggleFAQ(idx)}
              >
                {faq.question}
              </button>
            </h2>
            <div
              id={`faqCollapse${idx}`}
              className={`accordion-collapse collapse${openIndex === idx ? ' show' : ''}`}
              aria-labelledby={`faqHeading${idx}`}
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;

// Usage: import FAQSection from '../components/common/FAQSection';
// Place <FAQSection /> anywhere in your page components.
