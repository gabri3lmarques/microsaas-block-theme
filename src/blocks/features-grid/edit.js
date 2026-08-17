import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, Button } from '@wordpress/components';
import { ICON_OPTIONS, renderIcon } from './icons';

export default function Edit({ attributes, setAttributes }) {
  const { title, subtitle, badge, columns, features } = attributes;

  const blockProps = useBlockProps({
    className: `microsaas-features-section microsaas-cols-${columns}`,
  });

  const updateFeature = (index, key, value) => {
    const updated = [...features];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setAttributes({ features: updated });
  };

  const addFeature = () => {
    setAttributes({
      features: [
        ...features,
        {
          id: `f-${Date.now()}`,
          icon: 'zap',
          title: __('Novo Recurso Incrível', 'microsaas'),
          description: __('Descrição concisa explicando o benefício para o cliente.', 'microsaas'),
        },
      ],
    });
  };

  const removeFeature = (index) => {
    const updated = features.filter((_, idx) => idx !== index);
    setAttributes({ features: updated });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Layout do Grid', 'microsaas')} initialOpen={true}>
          <RangeControl
            label={__('Colunas no Desktop', 'microsaas')}
            value={columns}
            onChange={(val) => setAttributes({ columns: val })}
            min={2}
            max={4}
          />
        </PanelBody>

        <PanelBody title={__('Ícones dos Recursos', 'microsaas')} initialOpen={false}>
          {features.map((item, idx) => (
            <SelectControl
              key={item.id || idx}
              label={`${__('Ícone Item', 'microsaas')} ${idx + 1}: ${item.title || ''}`}
              value={item.icon || 'zap'}
              options={ICON_OPTIONS}
              onChange={(val) => updateFeature(idx, 'icon', val)}
            />
          ))}
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="microsaas-features-container">
          <div className="microsaas-features-header">
            {badge && (
              <span className="microsaas-section-badge">
                <RichText
                  tagName="span"
                  value={badge}
                  onChange={(val) => setAttributes({ badge: val })}
                  placeholder={__('Badge...', 'microsaas')}
                />
              </span>
            )}

            <RichText
              tagName="h2"
              className="microsaas-features-title"
              value={title}
              onChange={(val) => setAttributes({ title: val })}
              placeholder={__('Título das Funcionalidades...', 'microsaas')}
            />

            <RichText
              tagName="p"
              className="microsaas-features-subtitle"
              value={subtitle}
              onChange={(val) => setAttributes({ subtitle: val })}
              placeholder={__('Subtítulo explicativo...', 'microsaas')}
            />
          </div>

          <div className={`microsaas-features-grid microsaas-grid-${columns}`}>
            {features.map((item, idx) => (
              <div key={item.id || idx} className="microsaas-feature-card">
                <div className="microsaas-feature-card__top">
                  <div className="microsaas-feature-card__icon">
                    {renderIcon(item.icon)}
                  </div>
                  <button
                    type="button"
                    className="microsaas-remove-feature-card-btn"
                    onClick={() => removeFeature(idx)}
                    title={__('Remover este item', 'microsaas')}
                  >
                    ×
                  </button>
                </div>

                <RichText
                  tagName="h3"
                  className="microsaas-feature-card__title"
                  value={item.title}
                  onChange={(val) => updateFeature(idx, 'title', val)}
                  placeholder={__('Título do Recurso', 'microsaas')}
                />

                <RichText
                  tagName="p"
                  className="microsaas-feature-card__desc"
                  value={item.description}
                  onChange={(val) => updateFeature(idx, 'description', val)}
                  placeholder={__('Descrição do recurso...', 'microsaas')}
                />

                <div style={{ marginTop: 12 }}>
                  <SelectControl
                    label=""
                    value={item.icon || 'zap'}
                    options={ICON_OPTIONS}
                    onChange={(val) => updateFeature(idx, 'icon', val)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Button isPrimary onClick={addFeature}>
              + {__('Adicionar Nova Funcionalidade', 'microsaas')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
