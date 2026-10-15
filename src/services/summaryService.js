/**
 * Simulated Generative AI Summarization Service (Amazon Bedrock / Claude 3 Sonnet Emulation)
 * Produces structured technical summaries, risk scoring, key findings, and maintenance recommendations
 */

export async function generateDocumentSummary(doc) {
  // Simulate generative LLM thinking latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  let riskLevel = "Low";
  let justification = "Standard routine preventive inspection; all safety parameters within normal operational thresholds.";

  const inc = (doc.incidentType || "").toLowerCase();
  const cat = (doc.category || "").toLowerCase();

  if (inc.includes("injury") || inc.includes("collision") || inc.includes("crash") || inc.includes("accident") || cat.includes("accident")) {
    riskLevel = "Critical";
    justification = "Direct passenger safety hazard or severe chassis collision impact demanding structural inspection clearance.";
  } else if (inc.includes("brake") || inc.includes("overheat") || inc.includes("tyre burst")) {
    riskLevel = "High";
    justification = "Critical drivetrain/pneumatic mechanical failure with potential for catastrophic roadside breakdown.";
  } else if (inc.includes("ac") || inc.includes("electrical")) {
    riskLevel = "Medium";
    justification = "Electrical and auxiliary system malfunction causing passenger discomfort and electrical fire risks.";
  } else {
    riskLevel = "Low";
    justification = "Routine maintenance or statutory permit renewal without reported mechanical failures.";
  }

  // Structured Summary Content
  const conciseSummary = `Technical analysis of document ${doc.name} for vehicle ${doc.vehicleNumber} stationed at ${doc.depot} Depot. The record documents a ${doc.category} supervised by Engineer ${doc.engineer}. Total operational expenditure incurred was ₹${(doc.cost || 0).toLocaleString('en-IN')}. AI evaluation confirmed ${doc.confidence}% document extraction fidelity and classified the incident severity under ${riskLevel} priority.`;

  const keyFindings = [
    `Vehicle registration mark ${doc.vehicleNumber} audited under depot jurisdiction: ${doc.depot}.`,
    `Supervising Lead Mechanical Engineer: ${doc.engineer} certified all workshop procedures.`,
    `Root mechanical cause identified as ${doc.incidentType || 'Periodic System Assessment'}.`,
    `Total parts and labor remediation cost accounted at ₹${(doc.cost || 0).toLocaleString('en-IN')}.`,
    `Statutory and roadworthiness test criteria were systematically logged and stored in the central index.`
  ];

  const detectedIssues = [];
  if (riskLevel === "Critical") {
    detectedIssues.push({ issue: "Severe structural impact / passenger safety risk", severity: "Critical" });
    detectedIssues.push({ issue: "Chassis alignment and cross-member distortion", severity: "High" });
    detectedIssues.push({ issue: "Pneumatic or sensitive failsafe subsystem defect", severity: "High" });
  } else if (riskLevel === "High") {
    detectedIssues.push({ issue: "Brake pneumatic pressure drop / thermal drum micro-fissures", severity: "High" });
    detectedIssues.push({ issue: "Cooling system cavitation / radiator core silt buildup", severity: "Medium" });
  } else if (riskLevel === "Medium") {
    detectedIssues.push({ issue: "HVAC condenser motor bearing wear / refrigerant slow leakage", severity: "Medium" });
    detectedIssues.push({ issue: "Alternator stator winding insulation resistance degradation", severity: "Low" });
  } else {
    detectedIssues.push({ issue: "Minor cosmetic wear on brake friction linings", severity: "Low" });
    detectedIssues.push({ issue: "Routine consumable exhaustion (fluids and filters)", severity: "Low" });
  }

  const recommendations = [
    { text: "Conduct follow-up 500 km dynamometer road test and torque check on wheel fasteners.", completed: true },
    { text: "Notify Depot Store Superintendent to reorder OEM replacement buffer spares.", completed: false },
    { text: "Update National Vahan / State Transport Fleet Management Portal records.", completed: false },
    { text: `Schedule next mandatory preventive maintenance review for ${doc.vehicleNumber} within 90 days.`, completed: false }
  ];

  return {
    docId: doc.id,
    docName: doc.name,
    vehicleNumber: doc.vehicleNumber,
    category: doc.category,
    depot: doc.depot,
    riskLevel,
    riskScore: riskLevel === "Critical" ? 94 : riskLevel === "High" ? 78 : riskLevel === "Medium" ? 48 : 16,
    justification,
    conciseSummary,
    keyFindings,
    detectedIssues,
    recommendations,
    modelUsed: "Amazon Bedrock (Anthropic Claude 3 Sonnet)",
    generatedAt: new Date().toLocaleString()
  };
}
