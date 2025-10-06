import { Row, Col, Form, FormGroup, Button, Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';


const FormCom = () => {
    const [formData, setFormData] = useState({
        client_name: '',
        product_name: '',
        tentative_date: '',
        institute: '', department: ''
    });
    const [dateError, setDateError] = useState();
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            try {
                setLoading(true)
                const payload = {
                    client_name: formData.client_name,
                    product_name: formData.product_name,
                    tentative_date: formData.tentative_date,
                    institute: formData.institute,
                    department: formData.department,
                }
                toast.success('Data saved successfully')
                // const url = import.meta.env.VITE_APP_BASEURL + "patients/insert";
                // const response = await fetch(url, {
                //     method: "POST",
                //     body: JSON.stringify(payload),
                // });
                // if (response.status === 1) {
                //     toast.success(response.message)
                //     setFormData({
                //         client_name: '',
                //         product_name: '',
                //         tentative_date: '',
                //         institute: '', department: ''
                //     });
                // } else {
                //     setLoading(false)
                //     toast.error(response.message)
                // }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        } else {
            e.target.classList.add('was-validated');
            if (!formData.tentative_date) {
                setDateError('Date of birth is required')
            }
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((pre) => ({ ...pre, [name]: value }));
    };
    return (
        <>
            <Form onSubmit={handleSubmit} noValidate>
                <Row>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label> Client Name  <span className='text-danger'>*</span></Label>
                            <Input type="text" name="client_name" value={formData.client_name} onChange={handleChange} placeholder="Enter Client Name" required />
                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label> Product <span className='text-danger'>*</span></Label>
                            <Input type="text" name="product_name" value={formData.product_name} onChange={handleChange} placeholder="Enter Product Name" required />
                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label for="dob"> Tentative  Date <span className='text-danger'>*</span></Label>
                            <Input type="date"
                                className={`form-control ${dateError ? 'is-invalid' : ''}`} placeholder=" Tentative Date" required
                                value={formData.tentative_date} name="tentative_date"
                                onChange={(e) => { setFormData((pre) => ({ ...pre, tentative_date: e.target.value })); setDateError('') }} />

                            <small className="text-danger">{dateError ? dateError : ''}</small>
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label> Institute <span className='text-danger'>*</span></Label>
                            <Input type="text" name="institute" value={formData.institute} onChange={handleChange} placeholder="Enter Institute Name" required />
                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label> Department <span className='text-danger'>*</span></Label>
                            <Input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter Department Name" required />
                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>

                </Row>
                <FormGroup className="text-center add_new mt-5">
                    {
                        loading ?
                            <Button type="button" className="btn gradient_button  px-4" >
                                <Spinner size="sm" />
                            </Button>
                            : <Button type="submit" className="btn  gradient_button ">
                                Submit
                            </Button>
                    }
                </FormGroup>
            </Form>
        </>
    )
}

export default FormCom
