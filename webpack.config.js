const stylesHandler = 'style-loader';
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'build'),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: '/node_modules',
				use: ['babel-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				exclude: '/node_modules',
				use: [
					stylesHandler,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'postcss-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'build'),
		},
		port: 3000,
	},
};
