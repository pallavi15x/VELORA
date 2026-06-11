import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const INFO = [
  { icon: '✉', title: 'Email', detail: 'hello@velora.com', sub: 'We reply within 2 hours' },
  { icon: '☎', title: 'Phone', detail: '+91 98765 43210', sub: 'Mon–Sat, 9am–8pm' },
  { icon: '📍', title: 'Address', detail: '123 Fashion Street, Mumbai', sub: 'Maharashtra 400001' },
  { icon: '🕐', title: 'Hours', detail: '9:00 AM – 8:00 PM', sub: 'Sunday closed' },
];

const SUBJECTS = ['General Inquiry', 'Order Issue', 'Return/Exchange', 'Product Question', 'Partnership', 'Other'];

export default function Contact() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const cardRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    cardRefs.current.forEach(el => { if (el) observer.observe(el); });
    if (formRef.current) observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const update = (field, val) => setFormData(f => ({ ...f, [field]: val }));

  return (
    <div className="contact-page page-enter">
      <div className="contact-layout">
        <div>
          <h1 className="contact-heading">Let's Talk Fashion</h1>
          <p className="contact-subtitle">Have a question, suggestion, or just want to chat about style? We'd love to hear from you. Our team is always ready to help.</p>
          {INFO.map((item, i) => (
            <div key={i} className="contact-card" ref={el => cardRefs.current[i] = el} style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="contact-icon-circle">{item.icon}</div>
              <div>
                <div className="contact-card-title">{item.title}</div>
                <div className="contact-card-detail">{item.detail}</div>
                <div className="contact-card-sub">{item.sub}</div>
              </div>
            </div>
          ))}
          <div className="social-row">
            {['𝕏', 'f', '◉', 'pin'].map((s, i) => (
              <div key={i} className="social-icon">{s}</div>
            ))}
          </div>
        </div>
        <div ref={formRef} className="contact-form-card fade-section">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input value={formData.firstName} onChange={e => update('firstName', e.target.value)} placeholder="John" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input value={formData.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Doe" required />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={formData.email} onChange={e => update('email', e.target.value)} placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select value={formData.subject} onChange={e => update('subject', e.target.value)} required>
                <option value="">Select a subject</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea value={formData.message} onChange={e => update('message', e.target.value)} placeholder="Tell us what's on your mind..." required />
            </div>
            <button type="submit" className={`submit-btn${status === 'loading' ? ' loading' : ''}${status === 'success' ? ' success' : ''}`}>
              {status === 'idle' && 'Send Message →'}
              {status === 'loading' && '⏳ Sending...'}
              {status === 'success' && '✓ Sent! We\'ll reply within 2 hours'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
