import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');
  const [textfile, setTextfile] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
        props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch(detailsProduct(productId));
    } else {
        setTitle(product.title);
        setAuthor(product.author);
        setImage(product.image);
        setTextfile(product.textfile);
        setGenre(product.genre);
        setCountInStock(product.countInStock);
        setDescription(product.description);
    }
}, [product, dispatch, productId, successUpdate, props.history]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
        updateProduct({
          _id: productId,
          title,
          author,
          image,
          textfile,
          genre,
          countInStock,
          description,
        })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('textfile', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/text_uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',  
        },
      });
      setTextfile(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

return (
    <div className="row center">
        <div className="form-container bg-custom text-white pd-6">
            <form className="form mg-0a" onSubmit={submitHandler}>
                <div>
                <Link to="/productlist"><span className="text-white"><i className="fa fa-arrow-circle-left"></i> Back to Products List</span></Link>
                <h1>Edit Product #{productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="error">{errorUpdate}</MessageBox>}
                {loading ? (
                <LoadingBox></LoadingBox>
                ) : error ? (
                <MessageBox variant="error">{error}</MessageBox>
                ) : (
                <>
                    <div>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        className="text-line bb-white text-form-inner"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="author">Author</label>
                    <input
                        id="author"
                        type="text"
                        placeholder="Enter name"
                        className="text-line bb-white text-form-inner"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="genre">Genre</label>
                    <input
                        id="genre"
                        type="text"
                        placeholder="Enter genre"
                        className="text-line bb-white text-form-inner"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="image">Image Link</label>
                    <input
                        type="file"
                        id="imageFile"
                        name="image"
                        label="Choose Image"
                        onChange={uploadFileHandler}
                    ></input>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && (
                        <MessageBox variant="error">{errorUpload}</MessageBox>
                    )}
                    <br/>
                    </div>
                    
                    <div>
                    <label htmlFor="textFile">File Link</label>
                    <input
                        type="file"
                        id="textfile"
                        name="textfile"
                        label="Choose File"
                        onChange={uploadFileHandler2}
                    ></input>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && (
                        <MessageBox variant="error">{errorUpload}</MessageBox>
                    )}
                    <br/>
                    </div>

                    <div>
                    <label htmlFor="countInStock">Availability <b>(1 - Available / 0 - Unavailable)</b></label>
                    <input
                        id="countInStock"
                        type="text"
                        placeholder="Enter countInStock"
                        className="text-line bb-white text-form-inner"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    ></input>
                    </div>
                    <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="3"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    </div>
                    <div>
                    <label></label>
                    <button className="primary" type="submit">
                        Update
                    </button>
                    </div>
                </>
                )}
            </form>
        </div>
    </div>
  );
}