import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import {createProxyMiddleware} from 'http-proxy-middleware';
import {SERVER_HOST, SERVER_PATH} from 'ngx-oauth';

const sendSeekable = require('send-seekable');

// allow insecure connections for https://localhost. Remove in prod
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// import proxy.conf.js
const PROXY_CONFIG = require('./proxy.conf');

const detectBot = (userAgent: string): boolean => {
  if (!userAgent) {
    return false;
  }
  // See more at https://user-agents.net/bots
  // or https://github.com/monperrus/crawler-user-agents/blob/master/crawler-user-agents.json
  const bots = [
    'wget', 'Wget',
    'Googlebot', 'Googlebot-Mobile', 'Google-Site-Verification', 'lighthouse',
    'Slurp', 'Y!J', 'Yahoo Link Preview',
    'bingbot', 'BingPreview',
    'DuckDuckBot', 'DuckDuckGo-Favicons-Bot',
    'YandexBot', 'YandexMobileBot', 'YandexFavicons', 'YandexMobileScreenShotBot',
    'msnbot', 'Baiduspider', 'Facebot', 'facebookexternalhit',
    'Applebot', 'redditbot', 'Slackbot',
    'Twitterbot', 'WhatsApp', 'SkypeUriPreview', 'pinterest.com.bot'
  ];

  const agent: string = userAgent.toLowerCase();
  for (const bot of bots) {
    if (agent.indexOf(bot.toLowerCase()) > -1) {
      console.log('BOT DETECTED: ' + bot);
      return true;
    }
  }
  return false;
};

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/client/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // add proxy config if any
  for (const pConfig of PROXY_CONFIG) {
    const {context, target, secure, changeOrigin} = pConfig;
    if (context && context.length > 0) {
      server.use(context, createProxyMiddleware({
        target,
        secure,
        changeOrigin,
        selfHandleResponse: true,
        onProxyRes: (proxyRes, req, res) => {
          // @ts-ignore
          if (req.get('range')) {
            let buffer = Buffer.from('');
            proxyRes.on('data', chunk => buffer = Buffer.concat([buffer, chunk]));
            proxyRes.on('end', () => {
              const {headers, statusCode} = proxyRes;
              // @ts-ignore
              return res.status(statusCode).set(headers).sendSeekable(buffer);
            });
          } else {
            const {headers, statusCode} = proxyRes;
            delete headers['content-security-policy'];
            // @ts-ignore
            return proxyRes.pipe(res.status(statusCode).set(headers));
          }
        }
      }));
    }
  }

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    const isBot = detectBot(req.get('user-agent') || '');
    if (isBot) {
      res.render(indexHtml, {
        req, providers: [
          {
            provide: APP_BASE_HREF,
            useValue: req.baseUrl
          },
          {
            provide: SERVER_HOST,
            useValue: `${req.protocol}://${req.headers.host}`
          },
          {
            provide: SERVER_PATH,
            useValue: req.url
          }
        ]
      });
    } else {
      res.sendFile(join(distFolder, 'index.html'));
    }
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
