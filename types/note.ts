export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}

const NoteTags = [
  "All",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
] as const;

export type Tags = typeof NoteTags;
export type Tag = (typeof NoteTags)[number];

export const Tags = NoteTags;

export interface NewNoteData {
  title: string;
  content: string;
  tag: Exclude<Tag, "All">;
}

export type SortBy = "created" | "updated";
