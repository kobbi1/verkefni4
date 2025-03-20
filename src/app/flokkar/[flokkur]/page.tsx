import { QuestionsApi } from "@/api";
import Navigation from "@/app/components/Navigation/Navigation";
import Questions from "@/app/components/Questions/Questions";

export default async function FlokkaPage({ params }: { params: { flokkur: string } }) {
    const { flokkur } = params;  // ✅ No need to await params
    const api = new QuestionsApi();

    console.log("🟡 Received flokkur (slug):", flokkur);

    // 🔥 Fetch category using slug
    const category = await api.getCategory(flokkur);
    console.log("✅ API response for category:", category);

    if (!category) {
        return <p>Flokkur fannst ekki</p>;
    }

    return (
        <div>
            <Navigation />
            <h2>{category.name} Spurningar</h2>
            <Questions slug={flokkur} />  {/* ✅ Pass slug to Questions component */}
        </div>
    );
}
