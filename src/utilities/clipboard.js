export const copy = (value, container) => {
    const element = document.getElementById(container);
    element.setAttribute("type", "text");
    element.setAttribute("value", value);
    element.select();

    const successful = document.execCommand("copy");

    element.setAttribute("type", "hidden");
    window.getSelection().removeAllRanges();

    return successful;
}