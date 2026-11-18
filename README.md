# Onec DevOps

[![Website](https://github.com/onec-devops/onec-devops.github.io/actions/workflows/website.yml/badge.svg?branch=main)](https://github.com/onec-devops/onec-devops.github.io/actions/workflows/website.yml)

Home page for the open-source projects of onec-devops.

Projects publish their own sites on this domain from their repositories, such as the
[Onec Gradle Plugin documentation](https://onec-devops.github.io/onec-gradle-plugin/).

## Development

### Run the site locally

```sh
npm ci
npm start                  # English
npm start -- --locale ru   # Russian
```

### Add a project

Projects are listed in `src/data/projects.tsx`. After adding one, add its texts to the Russian
translation and translate them in `i18n/ru/code.json`:

```sh
npm run write-translations -- --locale ru
```

If the project has a site, add its sitemaps to `static/robots.txt`.

## License

The site is distributed under the [Apache License 2.0](LICENSE).
