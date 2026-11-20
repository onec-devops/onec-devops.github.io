import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import {getProjects, localePath} from '@site/src/data/projects';
import {values} from '@site/src/data/values';
import {stages} from '@site/src/data/pipeline';
import {headlineWords} from '@site/src/data/headline';

import styles from './index.module.css';

// A terminal line: the time, the text and, like the right prompt of zsh or starship, the context
// at the right edge.
function Line({
  time,
  right,
  children,
}: {
  time: string;
  right?: ReactNode;
  children: ReactNode;
}): ReactNode {
  return (
    <div className={styles.line}>
      <span className={styles.time}>{time}</span>
      <span className={styles.lineText}>{children}</span>
      <span className={styles.rightPrompt}>{right}</span>
    </div>
  );
}

// A line of command output, drawn as a bar under the text column.
function Output({width}: {width: string}): ReactNode {
  return (
    <div className={styles.line}>
      <span className={styles.outputBar} style={{width}} />
    </div>
  );
}

// Types the words in turn; with reduced motion, shows the first one.
function Rotator({words}: {words: string[]}): ReactNode {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (!animated) {
      return undefined;
    }
    const word = words[index];
    let delay = deleting ? 45 : 90;
    if (!deleting && length === word.length) {
      delay = 2200;
    } else if (deleting && length === 0) {
      delay = 300;
    }
    const timer = window.setTimeout(() => {
      if (!deleting && length === word.length) {
        setDeleting(true);
      } else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else {
        setLength(length + (deleting ? -1 : 1));
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [animated, deleting, index, length, words]);

  // Static HTML holds the word once, for crawlers and titles.
  if (!animated) {
    return <span className={styles.rotator}>{words[0]}</span>;
  }

  return (
    <span className={styles.rotator}>
      {/* Read once, not every keystroke. */}
      <span className={styles.visuallyHidden}>{words[0]}</span>
      {/* Typed text lives in CSS, out of the indexed text. */}
      <span aria-hidden="true" className={styles.typed} data-text={words[index].slice(0, length)}>
        <span className={styles.caret} />
      </span>
    </span>
  );
}

function Example(): ReactNode {
  return (
    <div className={styles.examplePanel} aria-hidden="true">
      {/* Dev: a push from the terminal starts the pipeline in front of it. */}
      <div className={clsx(styles.window, styles.terminal)}>
        <div className={styles.windowBar}>
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          terminal
        </div>
        <div className={styles.terminalBody}>
          <Line time="10:42:07" right="develop ↑1">
            <span className={styles.prompt}>$</span> <span className={styles.command}>./gradlew</span> build
          </Line>
          <Output width="13ch" />
          <Output width="9ch" />
          <Line time="10:42:21">
            <span className={styles.success}>BUILD SUCCESSFUL</span> in 14s
          </Line>
          <Output width="16ch" />
          <Line time="10:42:25" right="develop ↑1">
            <span className={styles.prompt}>$</span> <span className={styles.command}>git</span> push
          </Line>
          {/* Hidden behind the pipeline window. */}
          <Output width="18ch" />
          <Output width="11ch" />
        </div>
      </div>
      {/* Ops. */}
      <div className={clsx(styles.window, styles.pipelineWindow)}>
        <div className={styles.windowBar}>
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          workflow
        </div>
        <div className={styles.windowBody}>
          <div className={styles.trigger}>on: push</div>
          <ol className={styles.pipeline}>
            {stages.map((stage) => (
              <li key={stage.name} className={styles.stage}>
                <div className={styles.stageName}>{stage.name}</div>
                <ul className={styles.jobs}>
                  {stage.jobs.map((job) => (
                    <li key={job.name} className={clsx(styles.job, styles[job.status])}>
                      {job.status === 'passed' ? (
                        <svg className={styles.jobIcon} viewBox="0 0 16 16">
                          <circle cx="8" cy="8" r="8" />
                          <path d="M4.75 8.25 7 10.5l4.25-4.75" />
                        </svg>
                      ) : (
                        <span className={styles.jobIcon} />
                      )}
                      <span className={styles.jobName}>{job.name}</span>
                      <span className={styles.jobDuration}>{job.duration}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {i18n} = useDocusaurusContext();
  const localeSegment = localePath(i18n.currentLocale, i18n.defaultLocale);
  const projects = getProjects(localeSegment);
  const tagline = translate({
    id: 'homepage.tagline',
    message: 'Open-source projects for 1C:Enterprise',
  });
  return (
    <Layout title={tagline} description={tagline}>
      <header className={styles.hero}>
        <div className={clsx('container', styles.heroContent)}>
          <div className={styles.heroText}>
            <Heading as="h1" className={styles.title}>
              <Translate
                id="homepage.headline"
                values={{
                  word: <Rotator words={headlineWords} />,
                  platform: (
                    <span className={styles.accent}>
                      {translate({id: 'homepage.headline.platform', message: '1C'})}
                    </span>
                  ),
                }}>
                {'{word} development on {platform}'}
              </Translate>
            </Heading>
            <p className={styles.mission}>
              <Translate id="homepage.mission">
                Everyone working with 1C:Enterprise deserves the same opportunities as on any other
                platform. We bring together people, tools and practices to make modern
                1C:Enterprise development accessible to every team.
              </Translate>
            </p>
            <p className={styles.mission}>
              <Translate
                id="homepage.community"
                values={{
                  community: (
                    <Link to="https://github.com/onec-devops">
                      {translate({id: 'homepage.community.link', message: 'open community'})}
                    </Link>
                  ),
                }}>
                {
                  "Onec DevOps is an {community}, and we'd love for you to join."
                }
              </Translate>
            </p>
          </div>
          <Example />
        </div>
      </header>
      <section className={styles.valuesBand}>
        <div className="container">
          <div className={styles.valuesHeader}>
            <Heading as="h2" className={styles.valuesTitle}>
              <Translate id="values.title">Our values</Translate>
            </Heading>
            <p className={styles.valuesLead}>
              <Translate id="values.lead">Everything we do is built on them.</Translate>
            </p>
          </div>
          <div className={styles.values}>
            {values.map((value) => (
              <div key={value.id} className={styles.value}>
                <div className={styles.valueIcon}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {value.icon}
                  </svg>
                </div>
                <Heading as="h3" className={styles.valueTitle}>
                  {value.title}
                </Heading>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <main className={clsx('container', styles.main)}>
        <Heading as="h2">
          <Translate id="projects.title">Projects</Translate>
        </Heading>
        <div className={styles.projects}>
          {projects.map((project) => (
            <section key={project.name} className={styles.project}>
              <Heading as="h3">
                <Link className={styles.projectLink} to={project.repositoryUrl}>
                  {project.name}
                </Link>
              </Heading>
              <p>{project.description}</p>
              {project.siteUrl && (
                <p className={styles.links}>
                  <Link className={styles.secondaryLink} to={project.siteUrl} target="_self">
                    <Translate id="projects.documentation">Documentation</Translate>
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>
      </main>
    </Layout>
  );
}
