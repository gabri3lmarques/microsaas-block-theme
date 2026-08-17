import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, TextControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { title, subtitle, badge, plans } = attributes;

  const blockProps = useBlockProps({
    className: 'microsaas-pricing-section',
  });

  const updatePlan = (index, key, value) => {
    const updatedPlans = [...plans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      [key]: value,
    };
    setAttributes({ plans: updatedPlans });
  };

  const updateFeature = (planIndex, featureIndex, value) => {
    const updatedPlans = [...plans];
    const updatedFeatures = [...updatedPlans[planIndex].features];
    updatedFeatures[featureIndex] = value;
    updatedPlans[planIndex].features = updatedFeatures;
    setAttributes({ plans: updatedPlans });
  };

  const addFeature = (planIndex) => {
    const updatedPlans = [...plans];
    updatedPlans[planIndex].features = [
      ...updatedPlans[planIndex].features,
      __('Novo recurso incluído', 'microsaas'),
    ];
    setAttributes({ plans: updatedPlans });
  };

  const removeFeature = (planIndex, featureIndex) => {
    const updatedPlans = [...plans];
    const updatedFeatures = updatedPlans[planIndex].features.filter((_, idx) => idx !== featureIndex);
    updatedPlans[planIndex].features = updatedFeatures;
    setAttributes({ plans: updatedPlans });
  };

  const toggleFeatured = (planIndex, isFeatured) => {
    const updatedPlans = plans.map((p, idx) => {
      if (idx === planIndex) {
        return {
          ...p,
          isFeatured,
          badgeText: isFeatured ? (p.badgeText || 'MAIS POPULAR') : '',
        };
      }
      return p;
    });
    setAttributes({ plans: updatedPlans });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Configurações dos Planos', 'microsaas')} initialOpen={true}>
          {plans.map((plan, index) => (
            <div
              key={plan.id || index}
              style={{
                marginBottom: 16,
                padding: 12,
                border: '1px solid #CBD5E1',
                borderRadius: 8,
                background: plan.isFeatured ? '#EEF2FF' : '#FFFFFF',
              }}
            >
              <strong>{plan.name || `Plano ${index + 1}`}</strong>
              <ToggleControl
                label={__('Destacar como "Mais Popular"', 'microsaas')}
                checked={!!plan.isFeatured}
                onChange={(val) => toggleFeatured(index, val)}
              />
              {plan.isFeatured && (
                <TextControl
                  label={__('Texto do Badge', 'microsaas')}
                  value={plan.badgeText}
                  onChange={(val) => updatePlan(index, 'badgeText', val)}
                />
              )}
              <TextControl
                label={__('URL do Botão', 'microsaas')}
                value={plan.buttonUrl}
                onChange={(val) => updatePlan(index, 'buttonUrl', val)}
              />
            </div>
          ))}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="microsaas-pricing-container">
          <div className="microsaas-pricing-header">
            {badge && (
              <span className="microsaas-section-badge">
                <RichText
                  tagName="span"
                  value={badge}
                  onChange={(val) => setAttributes({ badge: val })}
                  placeholder={__('Badge da seção...', 'microsaas')}
                />
              </span>
            )}
            <RichText
              tagName="h2"
              className="microsaas-pricing-title"
              value={title}
              onChange={(val) => setAttributes({ title: val })}
              placeholder={__('Título dos Preços...', 'microsaas')}
            />
            <RichText
              tagName="p"
              className="microsaas-pricing-subtitle"
              value={subtitle}
              onChange={(val) => setAttributes({ subtitle: val })}
              placeholder={__('Subtítulo dos Preços...', 'microsaas')}
            />
          </div>

          <div className="microsaas-pricing-grid">
            {plans.map((plan, planIdx) => (
              <div
                key={plan.id || planIdx}
                className={`microsaas-price-card ${plan.isFeatured ? 'is-featured' : ''}`}
              >
                {plan.isFeatured && (
                  <div className="microsaas-price-card__popular-tag">
                    <RichText
                      tagName="span"
                      value={plan.badgeText || 'MAIS POPULAR'}
                      onChange={(val) => updatePlan(planIdx, 'badgeText', val)}
                    />
                  </div>
                )}

                <div className="microsaas-price-card__header">
                  <RichText
                    tagName="h3"
                    className="microsaas-price-card__name"
                    value={plan.name}
                    onChange={(val) => updatePlan(planIdx, 'name', val)}
                    placeholder={__('Nome do Plano', 'microsaas')}
                  />
                  <div className="microsaas-price-card__pricing">
                    <RichText
                      tagName="span"
                      className="microsaas-price-card__amount"
                      value={plan.price}
                      onChange={(val) => updatePlan(planIdx, 'price', val)}
                      placeholder={__('R$ 99', 'microsaas')}
                    />
                    <RichText
                      tagName="span"
                      className="microsaas-price-card__period"
                      value={plan.period}
                      onChange={(val) => updatePlan(planIdx, 'period', val)}
                      placeholder={__('/mês', 'microsaas')}
                    />
                  </div>
                  <RichText
                    tagName="p"
                    className="microsaas-price-card__desc"
                    value={plan.description}
                    onChange={(val) => updatePlan(planIdx, 'description', val)}
                    placeholder={__('Descrição do público do plano...', 'microsaas')}
                  />
                </div>

                <div className="microsaas-price-card__features">
                  <div className="microsaas-price-card__features-title">
                    {__('O QUE ESTÁ INCLUSO:', 'microsaas')}
                  </div>
                  <ul>
                    {plan.features.map((feat, featIdx) => (
                      <li key={featIdx}>
                        <span className="microsaas-check-icon">✓</span>
                        <RichText
                          tagName="span"
                          value={feat}
                          onChange={(val) => updateFeature(planIdx, featIdx, val)}
                          placeholder={__('Recurso...', 'microsaas')}
                        />
                        <button
                          type="button"
                          className="microsaas-remove-feature-btn"
                          onClick={() => removeFeature(planIdx, featIdx)}
                          title={__('Remover recurso', 'microsaas')}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                  <Button
                    isSmall
                    isSecondary
                    onClick={() => addFeature(planIdx)}
                    style={{ marginTop: 8 }}
                  >
                    + {__('Adicionar Recurso', 'microsaas')}
                  </Button>
                </div>

                <div className="microsaas-price-card__cta">
                  <span className={`microsaas-pricing-btn ${plan.isFeatured ? 'is-featured-btn' : ''}`}>
                    <RichText
                      tagName="span"
                      value={plan.buttonText}
                      onChange={(val) => updatePlan(planIdx, 'buttonText', val)}
                      placeholder={__('Texto do Botão', 'microsaas')}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
