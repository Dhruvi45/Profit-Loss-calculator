import React, { useState } from 'react';
import './App.css';
import { useForm } from "react-hook-form";
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [result, setresult] = useState();
  const [color, setcolor] = useState();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const calculateProfitLoss = (data) => {
    const finalPrice = data.price
    const initialPrice = data.stocks
    const noOfStocks = data.final
    if (finalPrice > initialPrice) {
      const profit = (finalPrice - initialPrice) * noOfStocks;
      setresult(`Congrats you made a profit of ${profit} and the profit percent is ${((profit / (initialPrice * noOfStocks)) * 100).toFixed(2)}%.`)
      setcolor("green")
    } else
      if (initialPrice > finalPrice) {
        const loss = (initialPrice - finalPrice) * noOfStocks; 
        setresult(`Oops! You made a loss of ${loss} and the loss percent is ${((loss / (initialPrice * initialPrice)) * 100).toFixed(2)}%.`)
        setcolor("red")
      } else {
        setresult("Neither a loss nor a profit.")
        setcolor("blue")
      }
  }
  return (
    <>
      <Container fluid >
        <Card style={{ width: '50rem', marginLeft: '17rem', marginTop: '6rem' }} >
          <Card.Header className='text-center h3'>Profit/Loss calculator</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(calculateProfitLoss)}>
              <Row>
                <Col>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Initial Price</Form.Label>
                    <Form.Control
                      controlId="initial-price"
                      type="number"
                      placeholder="Enter initial price"
                      {...register("price", { required: true })} />
                  </Form.Group>
                  {errors.stocks && <span className='text-danger'>This field is required</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Number of Stocks</Form.Label>
                    <Form.Control
                      controlId="no-of-stocks" type="number" placeholder="Enter number of stocks"
                      {...register("stocks", { required: true })} />
                  </Form.Group>
                  {errors.stocks && <span className='text-danger'>This field is required</span>}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Final Price</Form.Label>
                    <Form.Control
                      controlId="final-price" type="number" placeholder="Enter final price"
                      {...register("final", { required: true })} />
                  </Form.Group>
                  {errors.stocks && <span className='text-danger'>This field is required</span>}
                </Col>
              </Row>
              <Row>
                <Col className='text-center'>
                  <Button className='btn btn-light' type='submit'>Calculate</Button>
                </Col>
              </Row>
            </Form>
            <p className={color === 'red' ? 'text-danger' : color === 'green' ? 'text-success' : 'text-primary'}>{result}</p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;
