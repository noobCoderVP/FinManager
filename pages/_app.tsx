import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
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
import { useBreadCrumb } from "hooks/useBreadcrumb";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// clock

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

// toaster
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
    const [dark, setdark] = useState(false);
    const [loading, setloading] = useState(true);
    const bread = useBreadCrumb();

    const ModeHandler = () => {
        const html = document.querySelector("html");
        if (dark == true) {
            html.classList.remove("dark");
        } else {
            html.classList.add("dark");
        }
        setdark(!dark);
    };

    useEffect(() => {
        AOS.init();
        setInterval(() => {
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
            <ToastContainer />
            <Navbar />
            {loading ? (
                <div className="loader"></div>
            ) : (
                <main>
                    <div className="bg-slate-400 dark:bg-gray-800 px-4 py-2 text-white border-l-4 breadnav flex flex-row">
                        <Breadcrump breadcrumbs={bread} />
                        <div
                            className="border-1 ml-auto mr-4"
                            onClick={ModeHandler}>
                            {dark ? (
                                <LightModeIcon
                                    fontSize="medium"
                                    color="inherit"
                                />
                            ) : (
                                <DarkModeIcon
                                    fontSize="medium"
                                    style={{ color: "black" }}
                                />
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
