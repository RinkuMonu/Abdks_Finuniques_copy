import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import FAQDataCardRecharge from "./FAQDataCardRecharge";
import DataCardBrowsePlan from "./DataCardBrowsePlan";

const DataCardRecharge = () => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  const [formData, setFormData] = useState({
    mobileNumber: "",
    operator: "",
    circle: "",
    amount: "",
    connectionType: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      connectionType: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const isFormValid =
    formData.mobileNumber &&
    formData.operator &&
    formData.circle &&
    formData.amount &&
    formData.connectionType;

  return (
    <>
      <Container className="py-5">
        <Row>
          {/* Left Side Content */}
          <Col md={6} className="text-center text-md-start">
            <h2 className="fw-bold">Fuel Your Connectivity with Datacard Recharge</h2>
            <p>Energize Your Online Experience with Datacard Recharge.</p>
          </Col>

          {/* Right Side Form */}
          <Col md={6}>
            <div
              className="p-4 rounded bg-white shadow"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <h5 className="mb-4 text-center">Data Card Recharge Online</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                  />
                </Form.Group>

                {formData.mobileNumber && (
                  <Form.Group className="mb-3">
                    <div>
                      <Form.Check
                        type="radio"
                        id="prepaid"
                        label="Prepaid"
                        value="Prepaid"
                        checked={formData.connectionType === "Prepaid"}
                        onChange={handleRadioChange}
                        inline
                      />
                      <Form.Check
                        type="radio"
                        id="postpaid"
                        label="Postpaid"
                        value="Postpaid"
                        checked={formData.connectionType === "Postpaid"}
                        onChange={handleRadioChange}
                        inline
                      />
                    </div>
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="operator">
                  <Form.Label>Operator</Form.Label>
                  <Form.Select value={formData.operator} onChange={handleChange}>
                    <option value="">Select Operator</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Jio">Jio</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="circle">
                  <Form.Label>Circle</Form.Label>
                  <Form.Select value={formData.circle} onChange={handleChange}>
                    <option value="">Select Circle</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="number"
                      placeholder="₹ Amount"
                      value={formData.amount}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      aria-label="Check Plans"
                      onClick={handleModalOpen}
                    >
                      Check Plans
                    </button>
                  </div>
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

      <FAQDataCardRecharge />

      <Modal show={showModal} onHide={handleModalClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Browse Plans</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DataCardBrowsePlan />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DataCardRecharge;
