import { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getBaseURL } from "@/lib/api/api";
import { fetchServerNotes } from "@/lib/api/serverApi";
import { Tags } from "@/types/note";
import NotesClient from "./Notes.client";

interface NotesFilterProps {
  params: Promise<{ slug: Tags }>;
}

export const dynamicParams = false;
export const revalidate = 900;

export async function generateMetadata({
  params,
}: NotesFilterProps): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: slug[0] === "All" ? "All Notes" : `${slug[0]} Notes`,
    description:
      slug[0] === "All" ? "All notes" : `Notes tagged with ${slug[0]}`,
    openGraph: {
      title: slug[0] === "All" ? "All Notes" : `${slug[0]} Notes`,
      description:
        slug[0] === "All" ? "All notes" : `Notes tagged with ${slug[0]}`,
      url: `${getBaseURL()}/notes/filter/${slug[0]}`,
      siteName: "NoteHub",
      type: "website",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: slug[0] === "All" ? "All Notes" : `${slug[0]} Notes`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: slug[0] === "All" ? "All Notes" : `${slug[0]} Notes`,
      description:
        slug[0] === "All" ? "All notes" : `Notes tagged with ${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: slug[0] === "All" ? "All Notes" : `${slug[0]} Notes`,
        },
      ],
      creator: "github.com/neuropunk87",
    },
  };
}

export const generateStaticParams = async () => {
  return Tags.map((category) => ({ slug: [category] }));
};

export default async function NotesFilter({ params }: NotesFilterProps) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const category = slug[0] === "All" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", page: 1, category }],
    queryFn: () => fetchServerNotes("", 1, undefined, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
}
