import React, { useEffect, useState } from 'react';
import { getUsersNames } from '../services/user.service';

import './a.style.scss';

export default function A({ msg }) {
    const [users, setUsers] = useState([]);
    useEffect(()=> {
        getUsersNames()
        .then(res => setUsers(res));
    }, []);
    return (
        <div className="a-component">
            <div className="message">Hello from Component A: {msg}</div>
            {users && users.map((u) => (<div className="user-name" key={u}>{u}</div>))}
        </div>
    );
};
