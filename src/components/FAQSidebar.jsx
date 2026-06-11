import { useEffect, useRef } from 'react';

export default function FAQSidebar({ sections, activeSection, setActiveSection }) {
  const itemRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((el, i) => {
      if (el) el.style.animationDelay = `${i * 0.08}s`;
    });
  }, []);

  return (
    <nav className="faq-sidebar">
      <h3 className="faq-sidebar-title">Categories</h3>
      <div className="faq-sidebar-items">
        <button
          className={`faq-sidebar-item ${!activeSection ? 'active' : ''} anim-fade-left`}
          style={{ '--delay': '0s' }}
          onClick={() => setActiveSection(null)}
        >
          <span className="faq-sidebar-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </span>
          <span>All Questions</span>
        </button>
        {sections.map((sec, i) => (
          <button
            key={sec.section}
            ref={el => itemRefs.current[i] = el}
            className={`faq-sidebar-item anim-fade-left ${activeSection === sec.section ? 'active' : ''}`}
            onClick={() => setActiveSection(sec.section)}
          >
            <span className="faq-sidebar-icon">
              {sec.section.includes('Order') ? '💳' : sec.section.includes('Ship') ? '🚚' : sec.section.includes('Return') ? '↩️' : '📏'}
            </span>
            <span>{sec.section}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
