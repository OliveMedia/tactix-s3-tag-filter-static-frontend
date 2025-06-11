import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";

import isEmailValidator from "validator/lib/isEmail";

import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required")
    .test(
      "is-valid",
      "Email is invalid",
      (value) => typeof value === "string" && isEmailValidator(value)
    ),
  password: yup
    .string()
    .matches(/^\S/, "Name cannot start with white space")
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      password: "",
      email: "",
    },
    validate: yupResolver(signInValidationSchema),
  });

  if (token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return (
    <form
      onSubmit={form.onSubmit((values: any) => {
        setIsLoading(true); // 🔹 Start loading

        if (
          values.email === "kigan.khadka+admin@olivegroup.io" &&
          values.password === "adminPassword@1"
        ) {
          setTimeout(() => {
            setIsLoading(false);
            notifications.show({
              color: "teal",
              title: "Action successfull",
              message: "Logged into application successfully",
            });
            navigate("/", { replace: true });
            localStorage.setItem(
              "token",
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiIsImtpZCI6ImJhNmRlYWUzYzk1NjU3ZWExMTM0NjkwOGNhYzBiMTYzIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzQ5NjI1NDM0LCJleHAiOjIwNjQ5ODU0MzQsImVtYWlsIjoiYWRtaW5AeW9wbWFpbC5jb20ifQ.MJ7rqgZfl5rvfj5G88X4Uf7TS9v9f016lPVZCysV0Sr6TJmIanNUueE09yhiKMt2ez5PkBxHbxDZKy8EOV6OXQ"
            );
          }, 2000);
        } else {
          setTimeout(() => {
            setIsLoading(false);
            notifications.show({
              color: "red",
              title: "Error occured while logging in",
              message:
                "It looks like you entered incorrect email or password. Please try again!",
            });
          }, 2000);
        }
      })}
      className="auth  flex text-secondary-foreground justify-center items-center h-screen"
    >
      <div className="flex bg-gray-50 dark:bg-secondary text-secondary dark:text-white flex-col gap-[30px] border-[1px] border-borderOutline p-[60px] w-[588px] rounded shadow-boxShadow">
        <div className="text-base font-semibold text-center">Sign In</div>

        <div className="flex  gap-5 w-full flex-col relative">
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            withAsterisk
            label="Password"
            type="password"
            placeholder="Enter Password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
        </div>

        <Button
          type="submit"
          disabled={!(form.isValid() && form.isDirty) || isLoading}
          loading={isLoading}
          loaderProps={{
            type: "oval",
          }}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Login;
