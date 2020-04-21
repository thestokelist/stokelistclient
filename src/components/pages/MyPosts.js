import React, { useEffect, useState } from 'react'
//eslint-disable-next-line
import styled from 'styled-components'
import Cookies from 'universal-cookie'
import { useForm } from 'react-hook-form'
import validator from 'email-validator'

import { Title } from '../shared/Text'
import MyPost from '../posts/MyPost'
import { Input } from '../shared/Forms'
import { BigGreyButton, GreyWhiteButton } from '../shared/Buttons'
import { removeCookies } from '../shared/Functions'

function MyPosts() {
    const cookies = new Cookies()
    const [isCookieSet, setIsCookieSet] = useState(false)
    const [myPosts, setMyPosts] = useState([])
    const { register, handleSubmit, errors, watch } = useForm() // initialise the hook

    const onSubmit = async (data) => {
        let postData = { email: data.email }
        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        })
        if (response.status === 200) {
            //TODO Show modal telling people to check their email
        } else {
            //TODO: Show error
            console.log('Login error: ' + response.status)
        }
    }

    useEffect(() => {
        console.log(cookies)
        if (
            cookies.get('hmac') &&
            cookies.get('challenge') &&
            cookies.get('email')
        ) {
            setIsCookieSet(true)
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        async function fetchPosts() {
            console.log(`Fetching posts for ${cookies.get('email')}`)
            //Include credentials to send cookie for authentication
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/posts/mine`,
                { credentials: 'include' }
            )
            const responseObject = await response.json()
            setMyPosts(responseObject)
        }
        if (isCookieSet) {
            fetchPosts()
        }
        //eslint-disable-next-line
    }, [isCookieSet])

    const getPostList = () => {
        if (myPosts && myPosts.length && myPosts.length > 0) {
            return myPosts.map((post) => (
                <MyPost post={post} key={post.id} />
            ))
        } else {
            return <div>Posts Loading...</div>
        }
    }

    const getLoginForm = () => {
        return (
            <div>
                <div>
                    To see your posts you must login. To login, enter your email
                    address below and we'll email you a login link
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="email"
                        name="email"
                        ref={register({
                            required: true,
                            validate: validateEmail,
                        })}
                    />
                    {errors.email &&
                        errors.email.type === 'required' &&
                        'Email is required.'}
                    {errors.email &&
                        errors.email.type === 'validate' &&
                        'Must be an email address.'}
                    <BigGreyButton type="submit">Login</BigGreyButton>
                </form>
            </div>
        )
    }

    const validateEmail = () => {
        const email = watch('email')
        return validator.validate(email)
    }

    const logout = () => {
        console.log('Logging out')
        removeCookies()
        setIsCookieSet(false)
    }

    return (
        <div>
            <Title>My Posts</Title>
            {isCookieSet ? (
                <div>
                    <GreyWhiteButton onClick={logout}>Logout</GreyWhiteButton>
                    {getPostList()}
                </div>
            ) : (
                getLoginForm()
            )}
        </div>
    )
}

export default MyPosts
