
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner"; // Import directly from sonner package, not from our component

// Define User type
export type UserRole = "user" | "admin" | "vendor" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define the Auth Context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample user data (in a real app, this would come from API/DB)
const sampleUsers = [
  {
    id: "user-1",
    name: "John Doe",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
    role: "user" as UserRole,
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=John"
  },
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, this would be hashed
    role: "admin" as UserRole,
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Admin"
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("trendify-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const foundUser = sampleUsers.find(u => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid email or password");
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("trendify-user", JSON.stringify(userWithoutPassword));
      
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user with this email already exists
      if (sampleUsers.some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        role: "user" as UserRole,
        avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${name}`
      };
      
      // Add user to sample users (in a real app, this would be saved to a database)
      sampleUsers.push({...newUser, password});
      
      // Set user in state and localStorage
      setUser(newUser);
      localStorage.setItem("trendify-user", JSON.stringify(newUser));
      
      toast.success("Registered successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("trendify-user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
