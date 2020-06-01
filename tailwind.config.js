module.exports = {
	important: false,
	theme: {
		screens: {
			// breakpoints
			// sm: "640px"
		},
		colors: {
			white: "#ffffff",
			blue: {
				primary: "#00aced",
				dark: "#012b72"
			},
			black: {
				dark: "#222222",
				light: "#4a4a4a"
			},
			green: {
				dark: "#00c673",
				light: "#cff9e7"
			},
			grey: {
				dark: "#666666",
				light: "#99999c",
				new: "#506d85",
				border: "#dde5ed",
				muted: "#e6e6e9",
				bg: "#f7f8fa"
			},
			orange: {
				light: "#fff1d9",
				dark: "#e68600"
			},
			transparent: "transparent",
			red: "#ff0000"
		},
		spacing: {
			"0": "0px",
			"2": "2px",
			"4": "4px",
			"6": "6px",
			"8": "8px",
			"10": "10px",
			"12": "12px",
			"14": "14px",
			"16": "16px",
			"18": "18px",
			"24": "24px",
			"34": "34px",
			"56": "56px"
		},
		backgroundColor: theme => theme("colors"),
		fontSize: {
			"10": "10px",
			"11": "11px",
			"12": "12px",
			"14": "14px",
			"16": "16px",
			"18": "18px",
			"20": "20px",
			"24": "24px",
			"30": "30px"
		},
		padding: theme => theme("spacing"),
		margin: theme => theme("spacing"),
		textColor: theme => theme("colors"),
		borderWidth: { "0": "0px", "1": "1px" }
	},
	corePlugins: [
		"preflight",
		"display",
		"position",
		"textColor",
		"backgroundColor",
		"margin",
		"padding",
		"fontSize",
		"fontWeight",
		"alignContent",
		"alignItems",
		"borderColor",
		"borderRadius",
		"borderStyle",
		"borderWidth",
		"boxShadow",
		"flex",
		"flexDirection",
		"justifyContent",
		"flexWrap",
		"width",
		"height",
		"textDecoration",
		"lineHeight",
		"textAlign",
		"appearance",
		"inset",
		"zIndex",
		"overflow",
		"objectFit",
		"minWidth",
		"letterSpacing",
		"accessibility",
		"whitespace",
		"wordBreak"
	]
};
