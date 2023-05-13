import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../services/authService";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

// Define Schema of validation with Yup
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

// Login Component
const LoginForm = () => {
  // Define inital auth credentials
  const initialCredentials = {
    email: "",
    password: "",
  };

  let navigate = useNavigate();

  return (
    <div>
      <h4>Login Form</h4>
      <Formik
        initialValues={initialCredentials}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          login(values.email, values.password)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                if (response.data.token) {
                  sessionStorage.setItem("sessionJWToken", response.data.token);
                  navigate("/");
                } else {
                  throw new Error("Error generating auth token");
                }
              } else {
                throw new Error("Invalid credentials");
              }
            })
            .catch((error) => {
              console.log(`[LOGIN ERROR] Something where wrong: ${error}`);
            });
        }}
      >
        {({
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form>
            {/* Email Field */}
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              type="email"
              name="email"
              placeholder="example@email.com"
            />
            {/* Email Errors */}
            {errors.email && touched.email && (
              <ErrorMessage name="email" component="div"></ErrorMessage>
            )}

            {/* Passowrd Field */}
            <label htmlFor="password">Passowrd</label>
            <Field
              id="password"
              type="password"
              name="password"
              placeholder="********"
            />
            {/* Password Errors */}
            {errors.password && touched.password && (
              <ErrorMessage name="password" component="div"></ErrorMessage>
            )}

            {/* Submit */}
            <button type="submit">Login</button>

            {isSubmitting ? <p>Checking credentials...</p> : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
