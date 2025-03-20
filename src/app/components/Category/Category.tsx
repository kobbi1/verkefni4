'use client'

import { QuestionsApi } from "@/api";
import { useEffect, useState } from "react";
import { Category as CategoryType } from '@/types';
import styles from "./Category.module.css"

export function Category({slug}: {slug:string}) {
    const [category, setCategory] = useState<CategoryType | null>(null)


    useEffect(() => {
        async function fetchData() {
            const api = new QuestionsApi();
            const response = await api.getCategory(slug)
            setCategory(response);
        }
        fetchData();
    }, [slug])

    if(!category) {
        return (
            <p className={styles.mainContent}>404 Flokkur fannst ekki</p>
        )
    }

    return (
        <div className={styles.mainContent}>
            <h2>{category.name} Spurningar</h2>
        </div>
    );
}