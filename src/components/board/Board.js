import React from 'react';
export default function Board(props) {
    return (
        <div>
            <h1>Board</h1>
            <h1>Status: {props.loggedInStatus}</h1>
        </div>
    )
}