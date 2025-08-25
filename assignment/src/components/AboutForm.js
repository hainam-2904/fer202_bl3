import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function AboutForm({ data, onChange, onFileChange }) {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    avatar: "",
  });
  const [preview, setPreview] = useState(data.avatar || "");

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      name: data.name.trim() ? "" : "Full name is required.",
      email: /\S+@\S+\.\S+/.test(data.email) ? "" : "Valid email is required.",
    }));
  }, [data.name, data.email]);

  useEffect(() => {
    if (!data.avatar) {
      setPreview("");
      return;
    }
    if (typeof data.avatar === "string") {
      setPreview(data.avatar);
      return;
    }
    const file = data.avatar;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }, [data.avatar]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      onFileChange(null);
      return;
    }
    const allowed = ["image/jpeg", "image/png"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, avatar: "Only JPG/PNG allowed." }));
      onFileChange(null);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: "Max size 2MB." }));
      onFileChange(null);
      return;
    }
    setErrors((prev) => ({ ...prev, avatar: "" }));
    onFileChange(file);
  };

  return (
    <div className="p-3" style={{ background: "#fff", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
      <div className="form-group mb-3">
        <label className="fw-semibold">Full name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="form-group mb-3">
        <label className="fw-semibold">Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          value={data.email}
          onChange={(e) => onChange({ ...data, email: e.target.value })}
          style={{ borderRadius: "8px", padding: "10px" }}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="form-group mb-3">
        <label className="fw-semibold">Avatar (JPG/PNG, ≤2MB)</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleFile}
          style={{ borderRadius: "8px", padding: "6px" }}
        />
        {errors.avatar && <div className="text-danger small mt-1">{errors.avatar}</div>}
      </div>

      {preview && (
        <div className="mb-3 text-center">
          <label className="fw-semibold">Preview</label>
          <div>
            <img
              src={preview}
              alt="avatar preview"
              style={{ maxWidth: 150, borderRadius: "12px", border: "1px solid #ddd", padding: 2 }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

AboutForm.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onFileChange: PropTypes.func.isRequired,
};

export default AboutForm;
