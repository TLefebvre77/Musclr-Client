// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  serverUrl: 'http://localhost:3000/',
  neo4jUrl: 'http://localhost:0080/',
  springBootServerUrl: 'http://localhost:8080/'
  // springBootServerUrl: 'http://192.168.102.112:8080/'
};
