# Fastify Sequelize Template

Typescript template to quickly bootstrap a Fastify Server with Sequelize as ORM. 

## Technical Details

- `fastify-env`: environment management;
- `fastify-swagger` and `fastify-swagger-ui`: OpenAPI specification;
- `json-schema-to-ts`: type definitions from JSON Schemas;
- `sequelize` and `sqlite3`: persistence layer.

## Usage

### Installation

You need `nvm` installed. Currently Node.js is set to `lts/jod` (22.12.0)

```bash
nvm use
npm ci
```

### Testing

Launch `npm run test` to execute tests under the `tests/` folder.

Tests can be written using `node:test-runner`. Tests can also rely on:

- `snapshot-assertion` for snapshot management;
- `@faker/js` for mocking

### CI / CD

Basic Github Action can be found in the `.github/` folder

### Docker

There is a simple `Dockerfile` that builds a container using `tini` and `tsx` to execute the main script.
