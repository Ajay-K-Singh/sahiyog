function BabelPreset() {
	const isProduction = process.env.NODE_ENV === "production";

	return {
		presets: [
			[
				require.resolve("@babel/preset-env"),
				{
					modules: false,
					bugfixes: true,
					loose: true,
					exclude: [
						"transform-typeof-symbol",
						// We are not using generator functions
						"transform-regenerator",
						// fast-async will handle async
						"transform-async-to-generator"
					]
				}
			],
			[
				require.resolve("@babel/preset-react"),
				{
					// Adds component stack to warning messages
					// Adds __self attribute to JSX which React will use for some warnings
					development: !isProduction,
					// Will use the native built-in instead of trying to polyfill
					// behavior for any plugins that require one.
					useBuiltIns: true
				}
			]
		],
		plugins: [
			// Adds syntax support for import()
			require.resolve("@babel/plugin-syntax-dynamic-import"),
			// class properties class { handleThing = () => { } }
			[
				require.resolve("@babel/plugin-proposal-class-properties"),
				{ loose: true }
			],
			// Rest spread
			[
				require.resolve("@babel/plugin-proposal-object-rest-spread"),
				{
					loose: true,
					useBuiltIns: true
				}
			],
			// Optional chaining
			[
				require.resolve("@babel/plugin-proposal-optional-chaining"),
				{ loose: true }
			],
			// Nullish coalescing operator
			[
				require.resolve("@babel/plugin-proposal-nullish-coalescing-operator"),
				{ loose: true }
			],
			// Modify lodash imports for better treeshaking
			require.resolve("babel-plugin-lodash"),
			// Faster async-await transform (async-await to Promises)
			[require.resolve("fast-async"), { spec: true }],
			require.resolve("babel-plugin-macros"),
			// Remove PropTypes
			isProduction &&
			require.resolve("babel-plugin-transform-react-remove-prop-types")
		].filter(Boolean)
	};
}

module.exports = BabelPreset;
