import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const organizationUrl = 'https://github.com/onec-devops';
const config: Config = {
  title: 'Onec DevOps',
  tagline: 'Open-source projects for 1C:Enterprise',
  headTags: [
    {
      tagName: 'link',
      attributes: {rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: '/img/favicon.svg'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'icon', type: 'image/png', sizes: '96x96', href: '/img/favicon_96x96.png'},
    },
    {
      tagName: 'link',
      attributes: {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
    },
    {
      tagName: 'script',
      attributes: {type: 'application/ld+json'},
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Onec DevOps',
        alternateName: 'onec-devops.github.io',
        url: 'https://onec-devops.github.io/',
        publisher: {
          '@type': 'Organization',
          name: 'Onec DevOps',
          url: 'https://onec-devops.github.io/',
          logo: 'https://onec-devops.github.io/apple-touch-icon.png',
          sameAs: [organizationUrl],
        },
      }),
    },
  ],

  future: {
    v4: true,
  },

  url: 'https://onec-devops.github.io',
  baseUrl: '/',
  organizationName: 'onec-devops',
  projectName: 'onec-devops.github.io',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru'],
  },

  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    metadata: [
      {property: 'og:site_name', content: 'Onec DevOps'},
      {name: 'google-site-verification', content: '5-91D25BYoEIEzKuLl7CnIBHcdfu2G86v9u8MWMJSho'},
      {name: 'yandex-verification', content: '52a9b7d0bfe81439'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Onec DevOps',
      logo: {
        alt: '',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: organizationUrl,
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          label: 'GitHub',
          href: organizationUrl,
        },
      ],
      copyright: 'Distributed under the Apache License 2.0.',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
