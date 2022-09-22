import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
function UpdateModal({
    passwordList,
    setPasswordList,
    closeModal,
    title,
    uncryptedPassword,
    id,
    iv,
}) {
    const [showPassword, setShowPassword] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        Axios.get("http://localhost:3001/showpasswords").then((response) => {
            showPassword(response.data);
        });
    });
    const decryptPassword = (encryption, iv) => {
        Axios.post("http://localhost:3001/decryptpassword", {
            password: encryption,
            iv: iv,
        }).then((response) => {
            setShowPassword(response.data);
        });
    };

    const updatePassword = (password, id) => {
        Axios.put("http://localhost:3001/updatepassword", {
            password: password,
            id: id,
        }).then((response) => {
            // decryptPassword(password, iv);
            setPasswordList(
                passwordList.map((val) => {
                    decryptPassword(val.password, val.iv);
                    return val.id === id
                        ? {
                              title: val.title,
                              id: val.id,
                              password: val.password,
                              iv: val.iv,
                          }
                        : val
           
        }))
        // decryptPassword(val.password, val.iv);
        closeModal(false); {
            window.location.reload(false);
          };
        })}

    decryptPassword(uncryptedPassword, iv);
    return (
        <div className="modal_sytle">
            <div className="overlay_style">
                <div className="info">
                    <h1>{title}</h1>
                    <p>Password is </p>
                    <p className="bold">{showPassword}</p>
                    <input
                        type="text"
                        placeholder="Ex.password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                    />
                </div>
                <button onClick={() => closeModal(false)}>CANCEL</button>
                <button
                    onClick={() => {
                        updatePassword(password, id);
                    }}
                >
                    Update
                </button>
            </div>
        </div>
    );
}

export default UpdateModal;
