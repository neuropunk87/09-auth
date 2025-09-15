import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "NoteHub - Share Notes Instantly Online",
  description: `Oops! The page you're looking for doesn't exist. Create or share a new note with Notehub.`,
  openGraph: {
    title: "NoteHub - Share Notes Instantly Online",
    description: `Oops! The page you're looking for doesn't exist. Create or share a new note with Notehub.`,
    siteName: "NoteHub",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Share Notes Instantly Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub - Share Notes Instantly Online",
    description: `Oops! The page you're looking for doesn't exist. Create or share a new note with Notehub.`,
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Share Notes Instantly Online",
      },
    ],
    creator: "github.com/neuropunk87",
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
