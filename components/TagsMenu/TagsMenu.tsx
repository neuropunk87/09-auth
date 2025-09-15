"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tags } from "../../types/note";
import css from "./TagsMenu.module.css";

const TagsMenu = () => {
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState<Tags>(Tags);

  const handleClick = () => setIsNotesOpen(!isNotesOpen);

  useEffect(() => {
    const fetchCategories = async () => {
      setCategories(Tags);
    };
    fetchCategories();
  }, []);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={handleClick}>
        Notes {isNotesOpen ? "▾" : "▴"}
      </button>
      {isNotesOpen && categories && (
        <ul className={css.menuList}>
          {categories.map((category) => (
            <li key={category} className={css.menuItem}>
              <Link
                href={"/notes/filter/" + category}
                scroll={false}
                className={css.menuLink}
                onClick={() => setIsNotesOpen(false)}
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagsMenu;
