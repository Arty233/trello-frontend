import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function User(props) {
    const [boards, setBoards] = useState([]);

    function getData() {
        axios.get('http://localhost:3001/api/teams?user_id=3')
            .then(response => {
                console.log(response)
                const arrayOfTeams = response.data;
                console.log(arrayOfTeams);
                let result = arrayOfTeams.map(a => a.board_id);
                console.log(result)
                result.forEach(element => {
                    axios.get(`http://localhost:3001/api/boards/${element}.json`)
                        .then(response => {
                            console.log(response);
                            setBoards(...boards, response.data)
                        })
                });
                console.log('boards');
                console.log(boards);
            })
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <h1>User</h1>
            <h1>Status: {props.loggedInStatus}</h1>
            <div className='boardList'>
                <li>1</li>
            </div>
        </div>
    )
}