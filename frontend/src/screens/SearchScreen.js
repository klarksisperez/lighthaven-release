import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

import SearchBox from '../components/SearchBox';
import {Route,Link} from 'react-router-dom'  


export default function SearchScreen(props) {
  const { title = 'all' } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts({ title: title !== 'all' ? title : '' }));
  }, [dispatch, title]);
  return (
    <div className="container-nonbd text-white">
    <Link to="/"><span className="text-white"><i className="fa fa-arrow-circle-left"></i> Back to Items</span></Link>
    <br/><br/>
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>
                <div className="float-right2">
                <Route
                    render={({ history }) => (
                    <SearchBox history={history}></SearchBox>
                    )}
                ></Route>
              </div> 
              <br/><br/><br/><br/>
              <b>SEARCH RESULTS:</b> {products.length} Result/s for <span className="warning">{title}</span>
          </div>
        )}
      </div>
      <div className="row top container-nonbd">
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <div className="row center">
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}