/**
 * Simulated Semantic Vector Search Service (Amazon OpenSearch + Dense Embeddings)
 * Parses NLP intent and calculates dense semantic similarity scores
 */

import { TRANSIT_DEPOTS, DOCUMENT_CATEGORIES, INCIDENT_TYPES } from '../data/documents';

/**
 * Extracts entities and query intent from natural language input
 */
export function parseQueryIntent(query) {
  const lower = query.toLowerCase();
  const detected = {};

  // Category detection
  DOCUMENT_CATEGORIES.forEach((cat) => {
    if (lower.includes(cat.toLowerCase()) || 
       (cat === "Maintenance Report" && (lower.includes("maintenance") || lower.includes("repair"))) ||
       (cat === "Inspection Report" && (lower.includes("inspection") || lower.includes("audit"))) ||
       (cat === "Accident Report" && (lower.includes("accident") || lower.includes("crash") || lower.includes("collision"))) ||
       (cat === "Invoice" && (lower.includes("invoice") || lower.includes("bill") || lower.includes("cost") || lower.includes("gst"))) ||
       (cat === "Permit" && (lower.includes("permit") || lower.includes("fitness") || lower.includes("puc"))) ||
       (cat === "Service Log" && (lower.includes("service") || lower.includes("routine")))) {
      detected.category = cat;
    }
  });

  // Vehicle Plate detection
  const plateMatch = query.toUpperCase().match(/TN\d{2}[A-Z]{1,2}\d{4}/);
  if (plateMatch) {
    detected.vehicleNumber = plateMatch[0];
  }

  // Depot detection
  TRANSIT_DEPOTS.forEach((depot) => {
    if (lower.includes(depot.toLowerCase())) {
      detected.depot = depot;
    }
  });

  // Incident detection
  INCIDENT_TYPES.forEach((inc) => {
    const key = inc.toLowerCase().replace(/[^a-z]/g, '');
    if (lower.replace(/[^a-z]/g, '').includes(key) ||
       (inc === "Brake Failure" && lower.includes("brake")) ||
       (inc === "Engine Overheating" && (lower.includes("overheat") || lower.includes("radiator"))) ||
       (inc === "Tyre Burst" && (lower.includes("tyre") || lower.includes("tire"))) ||
       (inc === "AC Malfunction" && (lower.includes("ac") || lower.includes("air conditioning"))) ||
       (inc === "Electrical Fault" && (lower.includes("battery") || lower.includes("alternator") || lower.includes("wiring")))) {
      detected.incidentType = inc;
    }
  });

  // Cost threshold detection (e.g. above ₹50,000 or > 50000)
  const costMatch = query.replace(/,/g, '').match(/(?:above|greater than|>|over)\s*₹?\s*(\d+)/i);
  if (costMatch) {
    detected.minCost = parseInt(costMatch[1], 10);
  }

  return detected;
}

/**
 * Searches documents using simulated dense embeddings and intent matching
 */
export async function performSemanticSearch(query, documents) {
  // Simulate vector index lookup delay (400 to 800ms)
  const latency = 400 + Math.random() * 400;
  await new Promise((resolve) => setTimeout(resolve, latency));

  const intent = parseQueryIntent(query);
  const searchTerms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);

  const scoredDocs = documents.map((doc) => {
    let score = 0;
    const docText = (doc.name + " " + doc.ocrText + " " + doc.vehicleNumber + " " + doc.depot + " " + doc.engineer + " " + doc.incidentType + " " + doc.category).toLowerCase();

    // Intent boosts
    if (intent.category && doc.category === intent.category) score += 40;
    if (intent.vehicleNumber && doc.vehicleNumber === intent.vehicleNumber) score += 50;
    if (intent.depot && doc.depot.toLowerCase() === intent.depot.toLowerCase()) score += 30;
    if (intent.incidentType && doc.incidentType === intent.incidentType) score += 35;
    if (intent.minCost && doc.cost >= intent.minCost) score += 30;

    // Term matching boosts
    searchTerms.forEach((term) => {
      if (docText.includes(term)) {
        score += 15;
      }
    });

    // Compute normalized similarity score (0.60 to 0.98)
    const baseSimilarity = score > 0 ? Math.min(0.98, 0.65 + (score / 150) * 0.33) : 0;
    const similarity = +(baseSimilarity).toFixed(2);

    // Extract snippet
    let snippet = "";
    if (doc.ocrText) {
      const lines = doc.ocrText.split('\n');
      const matchingLine = lines.find((line) => searchTerms.some((t) => line.toLowerCase().includes(t)));
      snippet = matchingLine ? matchingLine.trim() : lines.slice(0, 2).join(' ').trim();
      if (snippet.length > 160) {
        snippet = snippet.substring(0, 160) + "...";
      }
    }

    return {
      ...doc,
      similarity,
      snippet
    };
  });

  // Filter documents with positive similarity and sort descending
  const results = scoredDocs
    .filter((d) => d.similarity > 0.60)
    .sort((a, b) => b.similarity - a.similarity);

  return {
    results,
    intent,
    latencyMs: Math.round(latency)
  };
}
