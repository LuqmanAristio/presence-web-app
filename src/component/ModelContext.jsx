import { useState, createContext, useContext } from 'react';

const ModelContext = createContext();
const ModelUpdateContext = createContext();

export function useModel() {
    return useContext(ModelContext);
}

export function useModelUpdate() {
    return useContext(ModelUpdateContext);
}

export function ModelProvider({ children }) {
    const [currentModel, setCurrentModel] = useState(null);
    return (
        <ModelContext.Provider value={currentModel}>
            <ModelUpdateContext.Provider value={setCurrentModel}>
                {children}
            </ModelUpdateContext.Provider>
        </ModelContext.Provider>
    )
}