"use client"
import Link from "next/link";
import styles from "./Categories.module.css";
import { useEffect, useState } from "react";
import { Category, Paginated, UiState } from "../../../types";
import { QuestionsApi } from "@/api";

type Props = {
    title: string;
}




export default function Categories({title}:Props) {
    const [uiState, setUiState] = useState<UiState>('initial');
    const [categories, setCategories] = useState<Paginated<Category> | null>(null);

    useEffect(() => {
        async function fetchData() {
          setUiState("loading");
          const api = new QuestionsApi();
          const categoriesResponse = await api.getCategories()

          if(!categoriesResponse) {
            setUiState("error")
          } else {
            setUiState("data")
            setCategories(categoriesResponse);
          }
        }
        fetchData();
    }, [])

  return (
    <div className={styles.cats}>
        <h2>{title}</h2>
        
        {uiState === "loading" && (
          <p>Sæki flokka</p>
        )}

        {uiState === "error" && (
          <p>Villa við að sækja flokka</p>
        )}
        
        {uiState === "data" && (
        <ul className={styles.flokkar}>
          {categories?.data.map((category, index) => (
            <Link key={index} href={`/flokkar/${category.slug}`} className={styles.flokkur}>
                <li>{category.name}</li>
            </Link>
        ))}
    </ul>
)}

    </div>
  );
}

