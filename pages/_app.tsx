import Progress from "@components/Progress/Index";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "@assets/app.scss"

function MyApp({ Component, pageProps }: AppProps) {
  const [isAnimating, setIsAnimating] = useState<boolean>(false),
    router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeError", handleStop);
    router.events.on("routeChangeComplete", handleStop);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeError", handleStop);
      router.events.off("routeChangeComplete", handleStop);
    };
  }, [router]);

  return (
    <>
      <Progress isAnimating={isAnimating} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
