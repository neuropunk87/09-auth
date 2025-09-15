"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { login, AuthRequest } from "@/lib/api/clientApi";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import css from "./SignInPage.module.css";

const SignIn = () => {
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    setError("");
    try {
      const formValues = Object.fromEntries(formData) as AuthRequest;
      const response = await login(formValues);
      if (response) {
        setUser(response);
        toast.success("You have successfully logged in!");
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("Internal Server Error");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
