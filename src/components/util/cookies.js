import Cookies from 'universal-cookie'
const cookies = new Cookies()
const cookieOptions =
    process.env.NODE_ENV === 'production'
        ? { path: '/', sameSite: 'None', maxAge: 2592000, secure: true }
        : { path: '/', sameSite: 'Strict', maxAge: 2592000 }

export const removeCookies = () => {
    cookies.remove('hmac', cookieOptions)
    cookies.remove('challenge', cookieOptions)
    cookies.remove('email', cookieOptions)
}

export const setCookies = (email, challenge, hmac) => {
    cookies.set('challenge', challenge, cookieOptions)
    cookies.set('hmac', hmac, cookieOptions)
    cookies.set('email', email, cookieOptions)
}
