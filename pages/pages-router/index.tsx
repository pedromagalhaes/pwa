import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>PWA</title>
      </Head>
      <h6>Features:</h6>
      <ul>
        <li>Basic offline support</li>
        <li>Can be added to the homescreen</li>
        <li>Can send web push notifications</li>
        <li>When opened as a Desktop app, it can be Casted on a TV</li>
      </ul>
    </>
  );
}
