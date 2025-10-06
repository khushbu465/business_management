import React from 'react'
import { Card, CardBody, CardImg, Col, Container, Row } from 'reactstrap'
import FormCom from './FormCom'

const HomePage = () => {
  return (
    <>
      <div className='dashboard_page py-5'>
        <Container >
          <Row className='d-flex justify-content-center'>
            <Col md={10}>
              <Card>
                <CardBody>
                  {/* <CardImg src='https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1LzktMjYtdC0xMzU5MS5qcGc.jpg' alt='top_img' /> */}
                  <div class="topBgImgHere">
                    <div class="lightLayer">
                    <h2>Business Management <br/> System</h2>
                  </div>
                  </div>
                  <div class="form_starthere py-lg-5 px-5">
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
