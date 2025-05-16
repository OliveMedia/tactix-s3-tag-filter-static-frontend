import React, { useEffect, useRef } from "react";

const HtmlWithShadow = ({ html }: { html: string }) => {
  const containerRef = useRef<any>();

  useEffect(() => {
    const shadowHost = containerRef.current;
    if (!shadowHost) return;

    // Attach shadow root (if not already)
    let shadowRoot = shadowHost.shadowRoot;
    if (!shadowRoot) {
      shadowRoot = shadowHost.attachShadow({ mode: "open" });
    }

    // Set the HTML content
    shadowRoot.innerHTML = `
     
      <div>${html}</div>
    `;
  }, [html]);

  return <div ref={containerRef} />;
};

export default HtmlWithShadow;
