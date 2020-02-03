import React from 'react';

const ConfirmationPlacard = ({ title, props }) => {
    return (
        <div>
            <h3>{ title }</h3>
            {
                Object.entries(props).map(([key, value]) => {
                    return (
                        <p key={ key }>{ key } - { value }</p>
                    )
                })
            }
        </div>
    )
}

export default ConfirmationPlacard;