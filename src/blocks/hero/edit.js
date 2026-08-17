import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  RichText,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  TextControl,
  ToggleControl,
  Button,
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
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

  const blockProps = useBlockProps({
    className: `microsaas-hero microsaas-hero--${layout}`,
  });

  const onSelectImage = (media) => {
    setAttributes({
      imageUrl: media.url,
      imageAlt: media.alt || 'Mockup do SaaS',
    });
  };

  const onRemoveImage = () => {
    setAttributes({ imageUrl: '', imageAlt: '' });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Configurações de Layout', 'microsaas')} initialOpen={true}>
          <SelectControl
            label={__('Estilo de Layout', 'microsaas')}
            value={layout}
            options={[
              { label: __('Dividido (Texto à Esquerda, Imagem à Direita)', 'microsaas'), value: 'split-right' },
              { label: __('Dividido (Imagem à Esquerda, Texto à Direita)', 'microsaas'), value: 'split-left' },
              { label: __('Centralizado (Texto no Centro, Imagem Abaixo)', 'microsaas'), value: 'centered' },
            ]}
            onChange={(val) => setAttributes({ layout: val })}
          />
        </PanelBody>

        <PanelBody title={__('Badge Promocional / Destaque', 'microsaas')} initialOpen={false}>
          <ToggleControl
            label={__('Exibir Badge', 'microsaas')}
            checked={showBadge}
            onChange={(val) => setAttributes({ showBadge: val })}
          />
          {showBadge && (
            <TextControl
              label={__('Texto do Badge', 'microsaas')}
              value={badgeText}
              onChange={(val) => setAttributes({ badgeText: val })}
            />
          )}
        </PanelBody>

        <PanelBody title={__('Botões de Ação (CTAs)', 'microsaas')} initialOpen={false}>
          <TextControl
            label={__('Texto do Botão Primário', 'microsaas')}
            value={primaryBtnText}
            onChange={(val) => setAttributes({ primaryBtnText: val })}
          />
          <TextControl
            label={__('URL do Botão Primário', 'microsaas')}
            value={primaryBtnUrl}
            onChange={(val) => setAttributes({ primaryBtnUrl: val })}
          />
          <TextControl
            label={__('Texto do Botão Secundário', 'microsaas')}
            value={secondaryBtnText}
            onChange={(val) => setAttributes({ secondaryBtnText: val })}
          />
          <TextControl
            label={__('URL do Botão Secundário', 'microsaas')}
            value={secondaryBtnUrl}
            onChange={(val) => setAttributes({ secondaryBtnUrl: val })}
          />
        </PanelBody>

        <PanelBody title={__('Imagem / Mockup do Produto', 'microsaas')} initialOpen={false}>
          <MediaUploadCheck>
            <MediaUpload
              onSelect={onSelectImage}
              allowedTypes={['image']}
              value={imageUrl}
              render={({ open }) => (
                <div>
                  {imageUrl ? (
                    <div>
                      <img src={imageUrl} alt={imageAlt} style={{ maxWidth: '100%', borderRadius: 8, marginBottom: 8 }} />
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Button isSecondary onClick={open}>
                          {__('Trocar Imagem', 'microsaas')}
                        </Button>
                        <Button isDestructive onClick={onRemoveImage}>
                          {__('Remover', 'microsaas')}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button isPrimary onClick={open}>
                      {__('Enviar Imagem/Mockup', 'microsaas')}
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
          <TextControl
            label={__('Ou Cole a URL da Imagem', 'microsaas')}
            value={imageUrl}
            onChange={(val) => setAttributes({ imageUrl: val })}
            placeholder="https://exemplo.com/mockup.png"
            style={{ marginTop: 12 }}
          />
          <TextControl
            label={__('Texto Alternativo (Alt)', 'microsaas')}
            value={imageAlt}
            onChange={(val) => setAttributes({ imageAlt: val })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="microsaas-hero__container">
          <div className="microsaas-hero__content">
            {showBadge && (
              <div className="microsaas-hero__badge-wrapper">
                <span className="microsaas-hero__badge">
                  <RichText
                    tagName="span"
                    value={badgeText}
                    onChange={(val) => setAttributes({ badgeText: val })}
                    placeholder={__('Digite o texto do badge...', 'microsaas')}
                  />
                </span>
              </div>
            )}

            <RichText
              tagName="h1"
              className="microsaas-hero__title"
              value={title}
              onChange={(val) => setAttributes({ title: val })}
              placeholder={__('Título de Alto Impacto...', 'microsaas')}
            />

            <RichText
              tagName="p"
              className="microsaas-hero__subtitle"
              value={subtitle}
              onChange={(val) => setAttributes({ subtitle: val })}
              placeholder={__('Subtítulo explicativo com proposta de valor clara...', 'microsaas')}
            />

            <div className="microsaas-hero__actions">
              <span className="microsaas-btn microsaas-btn--primary">
                <RichText
                  tagName="span"
                  value={primaryBtnText}
                  onChange={(val) => setAttributes({ primaryBtnText: val })}
                  placeholder={__('CTA Primário', 'microsaas')}
                />
              </span>
              <span className="microsaas-btn microsaas-btn--secondary">
                <RichText
                  tagName="span"
                  value={secondaryBtnText}
                  onChange={(val) => setAttributes({ secondaryBtnText: val })}
                  placeholder={__('CTA Secundário', 'microsaas')}
                />
              </span>
            </div>

            <RichText
              tagName="div"
              className="microsaas-hero__subtext"
              value={subtext}
              onChange={(val) => setAttributes({ subtext: val })}
              placeholder={__('Garantias e micro-provas de valor...', 'microsaas')}
            />
          </div>

          <div className="microsaas-hero__media">
            {imageUrl ? (
              <div className="microsaas-hero__mockup-wrapper">
                <img src={imageUrl} alt={imageAlt} className="microsaas-hero__image" />
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
    </>
  );
}
