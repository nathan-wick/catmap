import React, {FC, createContext, useEffect, useState} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import colors from "../styles/custom.scss";

export const ThemeContext = createContext<{
        theme: "light" | "dark",
        setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>,
    }>({
        "setTheme": () => {
            // Theme Setter
        },
        "theme": "light"
    }),
    ThemeContextProvider: FC<{
        children: JSX.Element
    }> = ({children}) => {

        const preferredTheme = localStorage.getItem("theme") as "light" | "dark" | null ?? "light",
            [
                theme,
                setTheme
            ] = useState<"light" | "dark">(preferredTheme),
            themeState = {
                setTheme,
                theme
            };

        useEffect(
            () => {

                if (preferredTheme !== theme) {

                    localStorage.setItem(
                        "theme",
                        theme
                    );
                    location.reload();

                } else if (theme === "light") {

                    document.body.style.backgroundColor = colors.light;
                    document.body.style.color = colors.dark;

                } else {

                    document.body.style.backgroundColor = colors.dark;
                    document.body.style.color = colors.light;

                }

            },
            [theme]
        );

        return <ThemeContext.Provider
            value={themeState}>
            {children}
        </ThemeContext.Provider>;

    };

export default ThemeContextProvider;
