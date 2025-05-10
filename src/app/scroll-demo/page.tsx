import { HeroScrollDemo } from "@/components/ui/demo";
import WaitlistPage from "../waitlist-page";

export default function ScrollDemoPage() {
  return (
    <div>
      <HeroScrollDemo />
      <div className="my-16 border-t border-gray-300 dark:border-gray-700" />
      <h2 className="text-3xl font-bold text-center my-8">Join the Waitlist</h2>
      <WaitlistPage />
    </div>
  );
} 