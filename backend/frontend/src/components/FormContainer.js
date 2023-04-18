import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
    return (
        <Container fluid className='container-box-shadow form-container-custom-container position-relative col-md-8 py-5'>
            <Row className="justify-content-md-center">
                <Col className="px-5">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
