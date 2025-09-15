"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { useShallow } from "zustand/react/shallow";
import { logout } from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import TagsMenu from "../TagsMenu/TagsMenu";
import css from "./AuthNavigation.module.css";

const AuthNavigation = () => {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      clearIsAuthenticated: state.clearIsAuthenticated,
    }))
  );

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    toast.success("See you next time!");
    router.push("/sign-in");
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/notes/action/create" className={css.navigationLink}>
              Create Note
            </Link>
          </li>

          <li className={css.navigationItem}>
            <TagsMenu />
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
