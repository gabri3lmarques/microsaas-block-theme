# 🚀 Guia de Uso e Ativação do Tema "Microsaas" (WordPress FSE)

Bem-vindo ao **Microsaas**, um tema de blocos (Full Site Editing - FSE) para WordPress desenvolvido especificamente para Startups, Produtos Digitais e Micro-SaaS que buscam alto desempenho, estética moderna e foco total em conversão.

---

## 📁 1. Estrutura do Tema

```text
wp-content/themes/microsaas/
├── assets/
│   └── css/global.css          # Animações suaves e estilos globais
├── build/                      # Blocos compilados prontos para produção
│   └── blocks/
│       ├── hero/
│       ├── pricing-table/
│       ├── features-grid/
│       └── faq-accordion/
├── parts/                      # Partes de Templates reutilizáveis
│   ├── header.html             # Topbar com Logo, Navegação e CTA
│   └── footer.html             # Rodapé moderno de 4 colunas
├── patterns/                   # Padrões de Blocos (Block Patterns)
│   ├── cta-banner.php          # Banner de conversão de largura total
│   ├── faq-section.php         # Seção de FAQ pronta
│   ├── features-section.php    # Grid de recursos com ícones
│   ├── hero-default.php        # Hero Section pré-configurada
│   ├── landing-page-completa.php # Página inteira pronta para uso
│   ├── logos-social-proof.php  # Barra de logos / Prova social
│   ├── pricing-section.php     # Tabela de planos e preços
│   └── testimonials-section.php # Depoimentos de clientes
├── src/
│   └── blocks/                 # Código fonte React dos blocos customizados
│       ├── faq-accordion/
│       ├── features-grid/
│       ├── hero/
│       └── pricing-table/
├── templates/                  # Templates Full Site Editing
│   ├── 404.html                # Página de erro 404
│   ├── archive.html            # Listagem de arquivos/categorias
│   ├── front-page.html         # Página inicial com a Landing Page
│   ├── index.html              # Fallback com grade de posts do blog
│   ├── page.html               # Modelo para páginas estáticas
│   └── single.html             # Modelo para posts individuais
├── functions.php               # Registro de suportes, blocos e categorias
├── index.php                   # Fallback padrão do WordPress
├── package.json                # Configurações de scripts com @wordpress/scripts
├── style.css                   # Cabeçalho de identificação do tema FSE
└── theme.json                  # Design System, Paleta de Cores, Tipografia e Espaçamentos
```

---

## 🛠️ 2. Como Compilar os Blocos Customizados

Os blocos customizados em React já foram compilados e estão prontos na pasta `build/`. Caso você faça alterações no código fonte (`src/blocks/`), use os comandos abaixo:

1. Acesse o diretório do tema no terminal:
   ```bash
   cd wp-content/themes/microsaas
   ```

2. Instale as dependências (se ainda não tiver instalado):
   ```bash
   npm install
   ```

3. Para desenvolvimento com recarregamento contínuo:
   ```bash
   npm run start
   ```

4. Para compilar a versão final de produção:
   ```bash
   npm run build
   ```

---

## ⚙️ 3. Como Ativar o Tema no WordPress

1. Acesse o Painel Administrativo do WordPress:
   `http://localhost:8000/wp1/wp-admin/`
2. Vá no menu lateral em **Aparência > Temas** (`Appearance > Themes`).
3. Localize o tema **Microsaas** e clique em **Ativar** (`Activate`).

---

## 🎨 4. Como Customizar no Site Editor (Full Site Editing)

1. Acesse **Aparência > Editor** (`Appearance > Editor`).
2. **Personalizar Páginas e Templates**:
   - Clique em **Modelos (Templates)** para editar a **Página Inicial (Front Page)**, **Páginas**, **Posts (Single)** ou o **404**.
   - Você pode reorganizar ou adicionar novos blocos com a flexibilidade visual do Gutenberg.
3. **Personalizar Cabeçalho e Rodapé**:
   - Vá em **Partes do Modelo (Patterns / Template Parts)** e selecione `Header` ou `Footer`.
4. **Inserir Padrões Prontos (Block Patterns)**:
   - Ao editar qualquer página ou post, clique no botão `+` (Inserir bloco) no canto superior esquerdo.
   - Acesse a aba **Padrões (Patterns)** e selecione a categoria **Microsaas - Componentes** ou **Microsaas - Páginas Completas**.
   - Escolha o padrão desejado (ex: *Landing Page Completa*, *Hero SaaS*, *Tabela de Preços*, etc.) para inseri-lo com 1 clique.

---

## 🧩 5. Blocos Customizados Disponíveis

| Bloco | Nome Gutenberg | Descrição |
| :--- | :--- | :--- |
| **Hero Section** | `microsaas/hero` | Título dinâmico, subtítulo, 2 CTAs, badge promocional e mockup moderno do produto com layouts flexíveis (dividido ou centralizado). |
| **Tabela de Preços** | `microsaas/pricing-table` | Tabela com 3 planos, destaque visual para o plano mais popular, lista de benefícios e botões de ação. |
| **Grid de Funcionalidades** | `microsaas/features-grid` | Grade de 2 a 4 colunas com ícones SVG modernos integrados (Performance, Nuvem, Segurança, API, etc.). |
| **Accordion de FAQ** | `microsaas/faq-accordion` | Tira-dúvidas com expansão fluida em JavaScript, acessibilidade ARIA e animações suaves. |

---

## ⚡ 6. Otimizações e Boas Práticas

- **Carregamento Condicional**: Os scripts e estilos de cada bloco só são carregados nas páginas em que o bloco é efetivamente utilizado.
- **Zero Dependências Pesadas no Front-end**: O Accordion e as micro-interações utilizam JavaScript nativo leve e rápido.
- **Tipografia Fluida e Design Tokens**: Tudo controlado de forma centralizada pelo `theme.json`, garantindo consistência visual em qualquer resolução de tela.
