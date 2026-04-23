import { useState } from "react";

const TextInput = ({ isDarkMode, value, handleInputChange, textarea, label, type = "text" }) => {
    const [focused, setFocused] = useState(false);

    const InputComponent = textarea ? "textarea" : "input";
    const isActive = focused || (value && value.length > 0);

    const wrapperStyle = {
        position: "relative",
        width: "100%",
    };

    const inputStyle = {
        width: "100%",
        boxSizing: "border-box",
        padding: textarea ? "22px 16px 10px" : "22px 16px 8px",
        fontSize: 15,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        lineHeight: 1.5,
        color: isDarkMode ? "#f9fafb" : "#111827",
        background: isDarkMode
            ? focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)"
            : focused ? "#ffffff" : "#f8fafc",
        border: `1.5px solid ${focused
            ? "var(--accent)"
            : isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
        }`,
        borderRadius: 14,
        outline: "none",
        resize: "none",
        transition: "border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease",
        boxShadow: focused
            ? `0 0 0 3px rgba(59,130,246,0.15)`
            : "none",
        minHeight: textarea ? 140 : "unset",
        appearance: "none",
        WebkitAppearance: "none",
        display: "block",
    };

    const labelStyle = {
        position: "absolute",
        left: 16,
        top: isActive ? 7 : textarea ? 14 : "50%",
        transform: isActive ? "none" : (textarea ? "none" : "translateY(-50%)"),
        fontSize: isActive ? 11 : 14,
        fontWeight: isActive ? 600 : 400,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: isActive ? "0.08em" : "0",
        textTransform: isActive ? "uppercase" : "none",
        color: focused
            ? "var(--accent)"
            : isDarkMode ? "#6b7280" : "#9ca3af",
        pointerEvents: "none",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        userSelect: "none",
    };

    return (
        <div style={wrapperStyle}>
            <InputComponent
                type={textarea ? undefined : type}
                value={value}
                onChange={({ target }) => handleInputChange(target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={inputStyle}
                rows={textarea ? 5 : undefined}
            />
            <label style={labelStyle}>{label}</label>
        </div>
    );
};

export default TextInput;