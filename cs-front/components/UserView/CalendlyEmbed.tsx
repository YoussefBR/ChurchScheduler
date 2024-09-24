import React, { useEffect } from "react";

export const CalendlyEmbed: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <div
        className="calendly-inline-widget w-screen h-screen"
        data-url="https://calendly.com/youssef-boshrariad-capschedulertest"
        style={{ minWidth: "320px", height: "630px" }}
      ></div>
    </div>
  );
};

export default CalendlyEmbed;
