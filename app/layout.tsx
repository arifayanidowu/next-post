import Nav from "./auth/Nav";
import "./globals.css";
import Wrapper from "./components/Wrapper";
import QueryWrapper from "./components/QueryWrapper";
import Head from "./head";
import ErrorBoundary from "./components/ErrorBoundary";
import Error from "./error";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <Head />
      <Wrapper>
        <ErrorBoundary fallback={<Error />}>
          <QueryWrapper>
            {/* @ts-expect-error */}
            <Nav />
            {children}
          </QueryWrapper>
        </ErrorBoundary>
      </Wrapper>
    </html>
  );
}
