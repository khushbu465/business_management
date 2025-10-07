import React, { useState } from 'react'
import { Row, Col, CardBody, Card, Spinner, Container, InputGroupText, Form, Input, InputGroup, FormGroup, FormFeedback, Button, Label, } from "reactstrap";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "m14", password: "12345"
    });
    const [loading, setLoading] = useState();
    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData((pre) => ({ ...pre, [name]: value }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.checkValidity()) {
            try {
                setLoading(true)
                const payload = {
                    username: "m14",
                    pwd: "12345",
                }

                const url = import.meta.env.VITE_APP_BASEURL + "adminusers/login";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });
                const results = await response.json();
                if (results.status === 1) {
                    const token = results.data.token;
                    const userID = results.data.name;
                    localStorage.setItem("token", token);
                    localStorage.setItem("user", userID);
                    sessionStorage.setItem("token", token);
                    navigate('/dashboard')
                    toast.success(response.message)
                    setFormData({
                        username: "", password: ""
                    });
                } else {
                    setLoading(false)
                    toast.error(response.message)
                }
            } catch (err) {
                setLoading(false)
                console.log(err)
            }
        } else {
            e.target.classList.add('was-validated');

        }
    };
    return (
        <>
            <section className="account-pages ">
                <div className='bg_layer'>
                    <Container >
                        <Row className='d-flex justify-content-center content-middle align-middle ' style={{ height: '100vh' }}>
                            <Col lg={5} xl={5} md={12} sm={12} className=" col-12 loginboX_startHere">
                                <Card className='login_box'>
                                    <CardBody className='p-0'>
                                        <div className="add_on_mobile">
                                            <div className=" overflow-hidden " >
                                                <Row className="">
                                                    <Col xs={12} className="text-center">
                                                        <h2 className="fw- text-dark"> Login</h2>
                                                    </Col>
                                                </Row>
                                                <div className="pt-0 ">
                                                    <div className="p-2 mt-4">
                                                        <Form
                                                            className="form-horizontal login_form"
                                                            onSubmit={handleSubmit} noValidate
                                                        >
                                                            <div className="mb-4">
                                                                <FormGroup>
                                                                    <Label>Username <span className='text-danger'>*</span></Label>
                                                                    <Input
                                                                        name="username"
                                                                        autoComplete="off"
                                                                        className="form-control"
                                                                        placeholder="Enter Username"
                                                                        type="text"
                                                                        onChange={handleChange}
                                                                        value={formData.username} required
                                                                    />
                                                                    <FormFeedback>Username is required</FormFeedback>
                                                                </FormGroup>
                                                            </div>
                                                            <div className="mb-5">
                                                                <FormGroup>
                                                                    <Label>Password <span className='text-danger'>*</span></Label>
                                                                    <Input
                                                                        name="password"
                                                                        autoComplete="off"
                                                                        className="form-control"
                                                                        placeholder="Enter Password"
                                                                        type="password"
                                                                        onChange={handleChange}
                                                                        value={formData.password} required
                                                                    />
                                                                    <FormFeedback>Password is required</FormFeedback>
                                                                </FormGroup>
                                                            </div>
                                                            <div className="mt-5 mb-3 d-grid ">
                                                                <Button
                                                                    className="btn gradient_button btn-info   btn-block"
                                                                    type="submit"
                                                                >
                                                                    {loading ? <Spinner size={'sm'} /> : (<>
                                                                        Login <i className="mdi mdi-arrow-right-thick"></i></>
                                                                    )}
                                                                </Button>
                                                            </div>

                                                        </Form>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>


                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </>
    )
}

export default LoginPage
