import { CreateUserDto } from "../dto/CreateUserDto";
import { SignInDto } from "../dto/SignInDto";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";


export const signup = async (userData: CreateUserDto) => {
  const response =await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch (error) {  }
  
  if (!response.ok) {
    throw new Error(responseData?.message || 'Signup failed');
  }
  
  return responseData;
  
};

export const signin = async (userData: SignInDto) => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("signin failed");
  }
  return response.json();
};


export const verifyEmail = async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email?token=${token}`);
    if (!response.ok) {
      throw new Error("Email verification failed");
    }
}