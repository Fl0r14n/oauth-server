# Client

### Development

* Make sure angular-cli is installed: `npm install -g @angular/cli`. You might need sudo for this
* Run `npm i` to install dependencies
* Run `npm start` for a dev server. Navigate to `https://localhost:4200/`. The app will
  automatically reload if you change any of the source files.
* for SSR use `npm run dev:ssr`

### Build

```shell
npm run prod
```

or

```shell
npm run build:ssr
```

for SSR support

### Tests

```shell
npm run test
```

### End-to-end tests

```shell
npm run e2e
```

### Docker build

```shell
docker build -t oauth-server_fe .
```

run:

```shell
docker run -d -p 80:80 oauth-server_fe
```

for testing on bridge mode:

```shell
docker run -d --network="host" oauth-server_fe
```
