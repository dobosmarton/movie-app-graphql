import Head from "next/head";
import Link from "next/link";

import AppBar from "./AppBar";

export const siteTitle = "Movie App";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <>
        <AppBar />
        <main>{children}</main>
      </>
    </>
  );
};

export default Layout;
