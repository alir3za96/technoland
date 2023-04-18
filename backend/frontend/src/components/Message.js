import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, text, children, className }) {
    return (
        <Alert className={className} variant={variant}>
            {text}{children}
        </Alert>
    )
}

export default Message
