import { Category } from "@/app/components/Category/Category";
import Footer from "@/app/components/Footer/Footer";
import Navigation from "@/app/components/Navigation/Navigation";
import Questions from "@/app/components/Questions/Questions";

export default async function FlokkaPage({ 
    params,
    }: { 
        params: Promise<{ flokkur: string }>;
    }) {
        const {flokkur} = await params;


    return (
        <div>
            <Navigation />
            <Category slug={flokkur} />
            <Questions slug={flokkur} />  {}
            <Footer/>
        </div>
    );
}
