import { useBlockProps, RichText } from '@wordpress/block-editor';
import { renderIcon } from './icons';

export default function save({ attributes }) {
  const { title, subtitle, badge, columns, features } = attributes;

  const blockProps = useBlockProps.save({
    className: `microsaas-features-section microsaas-cols-${columns}`,
  });

  return (
    <div {...blockProps}>
      <div className="microsaas-features-container">
        <div className="microsaas-features-header">
          {badge && (
            <span className="microsaas-section-badge">
              <RichText.Content value={badge} />
            </span>
          )}
          {title && (
            <RichText.Content
              tagName="h2"
              className="microsaas-features-title"
              value={title}
            />
          )}
          {subtitle && (
            <RichText.Content
              tagName="p"
              className="microsaas-features-subtitle"
              value={subtitle}
            />
          )}
        </div>

        <div className={`microsaas-features-grid microsaas-grid-${columns}`}>
          {features &&
            features.map((item, idx) => (
              <div key={item.id || idx} className="microsaas-feature-card">
                <div className="microsaas-feature-card__icon">
                  {renderIcon(item.icon)}
                </div>
                <h3 className="microsaas-feature-card__title">
                  <RichText.Content value={item.title} />
                </h3>
                <p className="microsaas-feature-card__desc">
                  <RichText.Content value={item.description} />
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
