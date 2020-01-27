import React from 'react';
import Toast from 'react-bootstrap/Toast';

export const SuccessToast = props => {
    return (
        <Toast onClose={ props.closeToast } >
            <Toast.Header className='bg-success'>
                <strong className="mr-auto text-white">Success!</strong>
            </Toast.Header>
            <Toast.Body className="text-success">{ props.message }</Toast.Body>
        </Toast>
    )
}

export const FailToast = props => {
    console.log(props.message)
    return (
        <Toast onClose={ props.closeToast } >
            <Toast.Header className='bg-danger'>
                <strong className='mr-auto text-white'>Error!</strong>
            </Toast.Header>
            <Toast.Body className="text-danger">{ props.message }</Toast.Body>
        </Toast>
    )
}
