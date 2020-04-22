import Cookies from 'universal-cookie'
const cookies = new Cookies()
const domain = process.env.REACT_APP_API_DOMAIN
const cookieOptions = { path: '/', sameSite: 'Strict', maxAge: 2592000, domain: domain }

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
