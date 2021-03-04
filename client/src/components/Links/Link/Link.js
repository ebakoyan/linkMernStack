import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import errorImg from '../../../img/error.png'
import {useState,useEffect} from 'react'
import axios from 'axios'
const Link = ({from, to, clicks, date}) => {
    const imgSrc = 'https://api.apiflash.com/v1/urltoimage?access_key=499c052605754109a477512cb8da54' +
            'eb&url='
    let hostname = 'Invalid URL'
    let [src,
        setSrc] = useState('');
    
    useEffect(() => {
        axios
        .get(imgSrc+from)
        .then(res => {
            if (res.status == 200) {
                setSrc(imgSrc+from)
            } else  {
                setSrc(errorImg)
            }
        })
        .catch(e=>{
            setSrc(errorImg)
        })
    }, [])
    try {
        let domain = new URL(from);
        hostname = domain.hostname
    } catch (error) {
        
    }
    return (
        <Card style={{
            width: '25rem',
            margin: "5px"
        }}>
            <Card.Img variant="top" src={src}/>
            <Card.Body>
                <Card.Title>{hostname}</Card.Title>
                <Card.Text>
                    Clicks : {clicks}
                    <br/>
                    BaseURL : 
                    <a href={from} target="_blank"> {from}</a>
                    <br></br>
                    Shorten :
                    <a href={to} target="_blank"> {to}</a>
                </Card.Text>
                <a href={to} target="_blank">
                    <Button variant="primary">Open Link</Button>
                </a>
            </Card.Body>
        </Card>
    )
}

export default Link;