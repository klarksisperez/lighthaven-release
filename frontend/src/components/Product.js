/* This will just display the product details
in homepage, in a card */

import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating'

export default function Product(props) {
    const {product} = props;
    
    return (
        <div key= {product._id} className="card">
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.title} className="medium" />
            </Link>
            <div className="card-body-homescreen">
                <div className="card-container">
                    <Link to={`/product/${product._id}`}>
                        <h2 className="text-white">{product.title}</h2>
                    </Link>
                </div>
                <div className="card-container">
                    <p>{product.author}</p>
                </div>
                <div className="card-container vertical-spacing">
                    <Rating
                    rating={product.rating}
                    numreview={product.numreview}></Rating>
                </div>
            </div>
        </div>
    )
}

