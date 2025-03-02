import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { SignInDto } from "../dto/SignInDto";
import { signin } from "../services/api";

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
  } = useForm<SignInDto>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();   

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const onSubmit = async (data: SignInDto) => {
    try {
      setLoading(true);
      await signin(data);
      setErrorMessage(null);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

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
          disabled={!isValid || loading}
          type="submit"
          className={`w-full p-2 rounded  ${
            isValid
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          {loading ? "Signing In..." : " Sign In"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don't have an account?
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>

      <p className="text-red-500 text-sm">{errorMessage}</p>
    </div>
  );
};
