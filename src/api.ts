import { Category, Question } from "./types";
import { Paginated } from "./types";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://vef2-2025-v3-synilausn-o7fb.onrender.com";

export class QuestionsApi {
    async fetchFromApi<T>(url: string): Promise<T | null> {  
        let response: Response | undefined;
        try {
            response = await fetch(url);
        } catch (e) {
            console.error("error fetching from api",url, e);
            return null;
        }

        if(!response.ok) {
            console.error("non 2xx status from API", url);
            return null;
        }

        let json: unknown;
        try {
            json = await response.json();
        } catch(e) {
            console.error("error parsing json",url, e);
            return null;
        }

        return json as T;
    }
    async getCategory(slug: string): Promise<Category|null> {
        const url = BASE_URL + `/categories/${slug}`;

        const response = await this.fetchFromApi<Category | null>(url);

        return response as Category;
    }  
    async getCategories(): Promise<Paginated<Category> | null> {
        const url = BASE_URL + '/categories';

        const response = await this.fetchFromApi<Paginated<Category>>(url);

        return response as Paginated<Category>;
    }

    async getQuestions(categoryId?: number): Promise<Question[] | null> {
        const url = BASE_URL + '/questions';
    
        const response = await this.fetchFromApi<Paginated<Question>>(url);
    
        if (!response || !response.data) {
            console.error("Invalid questions response:", response);
            return null;
        }
    
        return categoryId 
            ? response.data.filter(q => q.categoryId === categoryId) 
            : response.data;
    }
    
    


}