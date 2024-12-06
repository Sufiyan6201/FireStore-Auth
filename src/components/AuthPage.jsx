import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider()

function AuthPage() {
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);
    const navigator = useNavigate();

    let handleChnage = (e) => {
        let { name, value } = e.target;
        setUser((prevstate) => ({ ...prevstate, [name]: value }));
    };

    let handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            if (login) {
                await signInWithEmailAndPassword(auth, user.email, user.password);
                navigator("/");
            } else {
                let res = await createUserWithEmailAndPassword(
                    auth,
                    user.email,
                    user.password
                ).catch((err) => {
                    console.log(err.code);
                });
                navigator("/");
            }
            setUser({});
        } catch (error) {
            console.log(error);
            alert(error.code);
        }
    };

    const googleAuth= async()=>{
        await signInWithPopup(auth,provider)
        navigator('/')
    }

    return (
        <div>
            <div className="container">

                <form onSubmit={ handleSubmit } className="mx-auto w-50 mt-3">
                    <caption>
                        <h2>{ login ? "Login" : "SignUp" }</h2>
                    </caption>
                    <button className="btn btn-outline-" type="button" onClick={googleAuth}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                    </svg> Google</button>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            name="email"
                            onChange={ handleChnage }
                            value={ user.email || "" }
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={ handleChnage }
                            value={ user.password || "" }
                            id="exampleInputPassword1"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        { login ? "Login" : "SignUp" }
                    </button>
                    <button
                        className="btn btn-outline-primary float-end"
                        onClick={ () => setLogin(!login) }
                        type="button"
                    >
                        Go to { login ? "SignUp" : "Login" }
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;