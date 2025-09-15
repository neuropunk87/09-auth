import Link from "next/link";
import { Tags } from "@/types/note";
import css from "./SidebarNotes.module.css";

const SidebarNotes = async () => {
  const categories: Tags = Tags;

  return (
    <ul className={css.menuList}>
      {categories.map((category) => (
        <li key={category} className={css.menuItem}>
          <Link
            href={`/notes/filter/${category}`}
            scroll={false}
            className={css.menuLink}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarNotes;
