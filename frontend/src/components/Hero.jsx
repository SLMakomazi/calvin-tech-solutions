import PropTypes from 'prop-types'

const Hero = ({ content }) => {
  const { welcome, company, headline, subheadline, primaryCta, secondaryCta, stats } = content

  return (
    <section id="home" className="cts-hero">
      <div className="cts-hero__background">
        <div className="cts-hero__accent cts-hero__accent--orb" aria-hidden="true" />
        <div className="cts-hero__accent cts-hero__accent--ring" aria-hidden="true" />
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
