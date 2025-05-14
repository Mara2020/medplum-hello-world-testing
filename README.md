<h1 align="center">Medplum Hello World</h1>
<p align="center">A starter application for using the Medplum platform.</p>
<p align="center">
<a href="https://github.com/medplum/medplum-hello-world/blob/main/LICENSE.txt">
    <img src="https://img.shields.io/badge/license-Apache-blue.svg" />
  </a>
</p>

This example app demonstrates the following:

- Creating a new React app with Vite and TypeScript
- Adding Medplum dependencies
- Adding basic URL routing
- Using the [Medplum client](https://www.medplum.com/docs/sdk/classes/MedplumClient) to search for FHIR resources
- Using [Medplum GraphQL](https://graphiql.medplum.com/) queries to fetch linked resources
- Using [Medplum React Components](https://storybook.medplum.com/?path=/docs/medplum-introduction--docs) to display FHIR data

### Getting Started

If you haven't already done so, follow the instructions in [this tutorial](https://www.medplum.com/docs/tutorials/register) to register a Medplum project to store your data.

[Fork](https://github.com/medplum/medplum-hello-world/fork) and clone the repo.

Next, install the dependencies

```bash
npm install
```

Then, run the app

```bash
npm run dev
```

This app should run on `http://localhost:3000/`

### About Medplum

[Medplum](https://www.medplum.com/) is an open-source, API-first EHR. Medplum makes it easy to build healthcare apps quickly with less code.

Medplum supports self-hosting, and provides a [hosted service](https://app.medplum.com/). Medplum Hello World uses the hosted service as a backend.

- Read our [documentation](https://www.medplum.com/docs)
- Browse our [react component library](https://storybook.medplum.com/)
- Join our [Discord](https://discord.gg/medplum)

# Medplum Hello World Testing

A collection of reusable components for Medplum applications.

## Usage with jsDelivr

You can include this library directly in your HTML using jsDelivr:

```html
<!-- UMD build (for direct browser usage) -->
<script src="https://cdn.jsdelivr.net/gh/Mara2020/medplum-hello-world-testing@latest/dist/medplum-components.umd.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Mara2020/medplum-hello-world-testing@latest/dist/style.css">

<!-- Or use a specific version -->
<script src="https://cdn.jsdelivr.net/gh/Mara2020/medplum-hello-world-testing@1.1.0/dist/medplum-components.umd.js"></script>
```

### Dependencies

When using the UMD build, make sure to include the following dependencies:

```html
<script src="https://cdn.jsdelivr.net/npm/react@18.2.0/umd/react.production.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
<!-- Add other required dependencies -->
```

## Usage with npm

```bash
npm install @Mara2020/medplum-hello-world-testing
```

```javascript
// ESM
import { PatientHistory, PatientOverview } from '@Mara2020/medplum-hello-world-testing';
import '@Mara2020/medplum-hello-world-testing/dist/style.css';

// CommonJS
const { PatientHistory } = require('@Mara2020/medplum-hello-world-testing');
```

## Available Components

- PatientHistory
- PatientOverview
- ThemeToggle
- Timeline
