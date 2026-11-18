export type JobStatus = 'passed' | 'running';

export type Stage = {
  name: string;
  // A running job shows the time it has been running so far.
  jobs: {name: string; status: JobStatus; duration: string}[];
};

// A CI pipeline in progress, drawn after the one of Onec Gradle Plugin: its functional tests run
// on several platform versions. The durations are made up.
export const stages: Stage[] = [
  {name: 'Build', jobs: [{name: 'build', status: 'passed', duration: '48s'}]},
  {
    name: 'Test',
    jobs: [
      {name: '8.3.22', status: 'passed', duration: '2m 10s'},
      {name: '8.3.25', status: 'passed', duration: '2m 04s'},
      {name: '8.3.27', status: 'passed', duration: '2m 15s'},
    ],
  },
  // A push to develop deploys to staging; production takes main.
  {name: 'Deploy', jobs: [{name: 'staging', status: 'running', duration: '31s'}]},
];
