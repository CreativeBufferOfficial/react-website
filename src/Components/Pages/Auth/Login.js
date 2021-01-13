import React, { Fragment, useState } from "react";
import { Container, Row, Col, FormControl, Button, Form, Card } from "react-bootstrap";
import history from './../../../@history';
import './styles.css';
import '../../../assets/css/style.css';
import Spinner from '../../Layouts/Spinner';

const Index = () => {   
    const [value, setValue] = useState({
        loading: false,
    });

    const { loading } = value;

    const onContentLoaded = (e) => {
        setValue({ loading: true });
    }
    // history.push('/auth/login')

    return <Fragment onLoad={onContentLoaded}>
        {!loading && <Spinner />}        
            <Container>
                 <Row className="flex-wrap pt--80 overflow-hidden">     
                    <Col className="col-lg-4">&nbsp;</Col>
                    <Col className="col-lg-6 pb--70 login-box">
                        <form>
                            <Card style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' , width: '350px'}}> 
                                <h4 className="pt--20 pb--40 text-center">Login</h4>
                                <Card.Body>
                                    <div>
                                        <Form.Group>
                                            <Form.Label><small>EMAIL ADDRESS</small></Form.Label>
                                            <FormControl placeholder="Enter email" type="email" />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label><small>PASSWORD</small></Form.Label>
                                            <FormControl placeholder="Password" type="password" autoComplete="off"/>
                                        </Form.Group>
                                </div>
                                <div className="text-center">
                                    <Button className="bg-blue">
                                        Login
                                    </Button>
                                </div>
                               </Card.Body>
                            </Card>
                        </form>
                    </Col>   
                    <Col className="col-lg-4">&nbsp;</Col>
                </Row>
            </Container>
    </Fragment>
    
}

export default Index;
