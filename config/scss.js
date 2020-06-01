const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("razzle/config/paths");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const autoprefixer = require("autoprefixer");
const PostCssFlexBugFixes = require("postcss-flexbugs-fixes");
const tailwindcss = require("tailwindcss");

const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const params = {
  regex: /[\w-/:]+(?<!:)/g
};

const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./src/**/*.js"],
  // classes injected by libraries
  whitelist: [
    /** nuka-carousel */
    "slider-list",
    "slider-slide",
    "slider-frame",
    "paging-item",
    /** map-my-india */
    "leaflet-popup",
    "leaflet-popup-pane",
    "map-control"
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(params.regex) || []
});

const defaultOptions = {
  postcss: {
    dev: {
      sourceMap: true,
      ident: "postcss"
    },
    prod: {
      sourceMap: false,
      ident: "postcss"
    }
  },
  sass: {
    dev: {
      sourceMap: true,
      includePaths: [paths.appNodeModules]
    },
    prod: {
      // XXX Source maps are required for the resolve-url-loader to properly
      // function. Disable them in later stages if you do not want source maps.
      sourceMap: true,
      sourceMapContents: false,
      includePaths: [paths.appNodeModules]
    }
  },
  css: {
    dev: {
      sourceMap: true,
      importLoaders: 1,
      modules: false
    },
    prod: {
      sourceMap: false,
      importLoaders: 1,
      modules: false,
      minimize: true
    }
  },
  cssModules: {
    dev: {
      sourceMap: true,
      importLoaders: 2,
      localIdentName: "[path]__[name]___[local]",
      modules: true
    },
    prod: {
      sourceMap: false,
      importLoaders: 2,
      modules: {
        getLocalIdent: getCSSModuleLocalIdent
      },
      minimize: true
    }
  },
  style: {},
  resolveUrl: {
    dev: {},
    prod: {}
  }
};

module.exports = (defaultConfig, { target, dev }) => {
  const isServer = target !== "web";
  const constantEnv = dev ? "dev" : "prod";

  const config = Object.assign({}, defaultConfig);
  const options = Object.assign({}, defaultOptions);

  const styleLoader = {
    loader: require.resolve("style-loader"),
    options: options.style
  };

  const cssLoader = {
    loader: require.resolve("css-loader"),
    options: options.css[constantEnv]
  };

  const cssModuleLoader = {
    loader: require.resolve("css-loader"),
    options: options.cssModules[constantEnv]
  };

  const resolveUrlLoader = {
    loader: require.resolve("resolve-url-loader"),
    options: options.resolveUrl[constantEnv]
  };

  const postCssLoader = {
    loader: require.resolve("postcss-loader"),
    options: Object.assign({}, options.postcss[constantEnv], {
      plugins: () => {
        return [
          tailwindcss,
          PostCssFlexBugFixes,
          autoprefixer({
            flexbox: "no-2009"
          }),
          !dev && purgecss
        ].filter(Boolean);
      }
    })
  };

  const sassLoader = {
    loader: require.resolve("sass-loader"),
    options: options.sass[constantEnv]
  };

  config.module.rules.push(
    {
      test: sassRegex,
      exclude: [paths.appBuild, sassModuleRegex],
      use: isServer
        ? [
          {
            loader: require.resolve("css-loader"),
            options: Object.assign({}, options.css[constantEnv], {
              onlyLocals: true
            })
          },
          resolveUrlLoader,
          postCssLoader,
          sassLoader
        ]
        : [
          dev ? styleLoader : MiniCssExtractPlugin.loader,
          cssLoader,
          postCssLoader,
          resolveUrlLoader,
          sassLoader
        ]
    },
    {
      test: sassModuleRegex,
      exclude: [paths.appBuild],
      use: isServer
        ? [
          {
            loader: require.resolve("css-loader"),
            options: Object.assign({}, options.cssModules[constantEnv], {
              onlyLocals: true
            })
          },
          resolveUrlLoader,
          postCssLoader,
          sassLoader
        ]
        : [
          dev ? styleLoader : MiniCssExtractPlugin.loader,
          cssModuleLoader,
          postCssLoader,
          resolveUrlLoader,
          sassLoader
        ]
    }
  );

  return config;
};
