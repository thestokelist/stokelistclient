module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: '#175e88',
                slate: '#434653',
                cream: '#f8f8f8'
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
