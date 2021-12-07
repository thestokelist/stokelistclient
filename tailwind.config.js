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
                xxs: '16rem',
            },
            minHeight: {
                '16': '4rem',
            },
            height: {
                '112': '28rem',
            },
            maxHeight: {
                '1/3': '33%',
                '102': '25.5rem',
                '112': '28rem',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
