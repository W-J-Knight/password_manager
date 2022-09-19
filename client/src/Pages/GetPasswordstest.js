import { useState, useEffect } from "react";
// promise base api
import Axios from 'axios';
import { Link, useMatch, useResolvedPath } from "react-router-dom"
// import Modal from "../Compponents/Modal";

function GetPassword() {

    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [passwordList, setPasswordList] = useState([]);
    const [id, setId] = useState('')
    const [iv, setIv] = useState('')
    // const [openModal, setOpenModel] = useState(false)
    useEffect(() => {
        Axios.get("http://localhost:3001/showpasswords").then((response) => {
            setPasswordList(response.data);
        });
    }, []);


    return (
        <div className="Passwords">
            {/* {openModal && <Modal closeModal={setOpenModel} title={title} uncryptedPassword={password} id={id} iv={iv} />} */}
            {passwordList.map((val, key) => {
                return (
                    <Link title={title} uncryptedPassword={password} id={id} iv={iv}
                        className="password"
                        onClick={() => {
                            // setOpenModel(true)
                            setTitle(val.title)
                            setPassword(val.password)
                            setId(val.id)
                            setIv(val.iv)
                        }}
                        key={key} to="retrieve/{val:title}"
                    >
                        <p>{val.title}</p>

                    </Link>
                );
            })}
        </div>
    )
}

export default GetPassword