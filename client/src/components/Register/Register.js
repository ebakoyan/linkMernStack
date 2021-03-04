import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notifications, {notify} from 'react-notify-toast';
import {Redirect} from 'react-router-dom'

export default function Register({reg}) {
    const [email,
        setEmail] = useState("");
    const [red,
        setRed] = useState(false)
    const [password,
        setPassword] = useState("");

    function validateForm() {
        return email.length > 4 && password.length >= 6;
    }

    function handleSubmit(event) {
        event.preventDefault();
        reg(email, password).then(res => {
            if (res) {
                setRed(true)
                notify.show("User created",'success',3000)
            }
        }).catch(e=>{
            notify.show("Email or password is incorrect",'error',3000)
        })
    }
    console.log(Form)
    return (red
        ? <Redirect to="/"/>
        : <div className="Login" >
            <Notifications></Notifications>
            <Form onSubmit={handleSubmit} >
                <Form.Group size="sm" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group size="sm" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button block size="sm" type="submit" disabled={!validateForm()}>
                    Create New Account
                </Button>
            </Form>
        </div>);
}