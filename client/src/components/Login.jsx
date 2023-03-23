import React, { useContext, useState } from "react";
import "../Style/login.css"; // import CSS file for styling
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
function Login() {

    const toast = useToast()
    const navigate = useNavigate();
    const cookies = new Cookies();

    const [loading, setLoading] = useState(false);
    const initialState = { email: "", password: "" }
    const [input, setInput] = useState(initialState)

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const display = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:8080/users/login', {
                email: email,
                password: password
            })
            setLoading(false);
           
            cookies.set('token', res.data.token, {
                path: '/',
                maxAge: 24 * 60 * 60
            })
            cookies.set('userId', res.data.user._id, {
                path: '/',
                maxAge: 24 * 60 * 60
            })
            setTimeout(() => {

                navigate("/");
            }, 200)

            toast({
                title: 'Login Successfully',
                position: 'top',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            setTimeout(() => {

                console.log(res.data);
                console.log(cookies.get('userId'))
            }, 200)
        }
        catch (error) {
            setLoading(false);
            
            toast({
                title: 'Check your email and password',
                position: 'top',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const { email, password } = input;
        setLoading(true);
        display(email, password);
    }






    return (
        <div className="login-page-container">
            <div className="background-image"></div>
            <div className="login-form-container">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        className="input-box"
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className="input-box"
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="submit-btn">{loading ? <Spinner size="md" /> : "Login"}</button>
                    <hr className="separator" />
                    <Link to="/signup">
                        <button type="submit" className="submit-btn second">Sign Up</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
