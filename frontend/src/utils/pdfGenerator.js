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
      if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
        setTimeout(resolve, 600);
      });
    })
  );

  // 2. Render to high-resolution canvas with html2canvas
  // Strict width: 794 and windowWidth: 794 ensures exact A4 pixel proportion (794px = 210mm at 96 DPI)
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
    scrollX: 0,
    scrollY: 0,
    width: 794,
    windowWidth: 794,
    onclone: (clonedDoc) => {
      // 1. Force the cloned iframe body to exactly 794px (A4 width)
      clonedDoc.body.style.width = "794px";
      clonedDoc.body.style.minWidth = "794px";
      clonedDoc.body.style.maxWidth = "794px";
      clonedDoc.body.style.margin = "0";
      clonedDoc.body.style.padding = "0";
      clonedDoc.body.style.backgroundColor = "#ffffff";
      clonedDoc.body.style.overflow = "hidden";

      // 2. Hide any parent status card in cloned doc so only the slip is rendered
      const verifiedContainer = clonedDoc.querySelector(".my-verified-container");
      if (verifiedContainer) {
        verifiedContainer.style.display = "none";
      }

      // 3. Reset off-screen wrapper inside cloned doc to static (0, 0)
      const chamber = clonedDoc.getElementById("official-pdf-render-chamber");
      if (chamber) {
        chamber.style.position = "static";
        chamber.style.left = "0";
        chamber.style.top = "0";
        chamber.style.width = "794px";
        chamber.style.height = "auto";
        chamber.style.overflow = "visible";
        chamber.style.opacity = "1";
        chamber.style.zIndex = "1";
      }

      const parent = clonedDoc.querySelector(".my-pdf-hidden-render");
      if (parent) {
        parent.style.position = "static";
        parent.style.left = "0";
        parent.style.top = "0";
        parent.style.width = "794px";
        parent.style.height = "auto";
        parent.style.overflow = "visible";
        parent.style.opacity = "1";
        parent.style.zIndex = "1";
      }

      const clonedEl = clonedDoc.getElementById("official-evisa-document");
      if (clonedEl) {
        clonedEl.style.position = "static";
        clonedEl.style.width = "794px";
        clonedEl.style.minWidth = "794px";
        clonedEl.style.maxWidth = "794px";
        clonedEl.style.margin = "0";
        clonedEl.style.padding = "24px 32px 28px";
        clonedEl.style.backgroundColor = "#ffffff";
        clonedEl.style.boxSizing = "border-box";
        clonedEl.style.display = "block";
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
