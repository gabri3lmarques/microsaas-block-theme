import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { title, subtitle, badge, plans } = attributes;

  const blockProps = useBlockProps.save({
    className: 'microsaas-pricing-section',
  });

  return (
    <div {...blockProps}>
      <div className="microsaas-pricing-container">
        <div className="microsaas-pricing-header">
          {badge && (
            <span className="microsaas-section-badge">
              <RichText.Content value={badge} />
            </span>
          )}
          {title && (
            <RichText.Content
              tagName="h2"
              className="microsaas-pricing-title"
              value={title}
            />
          )}
          {subtitle && (
            <RichText.Content
              tagName="p"
              className="microsaas-pricing-subtitle"
              value={subtitle}
            />
          )}
        </div>

        <div className="microsaas-pricing-grid">
          {plans &&
            plans.map((plan, planIdx) => (
              <div
                key={plan.id || planIdx}
                className={`microsaas-price-card ${plan.isFeatured ? 'is-featured' : ''}`}
              >
                {plan.isFeatured && (
                  <div className="microsaas-price-card__popular-tag">
                    <span>{plan.badgeText || 'MAIS POPULAR'}</span>
                  </div>
                )}

                <div className="microsaas-price-card__header">
                  <h3 className="microsaas-price-card__name">
                    <RichText.Content value={plan.name} />
                  </h3>
                  <div className="microsaas-price-card__pricing">
                    <span className="microsaas-price-card__amount">
                      <RichText.Content value={plan.price} />
                    </span>
                    <span className="microsaas-price-card__period">
                      <RichText.Content value={plan.period} />
                    </span>
                  </div>
                  <p className="microsaas-price-card__desc">
                    <RichText.Content value={plan.description} />
                  </p>
                </div>

                <div className="microsaas-price-card__features">
                  <div className="microsaas-price-card__features-title">
                    O QUE ESTÁ INCLUSO:
                  </div>
                  <ul>
                    {plan.features &&
                      plan.features.map((feat, featIdx) => (
                        <li key={featIdx}>
                          <span className="microsaas-check-icon">✓</span>
                          <span>
                            <RichText.Content value={feat} />
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="microsaas-price-card__cta">
                  <a
                    href={plan.buttonUrl || '#'}
                    className={`microsaas-pricing-btn ${
                      plan.isFeatured ? 'is-featured-btn' : ''
                    }`}
                  >
                    <RichText.Content value={plan.buttonText} />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
