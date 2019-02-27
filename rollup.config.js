const babel = require("rollup-plugin-babel");
const { sizeSnapshot } = require("rollup-plugin-size-snapshot");

export default [{
    input: 'src/index.js',
    output: {
        file: 'es/index.js',
        format: 'esm'
    },
    external: ['react'],
    plugins: [
        babel({
            exclude: /node_modules/,
            runtimeHelpers: true,
            plugins: [["@babel/transform-runtime", { useESModules: true }]]
        }),
        sizeSnapshot()
    ]
}, {
    input: 'src/index.js',
    output: {
        file: 'lib/index.js',
        format: 'cjs'
    },
    external: ['react'],
    plugins: [
        babel({ exclude: /node_modules/ })
    ]
}];
