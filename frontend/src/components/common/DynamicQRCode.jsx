import React, { useMemo } from "react";
import { createQRCodeMatrix } from "../../utils/qrcode";

/**
 * Dynamic QR Code component rendering official scannable 2D QR Code SVG for a specific user / eVISA
 */
function DynamicQRCode({
  value = "",
  size = 110,
  quietZone = 3,
  className = "",
  title = "eVISA Digital Verification QR",
}) {
  const matrix = useMemo(() => {
    if (!value) return [];
    try {
      return createQRCodeMatrix(value, 1);
    } catch (err) {
      console.error("QR Code generation error:", err);
      return [];
    }
  }, [value]);

  if (!matrix || matrix.length === 0) {
    return null;
  }

  const count = matrix.length;
  const viewBoxSize = count + quietZone * 2;

  return (
    <div
      className={`dynamic-qr-container ${className}`}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      title={title}
    >
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "4px",
          backgroundColor: "#ffffff",
          padding: "4px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <rect width={viewBoxSize} height={viewBoxSize} fill="#ffffff" />
        {matrix.map((row, r) =>
          row.map((isDark, c) => {
            if (!isDark) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={quietZone + c}
                y={quietZone + r}
                width={1}
                height={1}
                fill="#0f172a"
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

export default DynamicQRCode;
