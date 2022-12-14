import AuthModal from "../Components/AuthModal/AuthModal";
import "../styles/root/globals.scss";
import { AuthProvider, getUserFromSession } from "../context/authContext";
import App from "next/app";
import Head from "next/head";
import { NextIntlProvider } from "next-intl";
import LanguageModal from "../Components/LanguageModal/LanguageModal";

function MyApp({ Component, pageProps, user }) {
  return (
    <AuthProvider ssrUser={user}>
      <NextIntlProvider messages={pageProps.messages}>
        <Head>
          <title>Ace Jobs</title>
          <meta name="description" content="Awesome website for Ace Jobs" />
          <link rel="icon" href="/Img/logo.svg" />
        </Head>
        <AuthModal />
        <LanguageModal />
        <Component {...pageProps} />
      </NextIntlProvider>
    </AuthProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  if (appContext.router.isSsr === undefined) {
    const appProps = await App.getInitialProps(appContext);
    const user = await getUserFromSession(appContext.ctx);
    return { ...appProps, user: user };
  } else {
    const appProps = await App.getInitialProps(appContext);
    return { ...appProps };
  }
};

export default MyApp;
