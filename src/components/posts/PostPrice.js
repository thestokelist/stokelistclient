function PostPrice({ price }) {
    
    const getText = () => {
        let textPrice = price
        if (!isNaN(price)) {
            textPrice = '$'+ price
        }
        return textPrice
    }

    const displayText = () => {
        let theText = null
        if (price !== null && price !== undefined && price !== '') {
            theText = getText()
        }
        return theText
    }

    return displayText()
}

export default PostPrice
