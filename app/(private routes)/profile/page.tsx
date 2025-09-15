import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: `${user.username} - NoteHub`,
    description: `Profile page of ${user.username}`,
    openGraph: {
      title: `${user.username} - NoteHub`,
      description: `Profile page of ${user.username}`,
      type: "website",
      images: [
        {
          url: user.avatar,
          width: 1200,
          height: 630,
          alt: `${user.username}'s Avatar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${user.username} - NoteHub`,
      description: `Profile page of ${user.username}`,
      images: [
        {
          url: user.avatar,
          width: 1200,
          height: 630,
          alt: `${user.username}'s Avatar`,
        },
      ],
      creator: "github.com/neuropunk87",
    },
  };
}

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href={"profile/edit"} className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
