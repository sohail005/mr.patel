import InstagramDownloader from "@/components/sections/tools/InstagramDownloader";
import Navbar from "@/components/sections/Navbar";

export const metadata = {
  title: "Instagram Reel Downloader | Sohail Patel",
  description: "Download Instagram Reels for free in high quality. No login, no watermarks. Fast, secure, and easy to use.",
  keywords: ["instagram downloader", "reel downloader", "download ig reels", "free web tools", "video downloader"],
};

export default function InstagramDownloaderPage() {
  return (
    <>
      <Navbar />
      <div className="bg-[var(--color-bg)] pt-20">
        <InstagramDownloader />
      </div>
    </>
  );
}
