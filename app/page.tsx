import { Oswald } from "@next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main>
      <p className={"text-lg py-2 " + oswald.className}>Hello next</p>
    </main>
  );
}
