import React from "react";
import { Button, TextInput } from "@mantine/core";

import isEmailValidator from "validator/lib/isEmail";

import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import * as yup from "yup";
import { client } from "../../utils/api-client";
import { useActionOnData } from "../../hooks";
import { Navigate, useNavigate } from "react-router-dom";

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

const login = (data: any) => {
  const apiBody = {
    email: data["email"],
    password: data["password"],
  } as const;

  return client({
    method: "post",
    endpoint: "superadmin/login",
    optional: {
      data: apiBody,
    },
  });
};

const Login = () => {
  const navigate = useNavigate();

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

  const { mutateAsync, isPending } = useActionOnData({
    actionFunction: login,
    queryToBeInvalidated: "login",
  });

  if (token) {
    return <Navigate to="/" state={{ path: location.pathname }} />;
  }

  return (
    <form
      onSubmit={form.onSubmit((values: any) =>
        mutateAsync(values)
          .then((res) => localStorage.setItem("token", res.data.data.token))
          .then(() => navigate("/", { replace: true }))
      )}
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
          disabled={!(form.isValid() && form.isDirty) || isPending}
          loading={isPending}
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
