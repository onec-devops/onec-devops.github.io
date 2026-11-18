import type {ReactNode} from 'react';
import Translate from '@docusaurus/Translate';

export type Value = {
  id: string;
  title: ReactNode;
  description: ReactNode;
  // A line icon in a 24×24 grid, drawn with the current text color.
  icon: ReactNode;
};

export const values: Value[] = [
  {
    id: 'openness',
    title: <Translate id="values.openness.title">Openness</Translate>,
    description: (
      <Translate id="values.openness.description">
        Knowledge is most valuable when it&apos;s shared. Open access to ideas lets anyone
        learn, question and build something new.
      </Translate>
    ),
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
      </>
    ),
  },
  {
    id: 'collaboration',
    title: <Translate id="values.collaboration.title">Collaboration</Translate>,
    description: (
      <Translate id="values.collaboration.description">
        The best solutions emerge where different perspectives and experience meet. Together we
        can achieve what no one can alone.
      </Translate>
    ),
    icon: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M16.5 14.1c2.6.5 4.5 2.9 4.5 5.9" />
      </>
    ),
  },
  {
    id: 'excellence',
    title: <Translate id="values.excellence.title">Excellence</Translate>,
    description: (
      <Translate id="values.excellence.description">
        Good is just the starting point. Quality comes from attention to detail and a
        willingness to keep improving.
      </Translate>
    ),
    icon: (
      <>
        <path d="m3 17 6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </>
    ),
  },
  {
    id: 'innovation',
    title: <Translate id="values.innovation.title">Innovation</Translate>,
    description: (
      <Translate id="values.innovation.description">
        Keeping up isn&apos;t enough - we aim to stay ahead. Today&apos;s bold ideas are
        tomorrow&apos;s standards.
      </Translate>
    ),
    icon: (
      <>
        <path d="M9 18h6M10 21h4" />
        <path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8v.3h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" />
      </>
    ),
  },
];
