import { Oswald } from "@next/font/google";
import "react-toastify/dist/ReactToastify.css";

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
});

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <body
      className={`${oswald.className} mx-4 md:mx-48 xl:mx-96 bg-gray-50 dark:bg-slate-600 text-gray-600 dark:text-gray-200`}
    >
      {children}
    </body>
  );
};

export default Wrapper;
