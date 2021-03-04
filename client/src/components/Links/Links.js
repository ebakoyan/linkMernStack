import {Component} from 'react'
import Link from "./Link/Link"

export default class Links extends Component{
    state={
        links :this.props.links|| [] 
    }
    componentDidMount(){
        this.setState({links:this.props.links})
    }
    render(){
        const {links} = this.state
        console.log(links)
        let LinkList;
        if(links){
        LinkList = links.map(link=>(
            <Link {...link}></Link>
        ))
        }
        return(
            <div style={{display:"flex",justifyContent:"center",flexWrap:"wrap"}}>
                {LinkList}
            </div>
        )
    }
}