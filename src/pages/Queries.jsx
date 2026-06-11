import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import FAQSidebar from '../components/FAQSidebar';
import FAQItem from '../components/FAQItem';


const FAQ_DATA = [
  {
    section: 'Orders & Payments',
    items: [
      { q: 'How do I place an order?', a: 'Browse products, add to cart, select size and quantity, then proceed to checkout. You can pay via credit/debit card, UPI, net banking, or cash on delivery.' },
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, RuPay, UPI (GPay, PhonePe, Paytm), net banking from all major banks, and cash on delivery for orders under ₹5,000.' },
      { q: 'Is my payment information secure?', a: 'Yes! All transactions are encrypted with 256-bit SSL. We never store your card details. PCI‑DSS compliant payment processing ensures complete security.' },
      { q: 'Can I cancel my order?', a: 'You can cancel within 2 hours of placing the order. After that, cancellation depends on shipping status. Contact support for help.' },
    ],
  },
  {
    section: 'Shipping & Delivery',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 5‑7 business days. Express delivery (available at checkout) takes 2‑3 business days. Remote areas may take 1‑2 extra days.' },
      { q: 'Is shipping free?', a: 'Free shipping on all orders above ₹999! Orders below ₹999 have a flat ₹99 shipping fee.' },
      { q: 'Do you ship internationally?', a: 'Currently we ship only within India. International shipping is coming soon!' },
      { q: 'How can I track my order?', a: 'Once shipped, you will receive a tracking number via email and SMS. Track your order in real‑time on our website.' },
    ],
  },
  {
    section: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: '30‑day hassle‑free returns from the date of delivery. Items must be unworn, unwashed, with original tags attached.' },
      { q: 'How do I initiate a return?', a: 'Go to your order, click "Return," select the reason, and schedule a pickup. Our courier will collect it from your doorstep.' },
      { q: 'Can I exchange for a different size?', a: 'Yes! Select "Exchange" instead of "Return" and choose the new size. Free size exchange within 30 days.' },
      { q: 'When will I get my refund?', a: 'Refunds are processed within 5‑7 business days after we receive the returned item. The amount is credited to your original payment method.' },
    ],
  },
  {
    section: 'Products & Sizing',
    items: [
      { q: 'How do I find my size?', a: 'Check our size chart on each product page. Measure yourself and compare. When in doubt, go one size up for a relaxed fit.' },
      { q: 'Are the product images accurate?', a: 'We strive for accurate representation. Minor color differences may occur due to screen settings and lighting during photography.' },
      { q: 'Do you restock sold‑out items?', a: 'Popular items are restocked regularly. Click "Notify Me" on the product page to get an alert when it is back in stock.' },
      { q: 'What fabrics do you use?', a: 'We use premium cotton, silk, georgette, chiffon, linen, and blends. Each product page lists the exact fabric composition.' },
    ],
  },
];

export default function Queries() {
  const [search, setSearch] = useState('');
  const [openItems, setOpenItems] = useState({});
  const [activeSection, setActiveSection] = useState(null);

  const toggleItem = (key) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredData = useMemo(() => {
    if (!search) return FAQ_DATA;
    const q = search.toLowerCase();
    return FAQ_DATA.map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
      ),
    })).filter((section) => section.items.length > 0);
  }, [search]);

  // Helper to highlight matched text
  const highlight = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, 'gi');
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
  };

  // Determine sections to display based on activeSection filter
  const displayedData = activeSection ? filteredData.filter(sec => sec.section === activeSection) : filteredData;

  return (
    <div className="queries-page page-enter grid-contact">
      <FAQSidebar sections={FAQ_DATA} activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="queries-left">
        <h1 className="queries-heading">Help & FAQs</h1>
        <input
          className="queries-search"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {displayedData.map((section) => (
          <div key={section.section} className="faq-section">
            <div className="faq-section-title anim-fade-up">{section.section}</div>
            {section.items.map((item, i) => {
              const key = `${section.section}-${i}`;
              const isOpen = openItems[key];
              return (
                <FAQItem
                  key={key}
                  question={highlight(item.q)}
                  answer={highlight(item.a)}
                  isOpen={isOpen}
                  onToggle={() => toggleItem(key)}
                  index={i}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="queries-right">
        <div className="faq-cta anim-fade-up">
          <h3>Still need help?</h3>
          <p>Our support team is always ready to assist you with any questions or concerns.</p>
          <Link to="/contact" className="btn">Contact Support →</Link>
        </div>
      </div>
    </div>
  );
}
