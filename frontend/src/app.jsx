import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import {
  aboutContent,
  contactInfo,
  featureHighlights,
  heroContent,
  navigationLinks,
  newsPosts,
  services,
  teamMembers,
  testimonials,
} from './data/content.js'

import './styles/main.css'

export function App() {
  return (
    <div className="cts-app">
      <Header links={navigationLinks} />
      <main>
        <Hero content={heroContent} />
        {/* About */}
        <section id="about" className="cts-section cts-section-about">
          <div className="cts-container">
            <header className="cts-section-header">
              <h2>Who We Are</h2>
              <p>{aboutContent.lead}</p>
            </header>
            <div className="cts-about-grid">
              <article className="cts-about-card">
                {aboutContent.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </article>
              <aside className="cts-values-grid" aria-label="Company values">
                {aboutContent.values.map((value) => (
                  <div key={value.title} className="cts-value-card">
                    <i className={`fa-solid ${value.icon}`} aria-hidden="true" />
                    <div>
                      <h3>{value.title}</h3>
                      <p>{value.description}</p>
                    </div>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="cts-section cts-section-services">
          <div className="cts-container">
            <header className="cts-section-header">
              <h2>Solutions Crafted for Impact</h2>
              <p>
                Strategy, design, and engineering aligned with your critical business outcomes.
              </p>
            </header>
            <div className="cts-card-grid">
              {services.map((service) => (
                <article key={service.title} className="cts-service-card">
                  <div className="cts-card-icon">
                    <i className={`fa-solid ${service.icon}`} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Feature highlights */}
        <section id="features" className="cts-section cts-section-features">
          <div className="cts-container">
            <div className="cts-feature-grid">
              {featureHighlights.map((feature) => (
                <article key={feature.title} className="cts-feature-card">
                  <div className="cts-feature-icon">
                    <i className={`fa-solid ${feature.icon}`} aria-hidden="true" />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="cts-section cts-section-team">
          <div className="cts-container">
            <header className="cts-section-header">
              <h2>Leadership Team</h2>
              <p>
                Expert strategists, designers, and engineers dedicated to building resilient experiences.
              </p>
            </header>
            <div className="cts-team-grid">
              {teamMembers.map((member) => (
                <article key={member.name} className="cts-team-card">
                  <img src={member.avatar} alt={member.name} className="cts-team-avatar" loading="lazy" />
                  <div className="cts-team-body">
                    <h3>{member.name}</h3>
                    <span className="cts-team-role">{member.role}</span>
                    <p>{member.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="cts-section cts-section-testimonials">
          <div className="cts-container">
            <header className="cts-section-header">
              <h2>Trusted by Leaders</h2>
              <p>Partnerships anchored on measurable outcomes and enduring value.</p>
            </header>
            <div className="cts-testimonial-grid">
              {testimonials.map((item) => (
                <blockquote key={item.name} className="cts-testimonial-card">
                  <p className="cts-testimonial-quote">“{item.quote}”</p>
                  <footer>
                    <span className="cts-testimonial-name">{item.name}</span>
                    <span className="cts-testimonial-role">{item.position}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* News */}
        <section id="news" className="cts-section cts-section-news">
          <div className="cts-container">
            <header className="cts-section-header">
              <h2>Insights & Announcements</h2>
              <p>Perspectives and milestones from the Calvin Tech team.</p>
            </header>
            <div className="cts-news-grid">
              {newsPosts.map((post) => (
                <article key={post.title} className="cts-news-card">
                  <div className="cts-news-meta">{post.date}</div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <a className="cts-news-link" href="#contact">
                    Read More
                    <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="cts-section cts-section-contact">
          <div className="cts-container cts-contact">
            <div className="cts-contact__intro">
              <header className="cts-section-header">
                <h2>Let’s Collaborate</h2>
                <p>{contactInfo.description}</p>
              </header>
              <ul className="cts-contact__details">
                {contactInfo.details.map((detail) => (
                  <li key={detail.label}>
                    <i className={`fa-solid ${detail.icon}`} aria-hidden="true" />
                    <div>
                      <span className="cts-contact__detail-label">{detail.label}</span>
                      <span className="cts-contact__detail-value">{detail.value}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <form className="cts-contact__form" aria-label="Contact Calvin Tech Solutions">
              <div className="cts-form__row">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your full name" required />
              </div>
              <div className="cts-form__row">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="name@company.com" required />
              </div>
              <div className="cts-form__row">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" placeholder="Organization name" />
              </div>
              <div className="cts-form__row">
                <label htmlFor="message">Project Details</label>
                <textarea id="message" name="message" rows="4" placeholder="How can we help?" required />
              </div>
              <button type="submit" className="cts-button cts-button--primary">
                Submit Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="cts-footer">
        <div className="cts-container cts-footer__inner">
          <div>
            <h3>Calvin Tech Solutions</h3>
            <p>Modern technology partners for resilient, growth-minded organizations.</p>
          </div>
          <div className="cts-footer__meta">
            <p>© {new Date().getFullYear()} Calvin Tech Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
