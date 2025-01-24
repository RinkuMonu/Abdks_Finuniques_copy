import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const TransferToBank = () => {
  const [formData, setFormData] = useState({
    beneficiaryName: "",
    accountNumber: "",
    ifscCode: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const isFormValid =
    formData.beneficiaryName &&
    formData.accountNumber &&
    formData.ifscCode &&
    formData.amount;

  return (
    <>
      <Container className="py-5 marginTop">
        <Row>
          {/* Left Side Content */}
          <Col md={6} className="text-center text-md-start">
            <h2 className="fw-bold" style={{color:"#664A86"}}>Online Money Transfer</h2>
            <h3>
              Effortless Money Transfers: Empowering You to Send, Receive, and
              Manage Funds with Speed, Security, and Simplicity – Wherever You
              Go!
            </h3>
          </Col>

          {/* Right Side Form */}
          <Col md={6}>
            <div
              className="p-4 rounded bg-white shadow"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <Form>
                <Form.Group className="mb-3" controlId="beneficiaryName">
                  <Form.Label>Beneficiary Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name on Bank Account"
                    value={formData.beneficiaryName}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="accountNumber">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="ifscCode">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="IFSC Code"
                    value={formData.ifscCode}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="₹ Amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: "#664A86", color: "white" }}
                  disabled={!isFormValid}
                >
                  Confirm
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default TransferToBank;
