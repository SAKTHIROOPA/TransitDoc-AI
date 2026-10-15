/**
 * Simulated OCR Engine (AWS Textract Emulation)
 * Simulates document page analysis, bounding box extraction, and text recognition
 */

import { OCR_TEMPLATES } from '../data/ocrTemplates';

export async function runOcrEngine(file, metadata, category) {
  // Simulate cloud OCR processing latency (1.0 to 1.8s)
  const latency = 1000 + Math.random() * 800;
  await new Promise((resolve) => setTimeout(resolve, latency));

  // Determine OCR template
  const templateFn = OCR_TEMPLATES[category] || OCR_TEMPLATES["Maintenance Report"];
  const text = templateFn(metadata);

  // Confidence between 88.5% and 98.4%
  const confidence = +(88.5 + Math.random() * 9.8).toFixed(1);

  return {
    rawText: text,
    confidence,
    pageCount: Math.floor(Math.random() * 3) + 1,
    detectedLanguage: "en-IN",
    engineVersion: "AWS Textract Layout v3.2.0"
  };
}
