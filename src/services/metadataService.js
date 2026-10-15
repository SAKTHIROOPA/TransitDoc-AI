/**
 * Simulated Named Entity Recognition (NER) & Metadata Extraction
 * Uses AWS Comprehend-like pattern and regex extractors
 */

import { TRANSIT_DEPOTS, TRANSIT_ENGINEERS, INCIDENT_TYPES } from '../data/documents';

const VEHICLE_PLATES = [
  "TN38AB4567",
  "TN33CD1289",
  "TN37EF9021",
  "TN30GH5543",
  "TN45JK7788",
  "TN42LM3321",
  "TN58MN6644",
  "TN72PQ9081",
  "TN01AN1122"
];

export async function extractMetadata(filename, category = "Maintenance Report") {
  // Simulate NER model latency
  await new Promise((resolve) => setTimeout(resolve, 800));

  const text = filename.toLowerCase();

  // 1. Vehicle Plate detection (Look for TN\d\d[A-Z]{1,2}\d{4} or choose random)
  const plateMatch = filename.toUpperCase().match(/TN\d{2}[A-Z]{1,2}\d{4}/);
  let vehicleNumber = plateMatch ? plateMatch[0] : VEHICLE_PLATES[Math.floor(Math.random() * VEHICLE_PLATES.length)];

  // 2. Depot detection
  let depot = TRANSIT_DEPOTS.find((d) => text.includes(d.toLowerCase())) ||
    TRANSIT_DEPOTS[Math.floor(Math.random() * TRANSIT_DEPOTS.length)];

  // 3. Engineer
  let engineer = TRANSIT_ENGINEERS[Math.floor(Math.random() * TRANSIT_ENGINEERS.length)];

  // 4. Incident Type
  let incidentType = "None (Routine)";
  if (text.includes("brake")) incidentType = "Brake Failure";
  else if (text.includes("overheat") || text.includes("radiator")) incidentType = "Engine Overheating";
  else if (text.includes("collision") || text.includes("accident") || text.includes("crash")) incidentType = "Minor Collision";
  else if (text.includes("tyre") || text.includes("tire")) incidentType = "Tyre Burst";
  else if (text.includes("ac") || text.includes("hvac") || text.includes("blower")) incidentType = "AC Malfunction";
  else if (text.includes("electrical") || text.includes("battery") || text.includes("wiper") || text.includes("fuse")) incidentType = "Electrical Fault";
  else if (text.includes("injury") || text.includes("passenger")) incidentType = "Passenger Injury";
  else if (category === "Accident Report") incidentType = "Minor Collision";
  else if (category === "Maintenance Report") incidentType = "Brake Failure";

  // 5. Cost in INR
  let cost = 15000;
  if (category === "Permit") cost = Math.floor(Math.random() * 8000) + 1200;
  else if (category === "Invoice") cost = Math.floor(Math.random() * 60000) + 30000;
  else if (category === "Accident Report") cost = Math.floor(Math.random() * 60000) + 40000;
  else cost = Math.floor(Math.random() * 35000) + 10000;

  // 6. Inspection Date (Recent within 30 days)
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * 30));
  const date = d.toISOString().split('T')[0];

  return {
    vehicleNumber,
    engineer,
    depot,
    inspectionDate: date,
    cost,
    incidentType
  };
}
