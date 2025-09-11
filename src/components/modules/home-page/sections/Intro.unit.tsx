// Local imports
import { flexCenter } from "@/lib/shared/tw-custom";

// Functional component
export default function IntroUnit() {
  return (
    <section className="mt-32">
      <div className={`${flexCenter} text-5xl font-medium`}>
        <p>Trade Smarter</p>
      </div>
      <div className={`${flexCenter} mt-2 gap-2 text-5xl font-medium`}>
        <p>Grow Faster with </p>
        <h1 className="text-primary">CryptoVerse</h1>
      </div>
    </section>
  );
}
