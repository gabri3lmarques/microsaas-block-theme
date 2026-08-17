import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    title,
    subtitle,
    badgeText,
    showBadge,
    primaryBtnText,
    primaryBtnUrl,
    secondaryBtnText,
    secondaryBtnUrl,
    layout,
    imageUrl,
    imageAlt,
    subtext,
  } = attributes;

  const blockProps = useBlockProps.save({
    className: `microsaas-hero microsaas-hero--${layout}`,
  });

  return (
    <div {...blockProps}>
      <div className="microsaas-hero__container">
        <div className="microsaas-hero__content">
          {showBadge && badgeText && (
            <div className="microsaas-hero__badge-wrapper">
              <span className="microsaas-hero__badge">
                <RichText.Content value={badgeText} />
              </span>
            </div>
          )}

          {title && (
            <RichText.Content
              tagName="h1"
              className="microsaas-hero__title"
              value={title}
            />
          )}

          {subtitle && (
            <RichText.Content
              tagName="p"
              className="microsaas-hero__subtitle"
              value={subtitle}
            />
          )}

          <div className="microsaas-hero__actions">
            {primaryBtnText && (
              <a
                href={primaryBtnUrl || '#'}
                className="microsaas-btn microsaas-btn--primary"
              >
                <RichText.Content value={primaryBtnText} />
              </a>
            )}

            {secondaryBtnText && (
              <a
                href={secondaryBtnUrl || '#'}
                className="microsaas-btn microsaas-btn--secondary"
              >
                <RichText.Content value={secondaryBtnText} />
              </a>
            )}
          </div>

          {subtext && (
            <div className="microsaas-hero__subtext">
              <RichText.Content value={subtext} />
            </div>
          )}
        </div>

        <div className="microsaas-hero__media">
          {imageUrl ? (
            <div className="microsaas-hero__mockup-wrapper">
              <img
                src={imageUrl}
                alt={imageAlt || 'Mockup do SaaS'}
                className="microsaas-hero__image"
                loading="eager"
              />
            </div>
          ) : (
            <div className="microsaas-hero__mockup-placeholder">
              <div className="microsaas-mockup-window">
                <div className="microsaas-mockup-header">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                  <div className="microsaas-mockup-url">app.microsaas.io/dashboard</div>
                </div>
                <div className="microsaas-mockup-body">
                  <div className="mock-grid">
                    <div className="mock-card mock-stat">
                      <div className="mock-label">Receita Recorrente (MRR)</div>
                      <div className="mock-val">R$ 28.450,00</div>
                      <div className="mock-growth">+24.8% este mês 🚀</div>
                    </div>
                    <div className="mock-card mock-stat">
                      <div className="mock-label">Usuários Ativos</div>
                      <div className="mock-val">1.420</div>
                      <div className="mock-growth">+18% novos usuários</div>
                    </div>
                  </div>
                  <div className="mock-chart-preview">
                    <div className="mock-chart-bar" style={{ height: '40%' }}></div>
                    <div className="mock-chart-bar" style={{ height: '65%' }}></div>
                    <div className="mock-chart-bar" style={{ height: '55%' }}></div>
                    <div className="mock-chart-bar" style={{ height: '80%' }}></div>
                    <div className="mock-chart-bar" style={{ height: '70%' }}></div>
                    <div className="mock-chart-bar" style={{ height: '95%' }}></div>
                    <div className="mock-chart-bar active" style={{ height: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
