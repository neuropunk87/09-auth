"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { getMe, editMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import toast from "react-hot-toast";
import { Loading } from "notiflix";
import css from "./EditProfilePage.module.css";

const MIN_USERNAME_LENGTH = 3;

const EditProfile = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [initialUsername, setInitialUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading || saving) {
      Loading.hourglass(loading ? "Loading profile..." : "Saving...");
    } else {
      Loading.remove();
    }
    return () => {
      Loading.remove();
    };
  }, [loading, saving]);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      if (user) {
        setUsername(user.username);
        setInitialUsername(user.username);
        setEmail(user.email);
        setAvatar(user.avatar);
        return;
      }
      try {
        setLoading(true);
        const fetched = await getMe();
        if (cancelled) return;
        setUser(fetched);
        setUsername(fetched.username);
        setInitialUsername(fetched.username);
        setEmail(fetched.email);
        setAvatar(fetched.avatar);
      } catch (err) {
        if (!cancelled) {
          setError(extractError(err));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    init();
    return () => {
      cancelled = true;
    };
  }, [user, setUser]);

  const isDirty = username.trim() !== initialUsername.trim();
  const isValid = username.trim().length >= MIN_USERNAME_LENGTH;
  const disableSave = !isDirty || !isValid || saving;

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      if (!isDirty) {
        toast("No changes", { icon: "ℹ️" });
        return;
      }
      if (!isValid) {
        setError(`Username must be at least ${MIN_USERNAME_LENGTH} characters`);
        return;
      }

      try {
        setSaving(true);
        const updated = await editMe({ username: username.trim() });
        setUser(updated);
        setInitialUsername(updated.username);
        toast.success("Profile updated");
        router.push("/profile");
      } catch (err) {
        const msg = extractError(err);
        setError(msg);
        toast.error(msg);
      } finally {
        setSaving(false);
      }
    },
    [isDirty, isValid, username, setUser, router]
  );

  const handleCancel = () => {
    if (isDirty) {
      const confirmLeave = window.confirm("You have unsaved changes. Leave?");
      if (!confirmLeave) return;
    }
    router.push("/profile");
  };

  if (loading && !user) {
    return (
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <h1 className={css.formTitle}>Edit Profile</h1>
        </div>
      </main>
    );
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user ? (
          <form className={css.profileInfo} onSubmit={handleSubmit} noValidate>
            {avatar && (
              <Image
                src={avatar}
                alt="User Avatar"
                width={120}
                height={120}
                className={css.avatar}
              />
            )}

            <div className={css.usernameWrapper}>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                name="username"
                type="text"
                className={css.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={saving}
                aria-invalid={!isValid}
                aria-describedby="username-hint"
                autoComplete="off"
              />
              <small id="username-hint" style={{ fontSize: 12, color: "#666" }}>
                Minimum {MIN_USERNAME_LENGTH} characters.{" "}
                {isDirty ? "Modified." : "No changes."}
              </small>
            </div>

            <div className={css.usernameWrapper}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                className={css.input}
                value={email}
                disabled
              />
            </div>

            <div className={css.actions}>
              <button
                type="submit"
                className={css.saveButton}
                disabled={disableSave}
              >
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className={css.cancelButton}
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
            </div>

            {error && (
              <p
                style={{
                  color: "#b00020",
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 500,
                }}
                role="alert"
              >
                {error}
              </p>
            )}
          </form>
        ) : (
          <p style={{ margin: 0 }}>User not found</p>
        )}
      </div>
    </main>
  );
};

interface ApiErrorShape {
  message?: unknown;
  error?: unknown;
  [key: string]: unknown;
}

function extractServerMessage(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null) return undefined;
  const shape = data as ApiErrorShape;
  if (typeof shape.message === "string") return shape.message;
  if (typeof shape.error === "string") return shape.error;
  return undefined;
}

function extractError(err: unknown): string {
  if (isAxiosError(err)) {
    const serverMsg = extractServerMessage(err.response?.data);
    return serverMsg || err.message;
  }
  if (err instanceof Error) return err.message;
  return "Unknown error";
}

export default EditProfile;
