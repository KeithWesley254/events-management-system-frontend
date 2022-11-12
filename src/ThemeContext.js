import React, { createContext, useContext, useEffect, useState } from "react";

const Theme = createContext()

export default function CryptoContext({ children }){
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [bgColor, setBgColor] = useState("#fff")
    const [btnColor, setBtnColor] = useState("#0724ea")
    const [btnTextColor, setBtnTextColor] = useState("#fff")
    const [btnHover, setBtnHover] = useState("#1d1d1d")
    const [textColor, setTextColor] = useState("#707286")
    const [mainHeading, setMainHeading] = useState("#1d0a3c")
    const [subTitles, setSubTitles] = useState("black")
    const [accent, setAccent] = useState("#d1410a")
    const [categoryBtns, setCategoryBtns] = useState("black")
    const [cBoxShadow, setCBoxShadow] = useState("5px 5px #d1410a")
    const [cardBg, setCardBg] = useState("#fff")
    const [cardHover, setCardHover] = useState("rgba(0, 0, 0, 0.56) 0px 22px 70px 4px")
    const [formTextC, setFormTextC] = useState("black")
    const [formAccent, setFormAccent] = useState("black")
    const [formBg, setFormBg] = useState("#fff")

    useEffect(() => {
        if(isDarkMode === true) {
            setBgColor("#1d1d1d")
            setBtnColor("#03DAC5")
            setBtnTextColor("#1d1d1d")
            setBtnHover("#fff")
            setTextColor("#e1e1e1")
            setMainHeading("#BB86FC")
            setSubTitles("#BB86FC")
            setAccent("#03DAC5")
            setCategoryBtns("#e1e1e1")
            setCBoxShadow("5px 5px #03DAC5")
            setCardBg("#707286")
            setCardHover("#03DAC5 0px 22px 70px 4px")
            setFormTextC("#fff")
            setFormAccent("#fff")
            setFormBg("#0a1929")
        }
        else if(isDarkMode === false) {
            setBgColor("#fff")
            setBtnColor("#0724ea")
            setBtnTextColor("#fff")
            setBtnHover("#1d1d1d")
            setTextColor("#707286")
            setMainHeading("#1d0a3c")
            setSubTitles("black")
            setAccent("#d1410a")
            setCategoryBtns("black")
            setCBoxShadow("5px 5px #d1410a")
            setCardBg("#fff")
            setCardHover("rgba(0, 0, 0, 0.56) 0px 22px 70px 4px")
            setFormTextC("black")
            setFormAccent("black")
            setFormBg("#fff")
        };

    }, [isDarkMode]);

    return (
        <div>
            <Theme.Provider value={{
                isDarkMode, 
                bgColor,
                mainHeading,
                categoryBtns,
                cardHover,
                formBg,
                formAccent,
                formTextC,
                cardBg,
                cBoxShadow,
                accent,
                subTitles,
                textColor, 
                btnHover, 
                btnTextColor, 
                btnColor, 
                setIsDarkMode
                }}>
                {children}
            </Theme.Provider>
        </div>
    )
}

export function ThemeState (){
   return useContext(Theme);
}