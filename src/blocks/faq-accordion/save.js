import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { title, subtitle, badge, items } = attributes;

  const blockProps = useBlockProps.save({
    className: 'microsaas-faq-section',
  });

  return (
    <div {...blockProps}>
      <div className="microsaas-faq-container">
        <div className="microsaas-faq-header">
          {badge && (
            <span className="microsaas-section-badge">
              <RichText.Content value={badge} />
            </span>
          )}
          {title && (
            <RichText.Content
              tagName="h2"
              className="microsaas-faq-title"
              value={title}
            />
          )}
          {subtitle && (
            <RichText.Content
              tagName="p"
              className="microsaas-faq-subtitle"
              value={subtitle}
            />
          )}
        </div>

        <div className="microsaas-faq-accordion" data-microsaas-accordion="true">
          {items &&
            items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="microsaas-faq-item"
                data-faq-id={item.id || `faq-${idx}`}
              >
                <button
                  type="button"
                  className="microsaas-faq-trigger"
                  aria-expanded="false"
                  aria-controls={`faq-answer-${item.id || idx}`}
                  id={`faq-btn-${item.id || idx}`}
                >
                  <span className="microsaas-faq-question">
                    <RichText.Content value={item.question} />
                  </span>
                  <span className="microsaas-faq-icon" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${item.id || idx}`}
                  className="microsaas-faq-panel"
                  role="region"
                  aria-labelledby={`faq-btn-${item.id || idx}`}
                  hidden
                >
                  <div className="microsaas-faq-answer">
                    <RichText.Content value={item.answer} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
