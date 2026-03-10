import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import NeonMemoryMatch from "@/components/sections/NeonMemoryMatch";

export default function GamePage() {
    return (
        <main className="relative min-h-screen pt-24 pb-12 flex flex-col">
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <NeonMemoryMatch />
            </div>
            <Footer />
        </main>
    );
}
