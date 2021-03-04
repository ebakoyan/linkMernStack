import {Link} from "react-router-dom"
import s from './HomeHeader.module.css'

function HomeHeader({logout}) {
    return (
        <div className={s.container}>
            <div>
                <Link className ="btn btn-primary" to='/'>Home</Link>
            </div>
            <div>
                <Link className ="btn btn-primary" to='/links'>Links</Link>
            </div>
            <div>
                <Link className ="btn btn-danger" onClick={logout} to='/'>Logout</Link>
            </div>
        </div>
    )
}
export default HomeHeader