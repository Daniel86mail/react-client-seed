import React, { useEffect, useState } from 'react';
import { getUsersNames } from '../services/user.service';

import './a.style.scss';

export default function A({ msg }) {
    const [users, setUsers] = useState([]);
    const [err, setErr] = useState(false);

    useEffect(()=> {
        getUsersNames()
        .then((res) => {
            setUsers(res);
            setErr(false);
        }).catch(e => setErr(true));
    }, []);
    return (
        <div className="a-component">
            <div className="message">Hello from Component A: {msg}</div>
            {users && users.map((u) => (<div className="user-name" key={u}>{u}</div>))}
            {err && (<div className="error-msg">Failed to load users lists</div>)}
        </div>
    );
};
