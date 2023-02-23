"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error?: Error;
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <head></head>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset?.()}>Try again</button>
      </body>
    </html>
  );
}
