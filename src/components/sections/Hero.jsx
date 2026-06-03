import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <p className="hero-eyebrow">H A U T E &nbsp; C O U T U R E &nbsp; A T E L I E R</p>
      <h1 className="hero-title">VELORA</h1>
      <div className="hero-divider">
        <span className="hero-divider-line" />
        <span className="hero-divider-dot">•</span>
        <span className="hero-divider-line" />
      </div>
      <p className="hero-subtitle">L U X U R Y &nbsp; F A S H I O N &nbsp; R E D E F I N E D</p>
      <Link to="/shop" className="hero-cta">E X P L O R E &nbsp; C O L L E C T I O N</Link>
      <p className="hero-locations">P A R I S &nbsp; • &nbsp; M I L A N &nbsp; • &nbsp; T O K Y O</p>
    </section>
  )
}

export default Hero
