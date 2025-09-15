import { Metadata } from "next";
import { getBaseURL } from "@/lib/api/api";
import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note - NoteHub",
  description: "Create a new note in NoteHub",
  openGraph: {
    title: "Create Note - NoteHub",
    description: "Create a new note in NoteHub",
    url: `${getBaseURL()}/notes/action/create`,
    siteName: "NoteHub",
    type: "website",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note - NoteHub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Note - NoteHub",
    description: "Create a new note in NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create Note - NoteHub",
      },
    ],
    creator: "github.com/neuropunk87",
  },
};

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
