import React, { useEffect, useRef, useState } from "react";
import "../Style/login.css"; // import CSS file for styling
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const initialState = { email: "", password: "", confirmPassword: "", username: "" }
    const [input, setInput] = useState(initialState)
    const toast = useToast()


    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const display = async (username, email, password) => {
        

        try {
            const res = await axios.post('https://friendzone-backend-5d8r.vercel.app/user/signup', {
                name: username,
                email: email,
                password: password
            })

            
            setLoading(false);
            toast({
                title: 'Account Created Successfully',
                position: 'top',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            navigate("/login");
        }
        catch (error) {
            setLoading(false);
            toast({
                title: 'Check Signup Details ',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const { email, password, confirmPassword, username } = input;

        if (password !== confirmPassword) {
            toast({
                title: 'Passwords do not match',
                position: 'top',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            setLoading(true);
            display(username, email, password);
        }
    }

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <div className="login-page-container">
            <div className="background-image"></div>
            <div className="login-form-container">
                <h2 className="heading">Sign Up</h2>
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username">Name</label>
                    <input
                        className="input-box"
                        type="text"
                        name="username"
                        ref={inputRef}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        className="input-box"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        className="input-box"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor=" Confirm password">Confirm Password</label>
                    <input
                        className="input-box"
                        type="password"
                        name="confirmPassword"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="submit-btn">{loading ? <Spinner size="md" /> : "Sign Up"}</button>

                    <hr className="separator" />
                    <Link to="/login">
                        <button type="submit" className="submit-btn second">Login</button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
