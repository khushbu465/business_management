import { Row, Col, Form, FormGroup, Button, Input, Label, FormFeedback, Modal, ModalHeader, ModalBody, Spinner } from 'reactstrap'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import { GetCity, GetCountries, GetState } from 'react-country-state-city';
import Select from 'react-select';


const FormCom = () => {
    const [formData, setFormData] = useState({
        client_name: '',
        product_name: '',
        tentative_date: '',
        institute: '', department: ''
    });
    const [selectedState, setSelectedState] = useState("");
    const [stateList, setStateList] = useState([]);
    const [error, setError] = useState("");

    const [dateError, setDateError] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStates();
    }, []);

    //load states
    const loadStates = async () => {
        const stateList = await GetState(101);
        const formattedStates = stateList.map((state) => ({
            label: state.name,
            value: state.id,
            ...state,
        }));
        setStateList(formattedStates);
    };
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
            if (!selectedState) {
                setError('State is required')
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
                            <Label> Product <span className='text-danger'>*</span></Label>
                            <Input type="select" name="product_name" value={formData.product_name} onChange={handleChange} required  >
                                <option value="">Select Product</option>
                                <option value="University Management System">University Management System</option>
                                <option value="Learning Management System">Learning Management System</option>
                                <option value="Game Parlor Management System">Game Parlor Management System</option>
                                <option value="Clinic Management System">Clinic Management System</option>
                                <option value="Salon Management System">Salon Management System</option>
                                <option value="Cold Storage Software">Cold Storage Software</option>
                                <option value="Inventory Management System">Inventory Management System</option>
                            </Input>

                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label> Client Name  <span className='text-danger'>*</span></Label>
                            <Input type="text" name="client_name" value={formData.client_name} onChange={handleChange} placeholder="Enter Client Name" required />
                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label for="dob"> Tentative  Date of Project Starting <span className='text-danger'>*</span></Label>
                            <Input type="date"
                                className={`form-control ${dateError ? 'is-invalid' : ''}`} placeholder=" Tentative Date" required
                                value={formData.tentative_date} name="tentative_date"
                                onChange={(e) => { setFormData((pre) => ({ ...pre, tentative_date: e.target.value })); setDateError('') }} />

                            <small className="text-danger">{dateError ? dateError : ''}</small>
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label> Institute/Department <span className='text-danger'>*</span></Label>
                            <Input type="text" name="institute" value={formData.institute} onChange={handleChange} placeholder="Enter Institute/Department Name" required />
                            <FormFeedback>This field is required</FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col lg={6} md={12} >
                        <FormGroup>
                            <Label> State <span className='text-danger'>*</span></Label>
                            <Select
                                value={selectedState ? selectedState : ''}
                                className={error ? "its_require" : ''}
                                name="state_province"
                                id="state"
                                options={stateList}
                                onChange={(selectedOption) => {
                                    setSelectedState(selectedOption);
                                    setError('');
                                }}
                                placeholder="Select State"
                                isSearchable={true} required
                            />
                            <small className='text-danger'>{error ? error : ''}</small>
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
