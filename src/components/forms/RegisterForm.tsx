import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { register } from "../../services/authService";
import { AxiosResponse } from "axios";

// Define Schema of validation with Yup
const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  repassword: Yup.string().required("Password confirmation is required"),
  name: Yup.string().required("Name is required"),
  age: Yup.string().required("Age is required"),
});

// Register Component
const RegisterForm = () => {
  // Define inital auth credentials
  const initialCredentials = {
    email: "",
    password: "",
    repassword: "",
    name: "",
    age: 0,
  };

  return (
    <div>
      <h4>Register Form</h4>
      <Formik
        initialValues={initialCredentials}
        validationSchema={registerSchema}
        onSubmit={async (values) => {
          register(values.email, values.password, values.name, values.age)
            .then((response: AxiosResponse) => {
              if (response.status === 200) {
                if (response.data.token) {
                  sessionStorage.setItem("sessionJWToken", response.data.token);
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

            {/* Password Field */}
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

            {/* Confirm Passowrd Field */}
            <label htmlFor="repassword">Confirm Password</label>
            <Field
              id="repassword"
              type="repassword"
              name="repassword"
              placeholder="********"
            />
            {/* Confirm Password Errors */}
            {errors.repassword && touched.repassword && (
              <ErrorMessage name="repassword" component="div"></ErrorMessage>
            )}

            {/* Name Field */}
            <label htmlFor="name">Name</label>
            <Field id="name" type="text" name="name" placeholder="john" />
            {/* Name Errors */}
            {errors.name && touched.name && (
              <ErrorMessage name="name" component="div"></ErrorMessage>
            )}

            {/* Age Field */}
            <label htmlFor="age">Age</label>
            <Field id="age" type="number" name="age" placeholder="..." />
            {/* Age Errors */}
            {errors.age && touched.age && (
              <ErrorMessage name="age" component="div"></ErrorMessage>
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

export default RegisterForm;
