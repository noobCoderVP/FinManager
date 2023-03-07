import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

// fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// breadcrumbs
import Breadcrump from "components/utils/Breadcrump";
import { useBreadcrumb } from "hooks/useBreadcrumb";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Link from "next/link";

// clock

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps }: AppProps) {
    const [dark, setdark] = useState(false);
    const [loading, setloading] = useState(true);
    let [bread, setbread] = useState<string[]>([]);

    const ModeHandler = () => {
        if (localStorage.getItem("color-theme")) {
            if (localStorage.getItem("color-theme") === "light") {
                document.documentElement.classList.add("dark");
                localStorage.setItem("color-theme", "dark");
                setdark(true);
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("color-theme", "light");
                setdark(false);
            }

            // if NOT set via local storage previously
        } else {
            if (document.documentElement.classList.contains("dark")) {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("color-theme", "light");
                setdark(false);
            } else {
                document.documentElement.classList.add("dark");
                localStorage.setItem("color-theme", "dark");
                setdark(true);
            }
        }
    };

    useEffect(() => {
        AOS.init();
        setInterval(() => {
            setbread(useBreadcrumb(location.href));
            setloading(false);
        }, 2000);
    }, []);

    return (
        <>
            <Head>
                <meta
                    name="keywords"
                    content="Money, finance, manage, saving, scheduler, analysis"
                />
                <meta name="description" content="money manager website" />
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <Navbar />
            {loading ? (
                <div className="loader"></div>
            ) : (
                <main>
                    <div className="bg-gray-800 px-4 py-2 text-white border-l-4 breadnav flex flex-row">
                        <Breadcrump breadcrumbs={bread} />
                        <div
                            className="border-1 ml-auto mr-4"
                            onClick={ModeHandler}>
                            {dark ? (
                                <LightModeIcon fontSize="medium" />
                            ) : (
                                <DarkModeIcon fontSize="medium" />
                            )}
                        </div>
                    </div>
                    <Component {...pageProps} />
                </main>
            )}

            <Footer />
        </>
    );
}
