import '../styles/globals.css';

import { useEffect, useMemo, useState } from 'react';

import SignIn from '../components/Signin';

function MyApp({ Component, pageProps }) {
  const [account, setAccount] = useState(null);

  useEffect((e) => {
    setAccount(window.sessionStorage.getItem('user'));
  }, []);

  return (
    <>
      <main className="flex justify-center">
        <section className="w-full max-w-6xl px-5 lg:px-0">
          {account ? <Component {...pageProps} /> : <SignIn />}
        </section>
      </main>
    </>
  );
}

export default MyApp;
