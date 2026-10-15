/**
 * Simulated AI Document Classifier (AWS SageMaker Fine-Tuned RoBERTa)
 * Predicts document taxonomy and confidence distributions
 */

import { DOCUMENT_CATEGORIES } from '../data/documents';

export async function classifyDocument(filename, text = "") {
  // Simulate inference latency (1.0 to 1.8s)
  const latency = 1000 + Math.random() * 800;
  await new Promise((resolve) => setTimeout(resolve, latency));

  const lower = (filename + " " + text).toLowerCase();

  let predictedCategory = "Maintenance Report";

  if (lower.includes("invoice") || lower.includes("bill") || lower.includes("gst") || lower.includes("payment")) {
    predictedCategory = "Invoice";
  } else if (lower.includes("accident") || lower.includes("collision") || lower.includes("crash") || lower.includes("injury") || lower.includes("fir")) {
    predictedCategory = "Accident Report";
  } else if (lower.includes("permit") || lower.includes("fitness") || lower.includes("certificate") || lower.includes("puc") || lower.includes("form 38")) {
    predictedCategory = "Permit";
  } else if (lower.includes("inspection") || lower.includes("audit") || lower.includes("compliance") || lower.includes("quarterly")) {
    predictedCategory = "Inspection Report";
  } else if (lower.includes("service log") || lower.includes("preventive") || lower.includes("routine") || lower.includes("docket")) {
    predictedCategory = "Service Log";
  } else if (lower.includes("brake") || lower.includes("engine") || lower.includes("overhaul") || lower.includes("repair") || lower.includes("maintenance")) {
    predictedCategory = "Maintenance Report";
  } else {
    // Pick random category if no keyword matches
    predictedCategory = DOCUMENT_CATEGORIES[Math.floor(Math.random() * DOCUMENT_CATEGORIES.length)];
  }

  // Generate top-1 confidence (85% to 98%)
  const topConfidence = +(85 + Math.random() * 13).toFixed(1);

  // Pick 2 other categories for top-3
  const otherCategories = DOCUMENT_CATEGORIES.filter((c) => c !== predictedCategory);
  const secondCategory = otherCategories[Math.floor(Math.random() * otherCategories.length)];
  const remainingOther = otherCategories.filter((c) => c !== secondCategory);
  const thirdCategory = remainingOther[Math.floor(Math.random() * remainingOther.length)];

  const secondConfidence = +((100 - topConfidence) * (0.6 + Math.random() * 0.25)).toFixed(1);
  const thirdConfidence = +(100 - topConfidence - secondConfidence).toFixed(1);

  const top3Predictions = [
    { category: predictedCategory, confidence: topConfidence },
    { category: secondCategory, confidence: secondConfidence },
    { category: thirdCategory, confidence: thirdConfidence }
  ];

  return {
    category: predictedCategory,
    confidence: topConfidence,
    top3Predictions,
    modelName: "RoBERTa-Large-TransitDoc-FineTuned",
    f1Score: 0.948
  };
}
