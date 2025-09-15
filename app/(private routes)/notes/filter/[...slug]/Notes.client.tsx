"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Link from "next/link";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { fetchNotes } from "@/lib/api/clientApi";
import { Tag } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { Toaster } from "react-hot-toast";
import css from "./Notes.client.module.css";

interface NotesClientProps {
  category: Exclude<Tag, "All"> | undefined;
}

const NotesClient = ({ category }: NotesClientProps) => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [page, setPage] = useState<number>(1);

  const {
    data: notes,
    isSuccess,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes", { search: debouncedQuery, page, category }],
    queryFn: () => fetchNotes(debouncedQuery, page, undefined, category),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const totalPages = notes?.totalPages ?? 1;

  const onQueryChange = useDebouncedCallback((value) => {
    setPage(1);
    setQuery(value);
  }, 300);

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !notes)
    return <p>Could not fetch the list of notes. {error?.message}</p>;

  const hasNotes = notes.notes.length > 0;

  let emptyMessage: string;
  const trimmedQuery = query.trim();

  if (trimmedQuery) {
    emptyMessage = category
      ? `No notes match your search in the "${category}" category.`
      : "No results found for your query.";
  } else if (category) {
    emptyMessage = `There are no notes in the "${category}" category yet.`;
  } else {
    emptyMessage = "There are no notes yet. Create the first one!";
  }

  return (
    <div className={css.app}>
      <Toaster />
      <header className={css.toolbar}>
        <SearchBox onChange={onQueryChange} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
        <Link className={css.button} href={"/notes/action/create/"}>
          Create note +
        </Link>
      </header>

      {isSuccess &&
        (hasNotes ? (
          <NoteList notes={notes.notes} />
        ) : (
          <p className={css.empty}>{emptyMessage}</p>
        ))}
    </div>
  );
};

export default NotesClient;
