/**
 * Knowledge Graph Builder
 * Converts the master documents dataset into 40-60 interconnected nodes and typed edges
 * Node types: Vehicle, Engineer, Depot, Report, Incident
 * Edge types: INSPECTED_BY, ASSIGNED_TO, BELONGS_TO_DEPOT, INVOLVED_IN, DOCUMENTED_IN
 */

export const NODE_TYPES = {
  Vehicle: {
    color: "#0284C7", // Sky blue
    label: "Vehicle",
    icon: "Bus",
    radius: 18,
  },
  Engineer: {
    color: "#D97706", // Amber
    label: "Engineer",
    icon: "UserCheck",
    radius: 16,
  },
  Depot: {
    color: "#7C3AED", // Violet
    label: "Depot",
    icon: "Building2",
    radius: 22,
  },
  Report: {
    color: "#2563EB", // Blue
    label: "Report",
    icon: "FileText",
    radius: 14,
  },
  Incident: {
    color: "#DC2626", // Red
    label: "Incident",
    icon: "AlertTriangle",
    radius: 17,
  }
};

export const EDGE_TYPES = {
  INSPECTED_BY: { color: "#F59E0B", label: "INSPECTED_BY" },
  ASSIGNED_TO: { color: "#8B5CF6", label: "ASSIGNED_TO" },
  BELONGS_TO_DEPOT: { color: "#6366F1", label: "BELONGS_TO_DEPOT" },
  INVOLVED_IN: { color: "#EF4444", label: "INVOLVED_IN" },
  DOCUMENTED_IN: { color: "#3B82F6", label: "DOCUMENTED_IN" },
};

/**
 * Builds nodes and links dynamically from any document array
 * @param {Array} documents 
 * @returns {{ nodes: Array, links: Array }}
 */
export function buildKnowledgeGraph(documents) {
  const nodeMap = new Map();
  const links = [];
  const linkKeySet = new Set();

  function addNode(id, type, label, data = {}) {
    if (!nodeMap.has(id)) {
      nodeMap.set(id, {
        id,
        type,
        label,
        ...data,
      });
    }
  }

  function addLink(source, target, relation) {
    const key = `${source}->${target}:${relation}`;
    if (!linkKeySet.has(key)) {
      linkKeySet.add(key);
      links.push({
        source,
        target,
        relation,
      });
    }
  }

  // Process a representative subset of documents (e.g. 20-30 docs) to keep node count cleanly around 45-60
  // Or process all documents while deduplicating entities
  const docsToProcess = documents.slice(0, 30);

  docsToProcess.forEach((doc) => {
    // 1. Report Node
    const reportId = `report-${doc.id}`;
    addNode(reportId, "Report", doc.id, {
      title: doc.name,
      category: doc.category,
      date: doc.uploadDate,
      cost: doc.cost,
      confidence: doc.confidence,
      riskLevel: doc.riskLevel
    });

    // 2. Vehicle Node
    const vehicleId = `vehicle-${doc.vehicleNumber}`;
    addNode(vehicleId, "Vehicle", doc.vehicleNumber, {
      vehicleNumber: doc.vehicleNumber,
      depot: doc.depot
    });

    // 3. Depot Node
    const depotId = `depot-${doc.depot}`;
    addNode(depotId, "Depot", `${doc.depot} Depot`, {
      depotName: doc.depot
    });

    // 4. Engineer Node
    const engineerId = `engineer-${doc.engineer.replace(/\s+/g, "_")}`;
    addNode(engineerId, "Engineer", doc.engineer, {
      engineerName: doc.engineer,
      depot: doc.depot
    });

    // 5. Incident Node (if not routine)
    if (doc.incidentType && doc.incidentType !== "None (Routine)") {
      const incidentId = `incident-${doc.incidentType.replace(/\s+/g, "_")}`;
      addNode(incidentId, "Incident", doc.incidentType, {
        incidentType: doc.incidentType
      });

      // Link: Vehicle INVOLVED_IN Incident
      addLink(vehicleId, incidentId, "INVOLVED_IN");
      // Link: Report DOCUMENTED_IN Incident
      addLink(reportId, incidentId, "DOCUMENTED_IN");
    }

    // Link: Vehicle BELONGS_TO_DEPOT Depot
    addLink(vehicleId, depotId, "BELONGS_TO_DEPOT");

    // Link: Engineer ASSIGNED_TO Depot
    addLink(engineerId, depotId, "ASSIGNED_TO");

    // Link: Report INSPECTED_BY Engineer
    addLink(reportId, engineerId, "INSPECTED_BY");

    // Link: Report DOCUMENTED_IN Vehicle
    addLink(reportId, vehicleId, "DOCUMENTED_IN");
  });

  return {
    nodes: Array.from(nodeMap.values()),
    links
  };
}
