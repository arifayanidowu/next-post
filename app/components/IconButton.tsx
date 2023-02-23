interface IIconButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const IconButton = ({ children, ...rest }: IIconButton) => {
  return (
    <button
      className={`rounded-full p-2 dark:bg-slate-500 dark:hover:bg-gray-700 bg-gray-300 hover:bg-gray-200 disabled:opacity-25 transition-all duration-500 ease-in-out hover:shadow-sm ${rest.className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
