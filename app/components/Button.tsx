"use client";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  loading?: boolean;
}

const Button = ({ children, loading, ...rest }: IButton) => {
  return (
    <button
      className={`text-sm disabled:cursor-not-allowed cursor-pointer dark:bg-slate-500 dark:hover:bg-gray-700 bg-gray-300 hover:bg-gray-200 dark:text-gray-200 text-gray-600 py-2 px-6 rounded-md disabled:opacity-25 transition-all duration-500 ease-in-out hover:shadow-sm ${rest.className}`}
      {...rest}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
