import React, { useState } from "react";
import './kyc.css'
import AadharCard from "./AadharCard";
import BankDetails from "./BankDetails";
import PanDetails from "./PanDetails";
import axios from 'axios'; 
// import ClipLoader from "react-spinners/ClipLoader";
import Lottie from 'react-lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import * as animation from '../../Assets/Animation.json'
// https://finpay-backend.onrender.com/api/auth/aadhar-verify
const API_URL = "https://finpay-backend.onrender.com/api/auth/aadhar-verify"

export default function KYC() {
    const userId=localStorage.getItem("id")
    console.log(userId);
    
    const [currentStep, setCurrentStep] = useState(1);
    const [showAadharDetails, setShowAadharDetails] = useState(false);
    const [data, setData] = useState("")
    const [showBankDetails, setShowBankDetails] = useState(false);
    const [showPanDetails, setShowPanDetails] = useState(false);
    const [aadharNumber, setAadhaarNumber] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [panCard, setPanCard] = useState("")
    const [ifsc, setIfsc] = useState("")
    const [loading, setLoading] = useState(false)
    const [sendingOtp, setSendingOtp] = useState(false);
    const [verifyingOtp, setVerifyingOtp] = useState(false);
    const [clientId, setClientId] = useState(null)
    const [message, setMessage] = useState("")
    const [pandata, setpandata] = useState("")
    const [bankData, setBankData] = useState("")
    const [color, setColor] = useState('#872d67')
    const [otp, setOtp] = useState("");
    const [formData, setFormData] = useState({
        aadharNumber: "",
        otp: "",
        bankAccount: "",
        panCard: "",
    });

    const [otpSent, setOtpSent] = useState(false);

    const steps = [
        { id: 1, label: "Aadhar Details" },
        { id: 2, label: "Bank Details" },
        { id: 3, label: "Pan Card Details" },
        { id: 4, label: "Submit" },
    ];

    // Validation for Next Button
    const isStepValid = () => {
        if (currentStep === 1) return aadharNumber.length === 12 && otp.length === 6;
        if (currentStep === 2) return bankAccount.length >= 9;
        if (currentStep === 3) return panCard.length === 10;
        return true;
    };

    const handleNext = () => {
        if (isStepValid() && currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };



    const handleSendOTP = async () => {
        // if (formData.aadharNumber.length === 12) {
        //     setOtpSent(true);
        // }
        if (!aadharNumber.match(/^\d{12}$/)) {
            setMessage("कृपया सही 12 अंकों का आधार नंबर डालें");
            return;
        }
        setMessage("");
        setSendingOtp(true);

        try {
            const response = await axios.post(
                API_URL,
                { aadharNumber },

            );
            console.log("responseeeeee", response)
            console.log("data", response.data.data.data.client_id);

            setClientId(response.data.data.data.client_id);
            setMessage("OTP भेजा गया है, कृपया OTP दर्ज करें");
        } catch (error) {
            setMessage("OTP भेजने में समस्या हुई, कृपया पुनः प्रयास करें");
        }
        setSendingOtp(false);
        setOtpSent(true);
    };



    const handleVerifyOTP = async () => {
        if (!otp.match(/^\d{6}$/)) {
            setMessage("कृपया सही 6 अंकों का OTP दर्ज करें");
            return;
        }
        setMessage("");
        setColor("#ededed")
        setVerifyingOtp(true);


        try {
            const response = await axios.post(
                "https://finpay-backend.onrender.com/api/auth/submit-aadhar-otp",
                { aadharNumber, otp, client_id: clientId ,userId},
                {
                    // headers: {
                    //   "Content-Type": "application/json",
                    //   Authorization: `Bearer YOUR_API_KEY`,
                    // },
                }
            );
            console.log("responseeeeee", response)
            console.log("data", response.data.data.data.client_id);
            setMessage("OTP सत्यापन सफल");
            setData(response.data.data.data)
        } catch (error) {
            setMessage("❌ OTP सत्यापन असफल, कृपया पुनः प्रयास करें");
        }
        setVerifyingOtp(false);
        setShowAadharDetails(true)

    };

    const handleSubmitBankDetails = async () => {
        if (formData.bankAccount.length >= 9) {
            setShowBankDetails(true);
        }
        setLoading(true);
        try {
            const response = await axios.post("https://finpay-backend.onrender.com/api/auth/verifybank",
                { id_number: bankAccount, ifsc,userId }

            )
            setBankData(response)
            console.log(".....", response)
            // alert("Successful")
        } catch (error) {
            alert("Verification failed. Please try again.")

        }
        finally {
            setLoading(false); 
          }
        // setLoading(false);
        setShowBankDetails(true)
    };

    const handleSubmitPANCardDetails = async () => {
        if (formData.panCard.length === 10) {
            setShowPanDetails(true);
        }
        setLoading(true);
        try {
            const response = await axios.post("https://finpay-backend.onrender.com/api/auth/verifyPAN",
                { id_number: panCard ,userId}
            )
            console.log(".....pan", response)
            setpandata(response)

            // alert("success")
        }
        catch (error) {
            alert("Verification failed. Please try again.")
        }finally {
            setLoading(false);
          }
        // setLoading(false);
        setShowPanDetails(true)
    }

   

    return (
        <>
            <section className="hero-section-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="kyc_section">
                                {/* <h1>KYC</h1> */}
                                {/* Stepper UI */}
                                <div className="container my-4 text-center">
                                    <div className="d-flex justify-content-center align-items-center mb-4">
                                        {steps.map((step, index) => (
                                            <React.Fragment key={step.id}>
                                                <div className="d-flex flex-row align-items-center w-100 gap-3">
                                                    <div
                                                        className={`step-circle d-flex align-items-center justify-content-center ${step.id < currentStep
                                                            ? "bg-success text-white"
                                                            : step.id === currentStep
                                                                ? "border border-primary text-primary"
                                                                : "bg-light text-secondary"
                                                            }`}
                                                    >
                                                        {step.id < currentStep ? "✔" : step.id}
                                                    </div>
                                                    <div
                                                        className={`${step.id <= currentStep
                                                            ? "text-primary"
                                                            : "text-secondary"
                                                            }`}
                                                    >
                                                        {step.label}
                                                    </div>
                                                </div>
                                                {index !== steps.length - 1 && (
                                                    <div
                                                        className={`step-line ${step.id < currentStep ? "bg-success" : "bg-light"
                                                            }`}
                                                    ></div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>

                                    {/* Dynamic Forms Based on Steps */}
                                    <div className="form-section">
                                    {currentStep === 1 && (
        <div className="container text-left">
            <div className="aadhar_card">
                <h3 className="mb-3">Aadhar Details</h3>

                <div className="row">
                    {/* Aadhar Input Section */}
                    <div className="col-md-6 d-flex align-items-center gap-2">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter 12-digit Aadhar Number"
                            maxLength={12}
                            value={aadharNumber}
                            onChange={(e) => setAadhaarNumber(e.target.value)}
                        />
                        <button 
                            className="otpBtn d-flex align-items-center justify-content-center" 
                            onClick={handleSendOTP} 
                            disabled={loading}
                            style={{ minWidth: "120px", height: "40px" }}
                        >
                            {sendingOtp ? (
                                <DotLottieReact 
                                    src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie" 
                                    height={30} 
                                    width={30}
                                    loop autoplay 
                                />
                            ) : (
                                "Send OTP"
                            )}
                        </button>
                    </div>
                    {/* Display Message */}
                    <p className="mt-2 d-flex align-items-start">{message}</p>
                    

                    {/* OTP Input Section */}
                    {otpSent && (
                        <div className="col-md-6 d-flex align-items-center gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            {/* <div>{message}</div> */}
                            <button 
                                className="otpBtn d-flex align-items-center justify-content-center" 
                                onClick={handleVerifyOTP} 
                                disabled={loading}
                                style={{ minWidth: "100px", height: "40px" }}
                            >
                                {verifyingOtp ? (
                                    <DotLottieReact 
                                        src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie" 
                                        height={30} 
                                        width={30}
                                        loop autoplay 
                                    />
                                ) : (
                                    "Verify"
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Aadhar Details Display */}
            {showAadharDetails && <AadharCard data={data} />}
        </div>
    )}
                                        {currentStep === 2 && (
                                            <div className="container" style={{ textAlign: "left" }}>
                                                <div className="bank_card">
                                                    <h3>Bank Details</h3>

                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Bank Account Number"
                                                                value={bankAccount}
                                                                onChange={(e) => setBankAccount(e.target.value)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter Ifsc"
                                                                value={ifsc}
                                                                onChange={(e) => setIfsc(e.target.value)

                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-md-4 mt-1">
                                                        <button className="submitBtn" onClick={handleSubmitBankDetails} disabled={loading}>
                  {loading ? (
                    <DotLottieReact src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie" autoplay loop style={{ width: 30, height: 30 }} />
                  ) : (
                    "Submit"
                  )}
                </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {showBankDetails && (
                                                    <BankDetails bankData={bankData} />
                                                )}
                                            </div>
                                        )}

                                        {currentStep === 3 && (
                                            <div className="container" style={{ textAlign: "left" }}>

                                                <div className="pan_card">
                                                    <h3>PAN Card Details</h3>
                                                    <div className="row">
                                                        <div className="col-md-8">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                placeholder="Enter PAN Card Number"
                                                                maxLength={10}
                                                                value={panCard}
                                                                onChange={(e) => setPanCard(e.target.value)
                                                                }
                                                            />
                                                        </div>
                                                        <div className="col-md-4 mt-1">
                                                        <button className="submitBtn" onClick={handleSubmitPANCardDetails} disabled={loading}>
                  {loading ? (
                    <DotLottieReact src="https://lottie.host/faaf7fb5-6078-4f3e-9f15-05b0964cdb4f/XCcsBA5RNq.lottie" autoplay loop style={{ width: 30, height: 30 }} />
                  ) : (
                    "Submit"
                  )}
                </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {showPanDetails && (
                                                    <PanDetails pandata={pandata} />
                                                )}
                                            </div>
                                        )}
                                        {currentStep === 4 && (
                                            <div>
                                                <h3>Submit KYC</h3>
                                                <p>All details have been entered correctly.</p>
                                                <button className="btn btn-success">Submit</button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-flex justify-content-between mt-4">
                                        <button
                                            className="btn btn-secondary BackBtn me-2"
                                            onClick={handleBack}
                                            disabled={currentStep === 1}
                                        >
                                            Back
                                        </button>
                                        <button
                                            className="btn NextBtn"
                                            onClick={handleNext}
                                            disabled={!isStepValid || currentStep === steps.length}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
