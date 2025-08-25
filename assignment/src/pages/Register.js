import React, { useState, useContext, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import AboutForm from "../components/AboutForm";
import AccountForm from "../components/AccountForm";

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const Register = () => {
  const { register, setRedirectAfterLogin } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get("redirect_uri") || "/";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatar: null,
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
  });

  const handleAboutChange = useCallback(
    (about) => setFormData((s) => ({ ...s, name: about.name, email: about.email })),
    []
  );
  const handleFileChange = useCallback((file) => setFormData((s) => ({ ...s, avatar: file })), []);
  const handleAccountChange = useCallback((acct) => setFormData((s) => ({ ...s, ...acct })), []);

  const isStepValid = useMemo(() => {
    if (step === 1) {
      return formData.name.trim() !== "" && /\S+@\S+\.\S+/.test(formData.email);
    }
    const pw = formData.password || "";
    const pwValid =
      pw.length >= 6 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[^A-Za-z0-9]/.test(pw);
    const confirmMatch = pw === formData.confirmPassword;
    return (
      formData.username.trim() !== "" &&
      pwValid &&
      confirmMatch &&
      formData.secretQuestion &&
      formData.answer.trim()
    );
  }, [step, formData]);

  const next = () => {
    if (!isStepValid) {
      showToast("Please fix validation errors before continuing.", "danger");
      return;
    }
    setStep((s) => Math.min(2, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isStepValid) {
      showToast("Please fix validation errors before submitting.", "danger");
      return;
    }

    const avatarData =
      typeof formData.avatar === "string" ? formData.avatar : await readFileAsDataURL(formData.avatar);

    const payload = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      secretQuestion: formData.secretQuestion,
      answer: formData.answer,
      avatar: avatarData || "/images/default-avatar.png",
      wishlist: [],
    };

    try {
      await register(payload);
      setRedirectAfterLogin(redirect);
      showToast("Registration successful. You are now signed in.", "success");
      navigate(redirect);
    } catch (err) {
      console.error(err);
      showToast("Registration failed. Please try again.", "danger");
    }
  };

  return (
    <section className="container my-4" style={{ maxWidth: 700 }}>
      <h3 className="mb-3">Create account</h3>
      <div className="mb-2">
        <div className="progress" style={{ height: 8 }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${(step / 2) * 100}%` }}
            aria-valuenow={(step / 2) * 100}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <AboutForm
            data={{ name: formData.name, email: formData.email, avatar: formData.avatar }}
            onChange={(d) => handleAboutChange(d)}
            onFileChange={handleFileChange}
          />
        )}

        {step === 2 && (
          <AccountForm
            data={{
              username: formData.username,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
              secretQuestion: formData.secretQuestion,
              answer: formData.answer,
            }}
            onChange={(d) =>
              handleAccountChange({
                username: d.username,
                password: d.password,
                confirmPassword: d.confirmPassword,
                secretQuestion: d.secretQuestion,
                answer: d.answer,
              })
            }
          />
        )}

        <div className="d-flex gap-2 mt-3">
          {step > 1 && (
            <button type="button" className="btn btn-outline-secondary" onClick={prev}>
              Previous
            </button>
          )}
          {step < 2 && (
            <button type="button" className="btn btn-primary" onClick={next}>
              Next
            </button>
          )}
          {step === 2 && (
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Register;
