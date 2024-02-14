import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Button,
  FormControlLabel,
  Link,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { registerUserAction } from "../../redux/auth/auth.action";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password must be less than 15 characters")
    .required("Password is required"),
});

const Register = () => {
  const initialValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    gender: "",
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [gender, setGender] = useState("");

  const handleSubmit = (values) => {
    values.gender = gender;
    console.log("submit successfully: ", values);
    dispatch(registerUserAction({ data: values }));
  };

  const handleRadioChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className="space-y-5">
          <div className="space-y-5">
            <div>
              <Field
                as={TextField}
                name="firstName"
                placeholder="First Name"
                type="text"
                variant="outlined"
                fullWidth
              />

              <ErrorMessage
                name="firstName"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="lastName"
                placeholder="Last Name"
                type="text"
                variant="outlined"
                fullWidth
              />

              <ErrorMessage
                name="lastName"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />

              <ErrorMessage
                name="email"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />

              <ErrorMessage
                name="password"
                component={"div"}
                className="text-red-500"
              />
            </div>

            <div>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
              <ErrorMessage
                name="gender"
                component={"div"}
                className="text-red-500"
              />
            </div>
          </div>

          <Button
            sx={{ padding: ".8rem 0rem" }}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </Form>
      </Formik>

      <div className="flex justify-center items-center gap-2 pt-5">
        <p>If you already have account ?</p>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          Login here
        </Link>
      </div>
    </>
  );
};

export default Register;
