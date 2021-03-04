import {Component} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from './components/Home/Home'
import Links from './components/Links/Links'
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import LoginHeader from "./components/LoginHeader/LoginHeader"
import HomeHeader from "./components/HomeHeader/HomeHeader"
import Nf from './components/nf/Nf'
import config from './config'
import axios from 'axios'

import spinner from './img/spinner.gif'
let api = null;

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            isAuth: false,
            token: localStorage.getItem("token") || "",
            links: [],
            loading: true
        }
        api = axios.create({
            baseURL: config.baseUrl,
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        })
    }
    logout = () => {
        localStorage.removeItem('token');
        this.setState({token: " ", isAuth: false,links:[]})
        api = axios.create({baseURL: config.baseUrl})
    }
    tokenSet = async(email, password) => {
        let t = false
        const res = await api.post('/api/auth/login', {email, password})
        if (res.status == 200) {
            api = axios.create({
                baseURL: config.baseUrl,
                headers: {
                    'Authorization': `Bearer ${res.data.token}`
                }
            })
            localStorage.setItem("token", res.data.token)
            this.setState({token: res.data.token})
            this.setState({isAuth: true})
        }
        return t
    }
    logout = ()=>{
        localStorage.removeItem("token");
        this.setState({token:" ",isAuth:false})
        api = axios.create({
            baseURL: config.baseUrl
        })
    }
    login = () => {
        api
            .get('/api/link')
            .then(res => {
                if (res.status == 200) {
                    this.setState({links: res.data, isAuth: true})
                } else {
                    this.logout()
                }
                this.setState({loading: false})
            })
            .catch(e => {
                this.setState({loading: false})
            })
    }
    reg = async(email, password) => {
        const res = await api.post('/api/auth/register', {email, password})
        if (res.status == 201) {
            return true
        }
        return false
    }
    componentDidMount() {
        this.login();
    }
    render() {
        if (this.state.loading) {
            return (
                <div
                    style={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <img
                        src={spinner}
                        style={{
                        display: "block"
                    }}
                        alt="loading"/>
                </div>
            )
        }
        const {isAuth} = this.state
        const content = isAuth
            ? <Router>
                    <HomeHeader logout={this.logout}></HomeHeader>
                    <Switch>
                        <Route path='/' exact>
                            <Home api ={api} login={this.login}></Home>
                        </Route>
                        <Route path='/links'>
                            <Links links={this.state.links.links}></Links>
                        </Route>
                        <Route path='/404'>
                            <Nf></Nf>
                        </Route>
                        <Route>
                            <Redirect to='/404'></Redirect>
                        </Route>
                    </Switch>
                </Router>
            : <Router>
                <LoginHeader></LoginHeader>
                <Route path='/' exact>
                    <Login tokenSet={this.tokenSet}></Login>
                </Route>
                <Route path='/register' exact>
                    <Register reg={this.reg}></Register>
                </Route>
                <Route>
                    <Redirect to='/'></Redirect>
                </Route>
            </Router>
        return (
            <div>
                {content}
            </div>
        );
    }
}
