import React, { useState } from "react";
import { Button, Link, TextField } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../redux/auth/auth.action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 6 characters")
    .max(15, "Password must be less than 15 characters")
    .required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(() => {
        // Validation passed
        console.log("submit successfully: ", formData);
        dispatch(loginUserAction({ data: formData }));
        navigate("/");
      })
      .catch((validationErrors) => {
        // Validation failed
        const newErrors = {};
        validationErrors.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      });
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-5">
          <div>
            <TextField
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              type="text"
              variant="outlined"
              fullWidth
            />
            {errors.email && <div className="text-red-500">{errors.email}</div>}
          </div>

          <div>
            <TextField
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              variant="outlined"
              fullWidth
            />
            {errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>
        </div>

        <Button
          sx={{ padding: ".8rem 0rem" }}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          Login
        </Button>
      </form>

      <div className="flex justify-center items-center gap-2 pt-5">
        <p>If you don't have any account ?</p>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/register")}
        >
          Register new account
        </Link>
      </div>
    </>
  );
};

export default Login;
