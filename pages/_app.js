import '../styles/globals.css';

import TimeAgo from 'javascript-time-ago';
import zhHant from 'javascript-time-ago/locale/zh-Hant.json';

TimeAgo.addDefaultLocale(zhHant);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
