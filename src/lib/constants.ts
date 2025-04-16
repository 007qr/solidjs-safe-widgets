export const defaultStyles = {
    position: "relative",
    padding: "8px",
    margin: "0",
    backgroundColor: "transparent",
    color: "#333333",
    transition: "all 0.3s ease",
    fontFamily: "Wix Madefor Display, sans-serif",
    fontSize: "16px",
    lineHeight: "1.5",
    fontWeight: "400",
    textAlign: "left",
    width: "100%",
    height: "auto",
    minHeight: "40px",
    gridColumn: "span 3",
    gridRow: "span 1",
};

export const defaultTextStyles = {
    ...defaultStyles,
    fontSize: "16px",
    fontWeight: "400",
    color: "#333333",
    padding: "8px 12px",
    backgroundColor: "#ffffff",
    borderRadius: "4px",
    width: "100%",
    minHeight: "40px",
};

export const defaultContainerStyles = {
    ...defaultStyles,
    display: "flex",
    flexDirection: "column",
    minHeight: "100px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "16px",
    width: "100%",
    gridColumn: "span 6",
    gridRow: "span 2",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
};
