# React Issues client 
## [Github API GraphQL](https://docs.github.com/en/graphql) + React (TypeScript) + [Apollo Client](https://www.apollographql.com/docs/react/) + [Redux Toolkit](https://redux-toolkit.js.org/) + Sass

Hosted on Vercel:  [github-api-graphql-mm.vercel.app](https://github-api-graphql-mm.vercel.app/)

CI/CD workflow with Github Actions (ci.yml) + Vercel deploy configuration.

Provide a valid [Personal Access Token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token) as `REACT_APP_GITHUB_KEY` in a local environmet variable in order to run the APP locally.

## Overall description

### Issues page

This page shows a list of issues from the [Official React Repository](https://github.com/facebook/react/) where they can be filtered by status, open or closed.

<img width="1669" alt="Captura de pantalla 2021-07-30 a las 1 06 40" src="https://user-images.githubusercontent.com/38409133/127577097-797c1a53-eedd-4e35-97b9-5510adf153c2.png">

### Detail page

The full detail as well as all the comments related to the issue selected are shown on this second page.

<img width="1666" alt="Captura de pantalla 2021-07-30 a las 1 07 13" src="https://user-images.githubusercontent.com/38409133/127577812-2458249a-b11b-4eb6-83c5-5bc91876b425.png">

### Search page

This little search lets you look for an specific term between all the issues available, with the option to filter them by status, open or closed.

<img width="1667" alt="Captura de pantalla 2021-07-30 a las 1 08 59" src="https://user-images.githubusercontent.com/38409133/127577909-7e3a44a8-b12d-4301-8d08-79cc91bafe59.png">

It also saves previous search terms in order to list them on a container underneath the main search input.

<img width="1438" alt="Captura de pantalla 2021-07-30 a las 1 28 37" src="https://user-images.githubusercontent.com/38409133/127578160-080a3726-4c01-4d45-bfcf-989738ab2da0.png">


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run fresh:start`

Runs the app in the development mode generating all the types and custom hooks from the schema and operations.

### `npm run build`

### `npm run format`

### `npm run lint`
