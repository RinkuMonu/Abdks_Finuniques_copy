import React from 'react';
import { Container, Row, Col,} from "react-bootstrap";
import FAQeChallanPayments from './FAQeChallanPayments';
import ShimmerUI from '../../ShimmerUI/ShimmerUI';

const TrafficChallan = () => {
  // const [formData, setFormData] = useState({
  //   operator: "Asianet Digital",
  //   subscriberCode: "",
  // });

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [id]: value,
  //   }));
  // };

  // const isFormValid = formData.operator && formData.subscriberCode.trim();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (isFormValid) {
  //     console.log("Form submitted:", formData);
  //     // Add your form submission logic here
  //   }
  // };

  return (
    <>
      <Container className="py-5">
        <Row>
          {/* Left Side Content */}
          <Col md={6} className="text-center text-md-start">
            <h2 className="fw-bold" style={{color:"#664A86"}}>Hassle-free Traffic Ticket Settlement</h2>
            <h3>
              Navigate the fines and penalties seamlessly with online traffic challan payment.
            </h3>
          </Col>

          {/* Right Side Form */}
          <Col md={6}>
            <div
              className="p-4 rounded bg-white shadow"
              style={{ maxWidth: "400px", margin: "0 auto" }}
            >
              <h5 className="mb-4 text-center">Online Traffic Challan Payment</h5>
              {/* <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="operator">
                  <Form.Label>Operator</Form.Label>
                  <Form.Select
                    id="operator"
                    value={formData.operator}
                    onChange={handleChange}
                  >
                    <option>Asianet Digital</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="subscriberCode">
                  <Form.Label>Subscriber Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Subscriber Code"
                    value={formData.subscriberCode}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  style={{ backgroundColor: '#664A86', color: 'white' }}
                  disabled={!isFormValid} // Disable button if form is not valid
                >
                  Confirm
                </Button>
              </Form> */}
              <ShimmerUI/>
            </div>
          </Col>
        </Row>
      </Container>
      <FAQeChallanPayments />
    </>
  );
};

export default TrafficChallan;
