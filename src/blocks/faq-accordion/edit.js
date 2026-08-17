import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { title, subtitle, badge, items } = attributes;
  const [openIndex, setOpenIndex] = useState(0);

  const blockProps = useBlockProps({
    className: 'microsaas-faq-section',
  });

  const updateItem = (index, key, value) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [key]: value,
    };
    setAttributes({ items: updated });
  };

  const addItem = () => {
    const newItems = [
      ...items,
      {
        id: `faq-${Date.now()}`,
        question: __('Nova Pergunta Frequente?', 'microsaas'),
        answer: __('Escreva a resposta detalhada e objetiva aqui...', 'microsaas'),
      },
    ];
    setAttributes({ items: newItems });
    setOpenIndex(newItems.length - 1);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, idx) => idx !== index);
    setAttributes({ items: updated });
    if (openIndex >= updated.length) {
      setOpenIndex(Math.max(0, updated.length - 1));
    }
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Gerenciar Perguntas', 'microsaas')} initialOpen={true}>
          <Button isPrimary onClick={addItem} style={{ width: '100%', justifyContent: 'center' }}>
            + {__('Adicionar Pergunta', 'microsaas')}
          </Button>
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="microsaas-faq-container">
          <div className="microsaas-faq-header">
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
              className="microsaas-faq-title"
              value={title}
              onChange={(val) => setAttributes({ title: val })}
              placeholder={__('Título do FAQ...', 'microsaas')}
            />

            <RichText
              tagName="p"
              className="microsaas-faq-subtitle"
              value={subtitle}
              onChange={(val) => setAttributes({ subtitle: val })}
              placeholder={__('Subtítulo do FAQ...', 'microsaas')}
            />
          </div>

          <div className="microsaas-faq-accordion">
            {items.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={item.id || idx}
                  className={`microsaas-faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <div
                    className="microsaas-faq-question-row"
                    onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                    role="button"
                    tabIndex={0}
                  >
                    <RichText
                      tagName="h3"
                      className="microsaas-faq-question"
                      value={item.question}
                      onChange={(val) => updateItem(idx, 'question', val)}
                      placeholder={__('Título da pergunta...', 'microsaas')}
                    />

                    <div className="microsaas-faq-controls">
                      <span className="microsaas-faq-chevron">
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="microsaas-faq-remove-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeItem(idx);
                        }}
                        title={__('Excluir pergunta', 'microsaas')}
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="microsaas-faq-answer-wrapper">
                      <RichText
                        tagName="div"
                        className="microsaas-faq-answer"
                        value={item.answer}
                        onChange={(val) => updateItem(idx, 'answer', val)}
                        placeholder={__('Resposta da pergunta...', 'microsaas')}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Button isSecondary onClick={addItem}>
              + {__('Adicionar Pergunta', 'microsaas')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
