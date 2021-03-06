import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Col } from 'react-bootstrap';
import ScrolltoTop from '../../../ScrolltoTop/ScrolltoTop';
function Element__update__info(props) {
    let { id } = useParams();
    let history = useHistory();
    const [products, setProduct] = useState({});
    const [image, setImage] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const requestUrl = `https://deploy-server-123.herokuapp.com/api/san-pham/${id}`;
            const respone = await fetch(requestUrl);
            const responseJson = await respone.json();
            const { data } = responseJson;
            setProduct(data);
            console.log(id)
        }
        fetchData();
    }, [id])

    function Update() {
        let formData = new FormData();
        formData.append("ma_san_pham", id);
        formData.append("ten_san_pham", document.getElementById("ten").value);
        formData.append("gia_tien", parseInt(document.getElementById("gia").value));
        formData.append("so_luong", parseInt(document.getElementById("SL").value));
        formData.append("mo_ta", document.getElementById("Mota").value);
        formData.append("cau_hinh", document.getElementById("ghichu").value);
        formData.append("ten_thuong_hieu", document.getElementById("TH").value);
        formData.append("xuat_xu", document.getElementById("xuatxu").value);
        formData.append("tinh_trang_san_pham", document.getElementById("TT").value);
        formData.append("thoi_gian_su_dung", parseInt(document.getElementById("TG").value));
        formData.append("file", image);

        axios({
            method: 'put',
            url: 'https://deploy-server-123.herokuapp.com/api/san-pham',
            data: formData,
            withCredentials: true,
            Headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(resp => {

            history.push("/Product_page")

        })
    }

    const handleFile = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }

    }
    const handleBack = e => {
        history.goBack();
    }
    return (
        <div>
            <div className="product-list" style={{ height: '750px' }}>

                <div className="product-container" style={{ display: 'flex', width: '150%' }}>
                    {products && (
                        <>
                            <div className="card" style={{ width: '120%', height: '50%', marginRight: '3%', marginBottom: '3%' }} id={products.ma_san_pham}>
                                <div className="title"> <h2 style={{ textAlign: 'center' }}>{products.ten_san_pham}</h2></div>
                                <br />
                                <div className="img" style={{ textAlign: 'center' }}>
                                    <img src={products.file && products.file[0]}></img>
                                </div>
                                <div className="text">{products.gia_tien}$</div>
                                <br />


                            </div>
                            <div className="container2" style={{ width: '100%' }}>
                                <div className="title">
                                    <Form.Group>
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3}>
                                                T??n s???n ph???m
                                            </Form.Label>
                                            <Col>
                                                <Form.Control size="lg" type="text" id="ten" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3}>
                                                Gi??
                                            </Form.Label>
                                            <Col>
                                                <Form.Control size="lg" type="text" id="gia" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3}>
                                                S??? l?????ng
                                            </Form.Label>
                                            <Col>
                                                <Form.Control size="lg" type="text" id="SL" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3}>
                                                M?? t???
                                            </Form.Label>
                                            <Col>
                                                <Form.Control as="textarea" rows={4} id="Mota" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3}>
                                                Ghi ch??
                                            </Form.Label>
                                            <Col>
                                                <Form.Control as="textarea" rows={4} id="ghichu" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3}>
                                                T??n th????ng hi???u
                                            </Form.Label>
                                            <Col>
                                                <Form.Control size="lg" type="text" id="TH" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3} >
                                                Xu???t x???
                                            </Form.Label>
                                            <Col>
                                                <Form.Control size="lg" type="text" id="xuatxu" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={3}>
                                                T??nh tr???ng
                                            </Form.Label>
                                            <Col>
                                                <Form.Control size="lg" type="text" id="TT" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row>
                                            <Form.Label column="lg" lg={5}>
                                                Th???i gian ???? s??? d???ng (n??m)
                                            </Form.Label>
                                            <Col>
                                                <Form.Control size="lg" type="text" id="TG" />
                                            </Col>
                                        </Form.Row>
                                        <br />
                                        <Form.Row><Form.Label column="lg" lg={5}>
                                            T???p tin
                                        </Form.Label>
                                            <Col> <input type="file" id="ok" onChange={handleFile} accept="image/*"></input></Col>


                                        </Form.Row>
                                        <br />
                                        <div class="button" style={{ textAlign: "center" }}>
                                            <button className="btn btn-info mr-0" onClick={Update}>C???p nh???t</button>
                                            <button onClick={handleBack} className="btn btn-danger mr-0">H???y</button>
                                        </div>
                                        <br />

                                    </Form.Group>

                                </div>

                            </div>
                        </>

                    )}
                </div>

            </div>
            <ScrolltoTop />
        </div>
    );
}

export default Element__update__info;