import { useState, useRef, useEffect } from 'react';

export default function FAQItem({ question, answer, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, answer]);

  return (
    <div className={`faq-item anim-fade-up ${isOpen ? 'open' : ''}`} style={{ '--delay': `${index * 0.05}s` }}>
      <div className="faq-question" onClick={onToggle}>
        <span className="faq-q-text">{question}</span>
        <span className={`faq-icon ${isOpen ? 'open' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </div>
      <div className="faq-answer-wrapper" style={{ maxHeight: `${height}px` }}>
        <div ref={contentRef} className="faq-answer">
          {answer}
        </div>
      </div>
    </div>
  );
}
