module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert'),
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
  });
  config.resolve.fallback = fallback;

  // Minify serially. Terser and cssnano default to one worker per CPU, and
  // os.cpus() reports the host's CPU count -- a container's --cpus quota is
  // invisible to Node. On the 16-core build host that means 15 workers each
  // holding its own AST, inside a container with 2 CPUs to share between them.
  // Serial minification uses 42% less memory and finishes 3.4x faster there.
  if (config.optimization && config.optimization.minimizer) {
    config.optimization.minimizer.forEach((plugin) => {
      if (plugin.options && 'parallel' in plugin.options) {
        plugin.options.parallel = false;
      }
    });
  }

  return config;
};
