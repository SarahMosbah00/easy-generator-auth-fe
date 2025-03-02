import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthFormData } from "./SignUp";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, 1 letter, 1 number, and 1 special character"
    ),
});

export const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    reset,
  } = useForm<Pick<AuthFormData, "email" | "password">>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onSubmit = (data: Pick<AuthFormData, "email" | "password">) =>
    console.log("Submitted:", data);

  return (
    <div>
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
          {...register("password")}
          type="password"
          onBlur={() => trigger("password")}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
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
          Sign In
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don't have an account?
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
