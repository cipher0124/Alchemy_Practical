import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import { Toast } from 'primereact/toast';


export default class AddEditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nameErrorText: "",
            nameError: false,
            category: "",
            categoryErrorText: "",
            categoryError: false,
            expiryDate: "",
            expiryDateErrorText: "",
            expiryDateError: false,
            costPrice: 0,
            costPriceErrorText: "",
            costPriceError: false,
            sellPrice: 0,
            sellPriceErrorText: "",
            sellPriceError: false,
            discount: 0,
            discountErrorText: "",
            discountError: false,
            discountprice: 0,
            finalPrice: 0,
            decription: "",
            isEdit: false,
            id: null
        };
    }
    componentDidMount = async () => {

        let id = window.location.pathname.split("/");
        if (id[2]) {
            const { data } = await axios.get(`http://localhost:5000/product/${id[2]}`)
            this.setState({
                id: id[2],
                isEdit: true,
                name: data.name,
                category: data.category,
                expiryDate: data.expiryDate,
                costPrice: data.costPrice,
                sellPrice: data.sellPrice,
                discount: data.discount,
                discountprice: data.discountprice,
                finalPrice: data.finalPrice,
                decription: data.decription
            })
        }
    }
    handleChange = (event) => {
        let type = event.target.name;
        if (type === 'name') {
            if (event.target.value !== "") {
                this.setState({
                    name: event.target.value,
                    nameError: false,
                    nameErrorText: ""
                })
            } else {
                this.setState({
                    name: event.target.value,
                    nameError: true,
                    nameErrorText: "this field is required"
                })
            }
        }
        if (type === 'decription') {
            if (event.target.value !== "") {
                this.setState({
                    decription: event.target.value,
                    decriptionError: false,
                    decriptionErrorText: ""
                })
            } else {
                this.setState({
                    decription: event.target.value,
                    decriptionError: true,
                    decriptionErrorText: "this field is required"
                })
            }
        }

        if (type === 'category') {
            if (event.target.value !== "") {
                this.setState({
                    category: event.target.value,
                    categoryError: false,
                    categoryErrorText: ""
                })
            } else {
                this.setState({
                    category: event.target.value,
                    categoryError: true,
                    categoryErrorText: "this field is required"
                })
            }
        }

        if (type === 'sellPrice') {
            if (event.target.value > 0) {
                this.setState({
                    sellPrice: event.target.value,
                    sellPriceError: false,
                    sellPriceErrorText: ""
                })
            } else {
                this.setState({
                    sellPrice: event.target.value,
                    sellPriceError: true,
                    sellPriceErrorText: "this field is required"
                })
            }
        }
        if (type === 'costPrice') {
            if (event.target.value > 0) {
                this.setState({
                    costPrice: event.target.value,
                    costPriceError: false,
                    costPriceErrorText: ""
                })
            } else {
                this.setState({
                    costPrice: event.target.value,
                    costPriceError: true,
                    costPriceErrorText: "this field is required"
                })
            }
        }
        if (type === 'discount') {
            if (event.target.value > 0) {
                let dicountPrice = ((event.target.value * this.state.sellPrice) / 100);
                let finalPrice = this.state.sellPrice - dicountPrice;
                this.setState({
                    discountprice: dicountPrice,
                    finalPrice: finalPrice,
                    discount: event.target.value,
                    discountError: false,
                    discountErrorText: ""
                })
            } else {
                this.setState({
                    discount: event.target.value,
                    discountError: true,
                    discountErrorText: "this field is required"
                })
            }
        }
        if (type === 'expiryDate') {
            if (event.target.value !== "") {
                this.setState({
                    expiryDate: event.target.value,
                    expiryDateError: false,
                    expiryDateErrorText: ""
                })
            } else {
                this.setState({
                    expiryDate: event.target.value,
                    expiryDateError: true,
                    expiryDateErrorText: "this field is required"
                })
            }
        }
    }

    validate = () => {
        const { name,
            category,
            expiryDate,
            costPrice,
            sellPrice,
            discount,
        } = this.state
        let isValid = true;
        if (name == "" || name == null) {
            isValid = false;
            this.setState({
                nameError: true,
                nameErrorText: "this field is required"
            })
        }
        if (category == "" || category == null) {
            isValid = false;
            this.setState({
                categoryError: true,
                categoryErrorText: "this field is required"
            })
        }
        if (expiryDate == "" || expiryDate == null) {
            isValid = false;
            this.setState({
                expiryDateError: true,
                expiryDateErrorText: "this field is required"
            })
        }
        if (costPrice == 0 || costPrice == null) {
            isValid = false;
            this.setState({
                costPriceError: true,
                costPriceErrorText: "this field is required"
            })
        }
        if (sellPrice == "" || sellPrice == null) {
            isValid = false;
            this.setState({
                sellPriceError: true,
                sellPriceErrorText: "this field is required"
            })
        }
        if (discount == "" || discount == null) {
            isValid = false;
            this.setState({
                discountError: true,
                discountErrorText: "this field is required"
            })
        }
        return isValid
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        const { name,
            category,
            expiryDate,
            costPrice,
            sellPrice,
            discount,
            discountprice,
            finalPrice, decription, id, isEdit } = this.state
        if (this.validate()) {
            const tempdata = {
                name: name,
                category: category,
                expiryDate: expiryDate,
                costPrice: costPrice,
                sellPrice: sellPrice,
                discount: discount,
                discountprice: discountprice,
                finalPrice: finalPrice,
                decription: decription
            }
            if (isEdit) {
                await axios.put(`http://localhost:5000/product/${id}`, tempdata)
                this.props.history.push('/products')

            } else {
                await axios.post(`http://localhost:5000/product`, tempdata)
                this.props.history.push('/products')
            }
      

        }
    }

    render() {
        const { name,
            nameErrorText,
            nameError,
            category,
            categoryErrorText,
            categoryError,
            expiryDate,
            expiryDateErrorText,
            expiryDateError,
            costPrice,
            costPriceErrorText,
            costPriceError,
            sellPrice,
            sellPriceErrorText,
            sellPriceError,
            discount,
            discountErrorText,
            discountError,
            discountprice,
            finalPrice, decription, isEdit } = this.state
        return (
            <>
                <Container className='mt-5 p-2'>
                    <h1>{isEdit ? 'Edit' : 'Add'} Product</h1>
                    <hr />
                    <Form onSubmit={(e) => { this.handleSubmit(e) }} method="POST" encType='multipart/form-data'>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                value={name}
                                name='name'
                                onChange={(e) => this.handleChange(e)}
                                type="text"
                                isInvalid={nameError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {nameErrorText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Select aria-label="Default select example" name='category' value={category} onChange={(e) => this.handleChange(e)} isInvalid={categoryError}>
                                <option value="">Select Category</option>
                                <option value="softtoys">Soft Toys</option>
                                <option value="food">Food</option>
                                <option value="sport">Sport</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {categoryErrorText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Expiry Date</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="DateRange"
                                name='expiryDate'
                                onChange={(e) => this.handleChange(e)}
                                value={expiryDate}
                                isInvalid={expiryDateError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {expiryDateErrorText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Cost Price</Form.Label>
                            <Form.Control
                                value={costPrice}
                                name='costPrice'
                                onChange={(e) => this.handleChange(e)}
                                type="number"
                                isInvalid={costPriceError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {costPriceErrorText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Sell Price</Form.Label>
                            <Form.Control
                                value={sellPrice}
                                name='sellPrice'
                                onChange={(e) => this.handleChange(e)}
                                type="number"
                                isInvalid={sellPriceError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {sellPriceErrorText}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Discount (%)</Form.Label>
                            <Form.Control
                                value={discount}
                                name='discount'
                                onChange={(e) => this.handleChange(e)}
                                type="number"
                                isInvalid={discountError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {discountErrorText}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Discount Price </Form.Label>
                            <Form.Control
                                value={discountprice}
                                name='discountprice'
                                onChange={(e) => this.handleChange(e)}
                                type="number"
                                disabled
                            />

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="price">
                            <Form.Label>Final Price </Form.Label>
                            <Form.Control
                                value={finalPrice}
                                name='finalPrice'
                                onChange={(e) => this.handleChange(e)}
                                type="number"
                                disabled
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={decription}
                                name='decription'
                                onChange={(e) => this.handleChange(e)}
                                as="textarea"

                            />

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Product
                        </Button>
                    </Form>
                </Container>
                <Toast  />
            </>
        )
    }
}
