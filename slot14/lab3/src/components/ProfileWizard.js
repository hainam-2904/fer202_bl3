import React, { useReducer, useMemo, useCallback, useState } from "react";
import { Modal, Nav, ProgressBar, Button, Toast, ToastContainer } from "react-bootstrap";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import ProfilePreview from "./ProfilePreview";

// Reducer để quản lý state form đa bước
const initialState = {
  step: 0,
  about: { name: "", age: "", email: "" },
  account: { username: "", password: "", confirmPassword: "", question: "", answer: "" },
  address: { country: "", city: "", street: "" },
  avatar: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "NEXT":
      return { ...state, step: state.step + 1 };
    case "PREV":
      return { ...state, step: state.step - 1 };
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.section]: { ...state[action.section], [action.field]: action.value },
      };
    case "SET_AVATAR":
      return { ...state, avatar: action.file };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function ProfileWizard({ show, handleClose }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showPreview, setShowPreview] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const steps = ["About", "Account", "Address"];

  // Tính phần trăm tiến độ
  const progress = useMemo(() => ((state.step + 1) / steps.length) * 100, [state.step]);

  // Validation cho từng bước
  const isStepValid = useMemo(() => {
    switch (state.step) {
      case 0: {
        const { name, age, email } = state.about;
        return name && age && email;
      }
      case 1: {
        const { username, password, confirmPassword, question, answer } = state.account;
        const usernameValid = username.length >= 6;
        const passwordValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
        return usernameValid && passwordValid && password === confirmPassword && question && answer;
      }
      case 2: {
        const { country, city, street } = state.address;
        return country && city && street;
      }
      default:
        return false;
    }
  }, [state]);

  // Handlers
  const nextStep = useCallback(() => dispatch({ type: "NEXT" }), []);
  const prevStep = useCallback(() => dispatch({ type: "PREV" }), []);
  const onFieldChange = useCallback((section, field, value) => {
    dispatch({ type: "UPDATE_FIELD", section, field, value });
  }, []);
  const onFileChange = useCallback((file) => dispatch({ type: "SET_AVATAR", file }), []);

  const handleFinish = () => {
    setShowPreview(true);
    setShowToast(true); // 👉 hiện toast message
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Build your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav variant="tabs" activeKey={state.step}>
            {steps.map((s, i) => (
              <Nav.Item key={i}>
                <Nav.Link eventKey={i} disabled>
                  {s}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          <ProgressBar now={progress} className="my-3" />

          {state.step === 0 && (
            <AboutForm data={state.about} onChange={onFieldChange} onFileChange={onFileChange} />
          )}
          {state.step === 1 && <AccountForm data={state.account} onChange={onFieldChange} />}
          {state.step === 2 && <AddressForm data={state.address} onChange={onFieldChange} />}
        </Modal.Body>
        <Modal.Footer>
          {state.step > 0 && (
            <Button variant="secondary" onClick={prevStep}>
              Previous
            </Button>
          )}
          {state.step < steps.length - 1 && (
            <Button variant="primary" onClick={nextStep} disabled={!isStepValid}>
              Next
            </Button>
          )}
          {state.step === steps.length - 1 && (
            <Button variant="success" onClick={handleFinish} disabled={!isStepValid}>
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Modal Preview Profile */}
      <ProfilePreview show={showPreview} handleClose={() => setShowPreview(false)} data={state} />


      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={300000}
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ProfileWizard;
