import React, {useContext, useState} from 'react';



export const ThemeContext = React.createContext({
themeblack: undefined,
setThemeblack: async (themeblack) => null,
})


export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }) => {
    const [themeBlack, setThemeblack] = useState(true)
    const [showHeader, setShowHeader] = useState(true)
  
    return <ThemeContext.Provider value={{ themeBlack, setThemeblack, showHeader, setShowHeader }}>{children}</ThemeContext.Provider>
  }
