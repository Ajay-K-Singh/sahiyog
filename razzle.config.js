const scssplugin = require("./config/scss");

const babelPreset = require("./config/babel");

module.exports = {
    plugins: [
        "eslint",
        "manifest",
        scssplugin
    ],
    modifyBabelOptions: babelPreset
};
