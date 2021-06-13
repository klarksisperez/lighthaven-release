import React, { useEffect, useState } from 'react'
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsProduct } from '../actions/productActions';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';


export default function ProductScreen(props) {
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const productDetails = useSelector((state)=> state.productDetails);
    const {loading, error, product} = productDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
  
    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
      loading: loadingReviewCreate,
      error: errorReviewCreate,
      success: successReviewCreate,
    } = productReviewCreate;
  
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    
    useEffect(()=>{
        if (successReviewCreate) {
            window.alert('Review Submitted Successfully');
            setRating('');
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
        }
        dispatch(detailsProduct(productId));
    },[dispatch, productId], successReviewCreate);

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
          dispatch(
            createReview(productId, { rating, comment, name: userInfo.name })
          );
        } else {
          alert('Please enter comment and rating');
        }
    };
    
    const viewHandler = () => {
        if(!userInfo){
            alert('Please sign-in first before viewing');
            <Link to="/signin"></Link>
        }else{
            window.open(product.textfile,'_blank');
        }
      };

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>)
            :error ? (<MessageBox variant="error">{error}</MessageBox>)
            :(
            <div className="container-nonbd text-white">
                <Link to="/"><span className="text-white"><i className="fa fa-arrow-circle-left"></i> Back to Items</span></Link>
                <div className="row top">
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.title}/>
                    </div>
                    <div className="col-1">
                        <ul>
                           <li><h1>{product.title}</h1></li>
                           <li><p>{product.author}</p></li>
                           <li><Rating rating={product.rating} numreview={product.numreview}></Rating></li><br/>
                           <br />
                           <li>Description:<p>{product.description}</p></li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status: </div>
                                        <div>
                                            {product.countInStock > 0 ? (<span className="success"> ACTIVE </span>) : (<span className="error"> INACTIVE </span>)}
                                        </div>
                                    </div>
                                </li>
                                {
                                    product.countInStock > 0 &&(
                                        <>
                                    <li><br />
                                        <button onClick={viewHandler}
                                        className="primary block"
                                        >
                                        View
                                        </button>
                                    </li>
                                    </>
                                    
                                    )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 id="reviews">Reviews</h2>
                    <hr/>
                    {product.reviews.length === 0 && (
                    <MessageBox className="card card-body">There is no review</MessageBox>
                    )}
                    <ul>
                    {product.reviews.map((review) => (
                        <li key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} caption=" "></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                        </li>
                    ))}
                    <hr/>
                    <br/>
                    <li>
                        {userInfo ? (
                        <div className="row center">
                        <div className="form-container bg-custom text-white pd-6">
                        <form className="form mg-0a" onSubmit={submitHandler}>
                        <div>
                            <h2>Write a customer review</h2>
                        </div>
                        <div>
                            <label htmlFor="rating">Rating</label>
                            <select
                                id="rating"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                            >
                                <option value="">Select...</option>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very good</option>
                                <option value="5">5- Excelent</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="comment">Comment</label>
                            <textarea
                                id="comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">
                                Submit
                            </button>
                        </div>
                        <div>
                            {loadingReviewCreate && <LoadingBox></LoadingBox>}
                            {errorReviewCreate && (
                                <MessageBox variant="danger">
                                {errorReviewCreate}
                                </MessageBox>
                            )}
                        </div>
                        </form>
                        </div>
                        </div>
                        ) : (
                        <MessageBox>
                            Please <Link to="/signin" className= "backLink">log in</Link> to write a review
                        </MessageBox>
                        )}
                    </li>
                    <br/>
                    </ul>
                </div>
            </div>
            )}
        </div>
        
    );
}
