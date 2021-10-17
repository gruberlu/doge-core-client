import { createContext, useContext, useState, useEffect } from "react"

const CredsContext = createContext()
const UpdateCredsContext = createContext()

export function useCreds() {
    return useContext(CredsContext)
}

export function useUpdateCreds() {
    return useContext(UpdateCredsContext)
}



export const CredsProvider = ({ children }) => {
    const [creds, setCreds] = useState(JSON.parse(localStorage.getItem("rpcCreds")) || { username: "usr", password: "pass" })

    useEffect(() => {
        localStorage.setItem("rpcCreds", JSON.stringify(creds))
    }, [creds])


    return (
        <CredsContext.Provider value={creds}>
            <UpdateCredsContext.Provider value={setCreds}>
                {children}
            </UpdateCredsContext.Provider>
        </CredsContext.Provider>
    )
}
