import { useState, useEffect } from "react";
import Axios from "axios";

function Modal({ closeModal, title, uncryptedPassword, id, iv }) {
    const [showPassword, setShowPassword] = useState("");

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
    decryptPassword(uncryptedPassword, iv);
    return (
        <div className="modal_sytle">
            <div className="overlay_style">
                <div className="info">
                    <h1>{title}</h1>
                    <p>
                        Password is </p><p className="bold">{showPassword}</p>
                    
                </div>
                <button onClick={() => closeModal(false)}>x</button>
            </div>
        </div>
    );
}

export default Modal;
