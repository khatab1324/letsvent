import { SessionProvider, useSession } from "next-auth/react";

export const useCurrentSessionUser = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
};
