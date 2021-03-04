import robot from '../../img/robot.gif'
import s from "./Home.module.css"
import Notifications, {notify} from 'react-notify-toast';
import {Component} from 'react'

export default class Home extends Component {
    constructor() {
        super()
        this.show = notify.createShowQueue();
    }
    post = () => {
        notify.hide()
        const {api} = this.props
        let link = document
            .getElementById("link")
            .value;
        try{
            link = new URL (link);
            api
            .post('/api/link/generate', {from: link.href})
            .then(res => {
                notify.show(`Url created \n ${res.data.link.to}`,'success',100000)
                this.props.login()
            })
            .catch(e => {
                notify.show("Url is incorrect",'error',3000)
            })
        }
        catch{
            notify.show("Url is incorrect",'error',3000)
        }

    }
    render() {
        return (
            <div className={s.Home}>
                <div className={s.link}>
                    <div className={s.input}>
                        <input type="text" id="link" placeholder="Shorten your link"/>
                    </div>
                    <div>
                        <button className={s.btn} onClick={this.post}>Shorten</button>
                    </div>
                </div>
                <div className={s.photo}>
                    <img src={robot} alt="robot"/>
                </div>
                <Notifications></Notifications>
            </div>
        )
    }
}
