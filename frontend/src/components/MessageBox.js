/* this is a message handler, and is 
considered to catch error or info details */

import React from 'react'

export default function MessageBox(props) {
    return (
        <div className= {`alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    )
}
