import React, { useMemo } from "react";
import { encodeCode128 } from "../../utils/barcode128";

/**
 * Dynamic Barcode component rendering official Code 128 SVG for a specific user / eVISA
 */
function DynamicBarcode({
  value = "",
  height = 55,
  barWidth = 1.6,
  showText = true,
  className = "",
  text = "",
}) {
  const modules = useMemo(() => {
    return encodeCode128(value);
  }, [value]);

  if (!modules || modules.length === 0) {
    return null;
  }

  const quietZone = 10;
  const totalWidth = (modules.length + quietZone * 2) * barWidth;
  const totalHeight = showText ? height + 18 : height;

  return (
    <div
      className={`dynamic-barcode-container ${className}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg
        viewBox={`0 0 ${totalWidth} ${totalHeight}`}
        width={totalWidth}
        height={totalHeight}
        style={{ maxWidth: "100%", height: "auto" }}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
      >
        <rect width={totalWidth} height={totalHeight} fill="#ffffff" />
        {modules.map((isBar, idx) => {
          if (!isBar) return null;
          const x = (quietZone + idx) * barWidth;
          return (
            <rect
              key={idx}
              x={x}
              y={2}
              width={barWidth}
              height={height}
              fill="#0f172a"
            />
          );
        })}
        {showText && (
          <text
            x={totalWidth / 2}
            y={height + 14}
            textAnchor="middle"
            fontFamily="'Courier New', Courier, monospace"
            fontSize="11"
            fontWeight="bold"
            letterSpacing="0.08em"
            fill="#0f172a"
          >
            {text || value}
          </text>
        )}
      </svg>
    </div>
  );
}

export default DynamicBarcode;
