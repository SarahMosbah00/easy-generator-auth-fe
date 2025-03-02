import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type AuthFormData = {
  email: string;
  password: string;
  username: string;
};

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
  username: z.string().min(3),
});

export const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<AuthFormData>({ resolver: zodResolver(schema) });

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
        <p className="text-red-500 text-sm">
            <li>Password must contain at least 8 characters</li>
            <li>At least 1 letter</li>
            <li>At least 1 number</li>
            <li>At least 1 special character</li>
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
};
