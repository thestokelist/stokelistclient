module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                blue: '#175e88',
                slate: '#434653',
                cream: '#f8f8f8',
            },
            maxWidth: {
                '1/4': '25%',
                '1/2': '50%',
                '3/4': '75%',
            },
            minWidth: {
                'xxs': '16rem'
            },
            minHeight: {
                '16': '4rem',
            },
            maxHeight: {
                '100': '25rem',
                '1/3': '33%',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
