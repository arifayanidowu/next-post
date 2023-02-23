import Nav from "./auth/Nav";
import "./globals.css";
import Wrapper from "./components/Wrapper";
import QueryWrapper from "./components/QueryWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <Wrapper>
        <QueryWrapper>
          {/* @ts-expect-error */}
          <Nav />
          {children}
        </QueryWrapper>
      </Wrapper>
    </html>
  );
}
