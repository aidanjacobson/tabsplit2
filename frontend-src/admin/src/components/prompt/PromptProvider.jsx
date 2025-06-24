import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

import "./prompt.css";

const PromptContext = createContext(null);

export const usePrompt = () => {
    const ctx = useContext(PromptContext);
    if (!ctx) throw new Error("usePrompt must be used within a PromptProvider");
    return ctx.showPrompt;
}

export const PromptProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState(null);
    const [value, setValue] = useState("");
    const [resolver, setResolver] = useState(null);

    const inputRef = useRef(null);

    useEffect(() => {
        if (visible && inputRef.current) {
            inputRef.current.select();
        }
    }, [visible]);

    const showPrompt = (options) => {
        setOptions(options);

        if (options.type === 'number') {
            setValue(Number(options.defaultValue) || 0);
        } else {
            setValue(options.defaultValue || "");
        }

        setVisible(true);
        return new Promise((resolve) => {
            setResolver(() => resolve);
        });
    }

    const handleConfirm = () => {
        if (resolver) {
            const result = options.type === 'number' ? Number(value) : value;
            resolver(result);
        }
        cleanup();
    }

    const handleCancel = () => {
        if (resolver) {
            resolver(null);
        }
        cleanup();
    }

    const cleanup = () => {
        setVisible(false);
        setOptions(null);
        setResolver(null);
    }

    return (
        <PromptContext.Provider value={{ showPrompt }}>
            {children}
            {visible && options && (
                <div className="prompt-overlay">
                    <div className="prompt-modal">
                        <label>
                            {options.label}
                            <input
                                ref={inputRef}
                                type={options.type}
                                value={value}
                                onChange={(e) => 
                                    setValue(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleConfirm();
                                    }
                                }}
                            />
                        </label>
                        <div className="prompt-buttons">
                            <button onClick={handleConfirm}>OK</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </PromptContext.Provider>
    )
}