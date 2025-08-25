import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function AccountForm({ data, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
  });

  useEffect(() => {
    setErrors((prev) => ({ ...prev, username: data.username.trim() ? "" : "Username required." }));

    const pw = data.password || "";
    const pwValid =
      pw.length >= 6 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /[^A-Za-z0-9]/.test(pw);
    setErrors((prev) => ({
      ...prev,
      password: pwValid ? "" : "Password must be ≥6, include upper, lower, special.",
    }));

    setErrors((prev) => ({
      ...prev,
      confirmPassword: pw === data.confirmPassword ? "" : "Passwords do not match.",
    }));

    setErrors((prev) => ({ ...prev, secretQuestion: data.secretQuestion ? "" : "Select a secret question." }));
    setErrors((prev) => ({ ...prev, answer: data.answer.trim() ? "" : "Answer required." }));
  }, [data.username, data.password, data.confirmPassword, data.secretQuestion, data.answer]);

  return (
    <div className="p-3" style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <div className="form-group mb-3">
        <label className="fw-semibold">Username</label>
        <input
          type="text"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          value={data.username}
          onChange={(e) => onChange({ ...data, username: e.target.value })}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
      </div>

      <div className="form-group mb-3">
        <label className="fw-semibold">Password</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={data.password}
            onChange={(e) => onChange({ ...data, password: e.target.value })}
            style={{ borderRadius: "8px", padding: "10px" }}
          />
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
        </div>
      </div>

      <div className="form-group mb-3">
        <label className="fw-semibold">Confirm Password</label>
        <input
          type="password"
          className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
          value={data.confirmPassword}
          onChange={(e) => onChange({ ...data, confirmPassword: e.target.value })}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
        {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
      </div>

      <div className="form-group mb-3">
        <label className="fw-semibold">Secret Question</label>
        <select
          className={`form-select ${errors.secretQuestion ? "is-invalid" : ""}`}
          value={data.secretQuestion}
          onChange={(e) => onChange({ ...data, secretQuestion: e.target.value })}
          style={{ borderRadius: "8px", padding: "10px" }}
        >
          <option value="">-- Select a question --</option>
          <option value="What is your favorite color?">What is your favorite color?</option>
          <option value="What is your pet's name?">What is your pet's name?</option>
          <option value="What city were you born?">What city were you born?</option>
        </select>
        {errors.secretQuestion && <div className="invalid-feedback">{errors.secretQuestion}</div>}
      </div>

      <div className="form-group mb-3">
        <label className="fw-semibold">Answer</label>
        <input
          type="text"
          className={`form-control ${errors.answer ? "is-invalid" : ""}`}
          value={data.answer}
          onChange={(e) => onChange({ ...data, answer: e.target.value })}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
        {errors.answer && <div className="invalid-feedback">{errors.answer}</div>}
      </div>
    </div>
  );
}

AccountForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AccountForm;
