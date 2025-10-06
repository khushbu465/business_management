import React from 'react'
import { Card, CardBody, CardImg, Col, Container, Row } from 'reactstrap'
import FormCom from './FormCom'

const HomePage = () => {
  return (
    <>
      <div className='dashboard_page py-5'>
        <Container >
          <Row className='d-flex justify-content-center'>
            <Col md={10} lg={10} sm={12} className='col-12'>
              <Card>
                <CardBody>
                  <div class="topBgImgHere">
                  </div>
                  <div class="form_starthere pt-3 py-lg-5 px-5">
                    <FormCom />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default HomePage
