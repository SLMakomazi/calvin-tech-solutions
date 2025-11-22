import PropTypes from 'prop-types'

const Hero = ({ content }) => {
  const { welcome, company, headline, subheadline, primaryCta, secondaryCta, stats } = content

  return (
    <section id="home" className="cts-hero">
      <div className="cts-hero__background">
        {/* Tech Logos Container */}
        <div className="tech-logos-container">
          {/* First 20 Logos */}
          <div className="tech-logo" style={{ '--i': 1 }} title="Kubernetes">☸️</div>
          <div className="tech-logo" style={{ '--i': 2 }} title="VS Code">💻</div>
          <div className="tech-logo" style={{ '--i': 3 }} title="React">⚛️</div>
          <div className="tech-logo" style={{ '--i': 4 }} title="Node.js">⬢</div>
          <div className="tech-logo" style={{ '--i': 5 }} title="Docker">🐳</div>
          <div className="tech-logo" style={{ '--i': 6 }} title="Cloud">☁️</div>
          <div className="tech-logo" style={{ '--i': 7 }} title="Database">💾</div>
          <div className="tech-logo" style={{ '--i': 8 }} title="AI/ML">🤖</div>
          <div className="tech-logo" style={{ '--i': 9 }} title="Web">🌐</div>
          <div className="tech-logo" style={{ '--i': 10 }} title="Mobile">📱</div>
          <div className="tech-logo" style={{ '--i': 11 }} title="Python">🐍</div>
          <div className="tech-logo" style={{ '--i': 12 }} title="Git">🔀</div>
          <div className="tech-logo" style={{ '--i': 13 }} title="JavaScript">📜</div>
          <div className="tech-logo" style={{ '--i': 14 }} title="API">🔌</div>
          <div className="tech-logo" style={{ '--i': 15 }} title="Server">🖥️</div>
          <div className="tech-logo" style={{ '--i': 16 }} title="Blockchain">⛓️</div>
          <div className="tech-logo" style={{ '--i': 17 }} title="DevOps">🔧</div>
          <div className="tech-logo" style={{ '--i': 18 }} title="Security">🔒</div>
          <div className="tech-logo" style={{ '--i': 19 }} title="Analytics">📊</div>
          <div className="tech-logo" style={{ '--i': 20 }} title="Testing">🧪</div>
          
          {/* Additional 20 Logos */}
          <div className="tech-logo" style={{ '--i': 21 }} title="TypeScript">TS</div>
          <div className="tech-logo" style={{ '--i': 22 }} title="GraphQL">GQL</div>
          <div className="tech-logo" style={{ '--i': 23 }} title="REST API">🔄</div>
          <div className="tech-logo" style={{ '--i': 24 }} title="Microservices">🧩</div>
          <div className="tech-logo" style={{ '--i': 25 }} title="AWS">☁️</div>
          <div className="tech-logo" style={{ '--i': 26 }} title="Azure">🔷</div>
          <div className="tech-logo" style={{ '--i': 27 }} title="GCP">GCP</div>
          <div className="tech-logo" style={{ '--i': 28 }} title="Linux">🐧</div>
          <div className="tech-logo" style={{ '--i': 29 }} title="Kubernetes">K8s</div>
          <div className="tech-logo" style={{ '--i': 30 }} title="Terraform">🏗️</div>
          <div className="tech-logo" style={{ '--i': 31 }} title="Ansible">⚙️</div>
          <div className="tech-logo" style={{ '--i': 32 }} title="Jenkins">🎯</div>
          <div className="tech-logo" style={{ '--i': 33 }} title="GitHub Actions">⚡</div>
          <div className="tech-logo" style={{ '--i': 34 }} title="MongoDB">🍃</div>
          <div className="tech-logo" style={{ '--i': 35 }} title="PostgreSQL">🐘</div>
          <div className="tech-logo" style={{ '--i': 36 }} title="Redis">🔴</div>
          <div className="tech-logo" style={{ '--i': 37 }} title="Kafka">🌊</div>
          <div className="tech-logo" style={{ '--i': 38 }} title="Elasticsearch">🔍</div>
          <div className="tech-logo" style={{ '--i': 39 }} title="Docker Compose">📦</div>
          <div className="tech-logo" style={{ '--i': 40 }} title="CI/CD">🔄</div>
        </div>
      </div>
      <div className="cts-container cts-hero__content">
        <div className="cts-hero__badge" aria-label="Welcome badge">
          <span className="cts-hero__badge-dot" /><span>{welcome}</span>
        </div>

        <h1 className="cts-hero__title">
          <span className="cts-hero__title-highlight">{company}</span>
        </h1>

        <h3 className="cts-hero__headline">{headline}</h3>

        <p className="cts-hero__subtitle">{subheadline}</p>

        <div className="cts-hero__actions">
          <a className="cts-button cts-button--primary" href={primaryCta.href}>
            {primaryCta.label}
          </a>
          <a className="cts-button cts-button--outline" href={secondaryCta.href}>
            {secondaryCta.label}
          </a>
        </div>

        <dl className="cts-hero__stats" aria-label="Company performance metrics">
          {stats.map((item) => (
            <div key={item.label} className="cts-hero__stat">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

Hero.propTypes = {
  content: PropTypes.shape({
    welcome: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    subheadline: PropTypes.string.isRequired,
    primaryCta: PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }).isRequired,
    secondaryCta: PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }).isRequired,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
}

export default Hero
