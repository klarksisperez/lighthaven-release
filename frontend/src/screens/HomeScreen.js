import React, {useEffect} from 'react'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Landing from '../components/Landing'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

import SearchBox from '../components/SearchBox';
import {Route} from 'react-router-dom'  


export default function HomeScreen() {

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const productList = useSelector((state)=> state.productList);
    const {loading, error, products} = productList;

    useEffect(()=>{
        dispatch(listProducts({}));
    },[dispatch])
    return (
            <div className="res">
                {!userInfo  
                ? 
                    <div>
                        <Landing></Landing>
                    </div>
                :[                  
                ]}
                    
            <br/>
            <div className="float-right">
                        <Route
                        render={({ history }) => (
                            <SearchBox history={history}></SearchBox>
                        )}
                        ></Route>
            </div> 
            <h2 className="text-white">Our Selection</h2>
            <hr/><br/>
            {loading ? (<LoadingBox></LoadingBox>)
            :error ? (<MessageBox variant="error">{error}</MessageBox>)
            :(
            <div className="row center">
                {
                    products.map(product =>(
                        <Product key={product._id} product={product}> </Product>
                    ))
                }
            </div>)
            }   
            <br/>
        </div>
    )
}
