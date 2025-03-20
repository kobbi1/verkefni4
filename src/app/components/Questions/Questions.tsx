"use client";

import { useEffect, useState } from "react";
import { QuestionsApi } from "@/api";
import { Question } from "@/types";
import styles from "./Questions.module.css"

type Props = {
    slug: string; 
};

export default function Questions({ slug }: Props) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [error, setError] = useState<string | null>(null);
    const api = new QuestionsApi();

    useEffect(() => {
        async function fetchData() {
            try {
                const foundCategory = await api.getCategory(slug);
                if (!foundCategory) throw new Error("Flokkur ekki fundinn");
                const fetchedQuestions = await api.getQuestions(foundCategory.id);

                setQuestions(fetchedQuestions || []);
            } catch (err) {
                console.error(err);
            }
        }
        fetchData();
    }, [slug]);

    if (error) return <p>{error}</p>;

    return (
        <div className={styles.body}>
            {questions.length > 0 ? (
                <ul>
                    {questions.map((question) => (
                        <li className={styles.questions} key={question.id}>
                            <h3 className={styles.questionTitle}>{question.text}</h3>
                            <ul>
                                {question.answers.map((answer) => (
                                    <li className={styles.answer} key={answer.id}>
                                        {answer.text} {answer.correct && "✅👌"}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Því miður eru ekki til neinar spurningar í þessum flokk</p>
            )}
        </div>
    );
}
