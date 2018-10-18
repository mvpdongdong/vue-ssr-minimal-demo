const fs = require('fs');
const path = require('path');
const express = require('express');
const LRU = require('lru-cache');
const microcache = require('route-cache');
const morgan = require('morgan');
const logger = morgan('dev');

const { createBundleRenderer } = require('vue-server-renderer');
const devServer = require('./build/setup-dev-server');
const resolve = (file) => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const app = express();
const port = process.env.PORT || 9003;

const serve = (path, cache) =>
  express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });
app.use('/dist', serve('./dist', true));

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
app.use(microcache.cacheSeconds(1, (req) => useMicroCache && req.originalUrl));

let renderer;
let readyPromise;
const templatePath = resolve('./src/index.template.html');

if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json'); // 将js文件注入到页面中
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  });
} else {
  readyPromise = devServer(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  );
}

app.get('*', function (req, res, next) {
  logger(req, res, function (err) {
    if (err) next(err);
    next();
  });
});

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});

function createRenderer (bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      // for component caching
      cache: LRU({
        max: 1000,
        maxAge: 1000 * 60 * 15
      }),
      basedir: resolve('./dist'),
      // recommended for performance
      runInNewContext: false
    })
  );
}

function render (req, res) {
  res.setHeader('Content-Type', 'text/html');

  const handleError = (err) => {
    if (err.url) {
      res.redirect(err.url);
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found');
    } else {
      res.status(500).send('500 | Internal Server Error~');
      console.log(err);
    }
  };

  const context = {
    title: 'Vue SSR', // default title
    url: req.url
  };
  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err);
    }
    res.send(html);
  });
}
