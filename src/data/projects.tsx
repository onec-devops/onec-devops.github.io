import type {ReactNode} from 'react';
import Translate from '@docusaurus/Translate';

export type Project = {
  name: string;
  description: ReactNode;
  repositoryUrl: string;
  // A site on this host: Link would open it in a new tab without `target: '_self'`.
  siteUrl?: string;
};

// The other projects' sites are separate Docusaurus sites with the same locales.
export const localePath = (locale: string, defaultLocale: string): string =>
  locale === defaultLocale ? '' : `${locale}/`;

export const getProjects = (localeSegment: string): Project[] => [
  {
    name: 'Onec Gradle Plugin',
    description: (
      <Translate id="projects.onec-gradle-plugin.description">
        Gradle support for 1C:Enterprise development.
      </Translate>
    ),
    repositoryUrl: 'https://github.com/onec-devops/onec-gradle-plugin',
    siteUrl: `https://onec-devops.github.io/onec-gradle-plugin/${localeSegment}`,
  },
  {
    name: 'Onec Docker',
    description: (
      <Translate id="projects.onec-docker.description">
        Lightweight Docker images for 1C:Enterprise 8.3 server, clients and 1C:EDT.
      </Translate>
    ),
    repositoryUrl: 'https://github.com/onec-devops/onec-docker',
  },
];
