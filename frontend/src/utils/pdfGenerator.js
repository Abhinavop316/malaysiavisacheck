import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Generates and downloads a pixel-perfect, guaranteed single-page A4 PDF
 * of the official Malaysian eVISA slip on both desktop and mobile devices.
 * 
 * Bypasses html2pdf.js pagebreak DOM-injection bugs that insert white gaps on mobile.
 *
 * @param {HTMLElement} element - The DOM element of the slip (#official-evisa-document)
 * @param {string} filename - Output file name
 */
export async function downloadOfficialEVisaPDF(element, filename = "Malaysia_eVISA.pdf") {
  if (!element) {
    throw new Error("Official eVISA document element not found");
  }

  // 1. Ensure all images inside the element are fully loaded
  const images = element.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );

  // 2. Render to high-resolution canvas with html2canvas
  // Fixed windowWidth: 1280 ensures desktop-grade layout even when triggered from a 360px mobile screen
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
    windowWidth: 1280,
    onclone: (clonedDoc) => {
      const clonedEl = clonedDoc.getElementById("official-evisa-document");
      if (clonedEl) {
        // Reset off-screen wrapper inside the cloned document so it renders from (0, 0)
        const parent = clonedEl.closest(".my-pdf-hidden-render");
        if (parent) {
          parent.style.position = "static";
          parent.style.left = "0";
          parent.style.top = "0";
          parent.style.margin = "0";
          parent.style.padding = "0";
          parent.style.overflow = "visible";
        }
      }
    },
  });

  // 3. Create single-page jsPDF document
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.98);
  const pageWidth = 210; // A4 width in mm
  const pageHeight = 297; // A4 height in mm

  const contentHeight = (canvas.height * pageWidth) / canvas.width;
  // Fit cleanly onto single A4 page
  const renderHeight = contentHeight > pageHeight ? pageHeight : contentHeight;

  // Add the single image covering the full A4 canvas without any page breaks
  pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, renderHeight, undefined, "FAST");

  // 4. Download file
  pdf.save(filename);
}
