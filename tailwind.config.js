module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: '#175e88',
                slate: '#434653',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
