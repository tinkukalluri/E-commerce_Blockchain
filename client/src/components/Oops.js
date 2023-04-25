import React from 'react'
import css from './oops/oops_styles.css'
import {useHistory} from 'react-router-dom'

const opps_style={

}

export default function Oops(props) {
    const history = useHistory()

    const {oops_msg} = (props.location && props.location.state) || "404 - THE PAGE CAN'T BE FOUND";

    console.log(oops_msg)
    
    return (
        <>  
            oops_msg.length
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1 className="text-primary">Oops!</h1>
                        <h2>{oops_msg}</h2>
                    </div>
                    <a  onClick={e=>{
                        history.push('/')
                    }}>Go TO Homepage</a>
                </div>
            </div>
        </>
    )
}
