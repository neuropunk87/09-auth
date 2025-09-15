import { cookies } from "next/headers";
import { FetchNotesResponse, nextServer } from "./api";
import { User } from "@/types/user";
import { Note, Tag, SortBy } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const response = await nextServer.get("auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
  tag?: Exclude<Tag, "All">,
  sortBy?: SortBy
) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<FetchNotesResponse>("notes", {
    params: {
      search,
      page,
      perPage,
      tag,
      sortBy,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
