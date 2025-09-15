import { FetchNotesResponse, nextServer } from "./api";
import { User } from "@/types/user";
import { Note, Tag, NewNoteData, SortBy } from "@/types/note";

export type AuthRequest = {
  email: string;
  password: string;
};

export type EditRequest = {
  email?: string;
  username?: string;
};

type CheckSessionRequest = {
  success: boolean;
};

export const fetchNotes = async (
  search: string,
  page: number = 1,
  perPage: number = 12,
  tag?: Exclude<Tag, "All">,
  sortBy?: SortBy
) => {
  const { data } = await nextServer.get<FetchNotesResponse>("notes", {
    params: {
      search,
      page,
      perPage,
      tag,
      sortBy,
    },
  });
  return data;
};

export const createNote = async ({ title, content, tag }: NewNoteData) => {
  const { data } = await nextServer.post<Note>("notes", {
    title,
    content,
    tag,
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await nextServer.get<Note>(`notes/${id}`);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await nextServer.delete<Note>(`notes/${id}`);
  return data;
};

export const register = async (userData: AuthRequest) => {
  const { data } = await nextServer.post<User>("auth/register", userData);
  return data;
};

export const login = async (userData: AuthRequest) => {
  const { data } = await nextServer.post<User>("auth/login", userData);
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionRequest>("auth/session");
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("users/me");
  return data;
};

export const editMe = async (userData: EditRequest) => {
  const { data } = await nextServer.patch<User>("users/me", userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("auth/logout");
};
