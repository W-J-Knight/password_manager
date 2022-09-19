import React from 'react'
import { useState } from 'react'
import Axios from 'axios';

function AddPassword() {
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    // const [passwordList, setPasswordList] = useState([]);
    const addPassword = () => {
        Axios.post("http://localhost:3001/addpassword", {
            password: password,
            title: title,
        });
    };


    return (
        <div className="AddingPassword">
            <input type="text" placeholder="Ex.password" onChange={(event) => {
                setPassword(event.target.value)
            }} />
            <input type="text" placeholder="Ex.Facebook" onChange={(event) => {
                setTitle(event.target.value)
            }} />
            <button onClick={addPassword}>Add Password</button>
        </div>
    )
}

export default AddPassword