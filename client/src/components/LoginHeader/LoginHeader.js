import {Link} from "react-router-dom"
import s from './LoginHeader.module.css'

function LoginHeader() {
    return (
        <div className={s.container}>
            <div>
                <Link className ="btn btn-primary" to='/'>Login </Link>
            </div>
            <div>
                <Link className ="btn btn-primary"  to='/register'>Sign Up</Link>
            </div>
        </div>
    )
}
export default LoginHeader