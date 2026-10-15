/**
 * Export and Download utilities
 */

export function downloadTextFile(filename, content) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain;charset=utf-8" });
  element.href = URL.createObjectURL(file);
  element.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  URL.revokeObjectURL(element.href);
}

export function exportSummaryAsText(summary) {
  const content = `=====================================================
TRANSITDOC AI — SEMANTIC REPORT & OPERATIONS SUMMARY
=====================================================
Document Ref: ${summary.docName} (ID: ${summary.docId})
Vehicle Number: ${summary.vehicleNumber}
Depot Base: ${summary.depot}
Document Category: ${summary.category}
Generated At: ${summary.generatedAt}
AI Evaluation Model: ${summary.modelUsed}
-----------------------------------------------------
RISK LEVEL: ${summary.riskLevel.toUpperCase()} (Risk Index: ${summary.riskScore}/100)
Justification: ${summary.justification}
-----------------------------------------------------

EXECUTIVE SUMMARY:
${summary.conciseSummary}

KEY AUDIT FINDINGS:
${summary.keyFindings.map((f, i) => `  ${i + 1}. ${f}`).join('\n')}

DETECTED TECHNICAL ISSUES:
${summary.detectedIssues.map((issue) => `  [${issue.severity.toUpperCase()}] ${issue.issue}`).join('\n')}

OPERATIONAL RECOMMENDATIONS:
${summary.recommendations.map((r) => `  [${r.completed ? 'X' : ' '}] ${r.text}`).join('\n')}

=====================================================
Authenticated by Transit Operations Cloud Management
=====================================================`;

  downloadTextFile(`${summary.docName}_ai_summary.txt`, content);
}
