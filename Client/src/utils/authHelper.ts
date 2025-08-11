import { authApi } from './api';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  name: string;
  confirmPassword: string;
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateSignup = (data: SignupData): string[] => {
  const errors: string[] = [];
  
  if (!data.name.trim()) {
    errors.push('Name is required');
  }
  
  if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!validatePassword(data.password)) {
    errors.push('Password must be at least 6 characters long');
  }
  
  if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return errors;
};

export const validateLogin = (data: LoginData): string[] => {
  const errors: string[] = [];
  
  if (!validateEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.password) {
    errors.push('Password is required');
  }
  
  return errors;
};

// Real authentication - using server API
export const apiLogin = async (data: LoginData): Promise<any> => {
  try {
    const response = await authApi.login(data);
    return response; // Return the full response which contains { user, token, message }
  } catch (error) {
    throw error;
  }
};

export const apiSignup = async (data: SignupData): Promise<any> => {
  try {
    const response = await authApi.register(data);
    return response; // Return the full response which contains { user, token, message }
  } catch (error) {
    throw error;
  }
};

export const apiDemoLogin = async (): Promise<any> => {
  try {
    const response = await authApi.demoLogin();
    return response; // Return the full response which contains { user, token, message }
  } catch (error) {
    throw error;
  }
};

// Mock authentication - kept for backwards compatibility
export const mockLogin = async (_data: LoginData): Promise<any> => {
  // Use real API instead of mock
  return apiDemoLogin();
};

export const mockSignup = async (data: SignupData): Promise<any> => {
  // Use real API instead of mock
  return apiSignup(data);
};