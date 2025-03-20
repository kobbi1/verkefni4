"use client";

import { useEffect, useState } from "react";
import { QuestionsApi } from "@/api";
import { Question } from "@/types";

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
                setError("gat ekki náð spurningum");
                console.error(err);
            }
        }
        fetchData();
    }, [slug]);

    if (error) return <p>{error}</p>;

    return (
        <div>
            {questions.length > 0 ? (
                <ul>
                    {questions.map((question) => (
                        <li key={question.id}>
                            <h4>{question.text}</h4>
                            <ul>
                                {question.answers.map((answer) => (
                                    <li key={answer.id}>
                                        {answer.text} {answer.correct && "✅👌"}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Engar spurningar til fyrir þennan flokk</p>
            )}
        </div>
    );
}
