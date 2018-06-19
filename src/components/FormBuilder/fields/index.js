const files = require.context(".", false, /\.vue$/);
const modules = {};

files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.vue)/g, "")] = files(key).default;
});

module.exports = modules;
