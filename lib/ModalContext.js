import React, {useContext, useState} from 'react';



export const showModalCartContext = React.createContext({
showModalCart: undefined,
setShowModalCart: async (showModalCart) => null,
})


export const useShowModalCart = () => useContext(showModalCartContext)

export const ShowModalCartProvider = ({ children }) => {
    const [showModalCart, setShowModalCart] = useState(false)
  
    return <showModalCartContext.Provider value={{ showModalCart, setShowModalCart }}>{children}</showModalCartContext.Provider>
  }