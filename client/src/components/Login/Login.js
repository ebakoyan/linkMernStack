import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Notifications, {notify} from 'react-notify-toast';

import "./Login.css";

export default function Login({tokenSet}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 4 && password.length >= 6;
  }

  function handleSubmit(event) {
    event.preventDefault();

    tokenSet(email,password).then(res=>{
      if(!res){
        notify.show("Welcome back",'success',3000)
      }
    })
    .catch(e=>{
      notify.show("Email or password is incorrect",'error',3000)
    })
  }
  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="sm" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="sm" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="sm" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
      <Notifications></Notifications>
    </div>
  );
}