import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link, Switch, Router, Route } from 'react-router-dom';
import Element__delete from './Element__delete/Element__delete';

function Delete__page(props) {
    const [getData, setData] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const requestUrl = 'https://deploy-server-123.herokuapp.com/api/san-pham'
            const respone = await fetch(requestUrl);
            const responseJson = await respone.json();
            const { data } = responseJson;
            setData(data);
            console.log(data)
        }
        fetchData();

    }, [])
    const Delete = e => {
        let request = {
            ma_san_pham: localStorage.getItem('product')
        }
        console.log(localStorage.getItem('product'))
        axios({
            method: 'delete',
            url: 'https://deploy-server-123.herokuapp.com/api/san-pham',
            data: request,
            withCredentials: true
        }).then(resp => {
            console.log(resp.data.data)


        })
        localStorage.removeItem('product')
    }
    return (

        <>
            <div>
                <Switch>
                    <Route
                        path="/Product_page/Delete__page/Element__delete/:id"
                        component={Element__delete}
                    ></Route>
                </Switch>
            </div>
            <div className="product_list" >

                <div className="product_container">
                    {getData != null && getData.map((products) => (

                        <div className="card" id={products.ma_san_pham}>
                            <>

                            </>
                            <div className="title" id="IDsanpham">{products.ten_san_pham}</div>
                            <br />
                            <div className="img">
                                <Link to={`/Product_page/Delete__page/Element__delete/${products.ma_san_pham}`}>
                                    <img src={products.file && products.file[0]}></img>
                                </Link>
                            </div>
                            <div className="text">{products.gia_tien}$</div>
                            <br />
                            <Link to={`/Product_page/Delete__page/Element__delete/${products.ma_san_pham}`}>
                                <button className="btbuy" onClick={Delete}>
                                    X??a s???n ph???m
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>


            </div>


        </>
    );
}

export default Delete__page;