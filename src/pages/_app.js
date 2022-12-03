// pages/_app.js
import '../App.css';
import '../index.css';

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}