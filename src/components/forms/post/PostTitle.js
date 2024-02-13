import React from 'react'

function PostTitle({ errors, register, watch }) {
    const validateYelling = () => {
        const title = watch('title')
        const upperCaseCount = title.replace(/[^A-Z]/g, '').length
        const lowerCaseCount = title.replace(/[^a-z]/g, '').length
        if (upperCaseCount > 0 && upperCaseCount > lowerCaseCount) {
            return false
        } else {
            return true
        }
    }

    return (
        <div className="form-input-container">
            <div className="form-label">Post Title</div>
            <input
                className="form-input w-full lg:w-4/5"
                name="title"
                maxlength="50"
                placeholder="Max 50 characters"
                ref={register({
                    required: true,
                    maxLength: 50,
                    validate: validateYelling,
                })}
            />
            <div className="form-error">
                {' '}
                {errors.title &&
                    errors.title.type === 'required' &&
                    'Post Title is required.'}
                {errors.title &&
                    errors.title.type === 'maxLength' &&
                    'Post Title has a max length of 50 characters.'}
                {errors.title &&
                    errors.title.type === 'validate' &&
                    'Your post title can’t be created with the CAPS LOCK on; it looks like you’re yelling.'}
            </div>
        </div>
    )
}

export default PostTitle
