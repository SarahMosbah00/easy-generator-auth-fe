import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

export type AuthFormData = {
  email: string;
  password: string;
  username: string;
};

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, 1 letter, 1 number, and 1 special character"
    ),
  username: z.string().min(3, "Username must be at least 3 characters long"),
});
import { useEffect } from "react";

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<AuthFormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onSubmit = (data: AuthFormData) => console.log("Submitted:", data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
    >
      <input
        {...register("email")}
        placeholder="Email"
        className="w-full p-2 border border-gray-300 rounded"
        onBlur={() => trigger("email")}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      <input
        {...register("username")}
        placeholder="username"
        className="w-full p-2 border border-gray-300 rounded"
        onBlur={() => trigger("username")}
      />
      {errors.username && (
        <p className="text-red-500 text-sm">{errors.username.message}</p>
      )}

      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="w-full p-2 border border-gray-300 rounded"
        onBlur={() => trigger("password")}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}

      <button
        disabled={!isValid}
        type="submit"
        className={`w-full p-2 rounded  ${
          isValid
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-400 text-gray-200 cursor-not-allowed"
        }`}
      >
        Sign Up
      </button>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};
