module.exports = {
	root: true,
	extends: [
		"react-app",
		"plugin:import/errors",
		"plugin:prettier/recommended"
	],
	plugins: ["react-hooks", "simple-import-sort"],
	rules: {
		"no-unused-vars": "error",
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"simple-import-sort/sort": "error"
	}
};
