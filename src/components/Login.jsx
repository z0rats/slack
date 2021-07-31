import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Row, Col, Card, Image,
} from 'react-bootstrap';

import logo from '../assets/loginCat.gif';
import LoginForm from './forms/LoginForm.jsx';

// eslint-disable-next-line arrow-body-style
const Login = () => {
  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={logo} alt="Войти" thumbnail />
              </div>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
