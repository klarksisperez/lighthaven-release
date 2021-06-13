import React from 'react'
import { Link } from 'react-router-dom'
import books from '../images/books-512.png';

export default function Landing() {
    return (
        <div className="hp_container">
            <div className="row">
                <div className="col-1">
                    <p className="text-white hp_text1">Simple<br/>Easy<br/>Free.<br/></p>
                    <p className="text-white hp_text2">Join us at <b>Lighthaven</b></p>
                    <div className="top_custom">
                        <Link to="/signin">
                        <button type="button" className="button3">
                            Sign In 
                        </button>
                        </Link> 
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/register">  
                        <button type="button" className="button3">
                            Sign Up 
                        </button>
                        </Link>  
                    </div>
                </div>
                    
                <div className="col-2">
                    <img src={books} className="hp_book" alt="lighthaven-book"></img>
                </div>
            </div>
        </div>
    )
}   
