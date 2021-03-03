import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    }

    return (
        error
        ? <div style={errorStyle}>{ message }</div>
        : <div style={successStyle}>{ message }</div>
    )
}

const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

export default Notification