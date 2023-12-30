import * as pdfjsLib from "pdfjs-dist";
import Tesseract from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

async function performOCROnCanvas(canvas) {
  return Tesseract.recognize(canvas, "eng", {
    // logger: (m) => console.log(m),
  }).then(({ data: { text } }) => text);
}

export async function extractTextFromPdfWithOCR(file) {
  // start a timer to record the time it takes to extract text from the pdf
  const startTime = Date.now();

  const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
  const pdf = await loadingTask.promise;
  let extractedText = "";

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    await page.render({ canvasContext: context, viewport: viewport }).promise;

    const pageText = await performOCROnCanvas(canvas);
    extractedText += pageText + "\n";
  }

  const endTime = Date.now();
  // log the time it took to extract text from the pdf in seconds
  console.log(
    `Extracted text from pdf in ${(endTime - startTime) / 1000} seconds.`
  );

  return extractedText;
}

// TODO: parallelize the OCR process using web workers
