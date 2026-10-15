# TransitDoc AI — Cloud-Native AI Document Classification & Semantic Knowledge Graph

> **Academic Project Title**: *"Cloud-Native AI Document Classification System with Knowledge Graph-Based Semantic Retrieval for Transit Operations Management"*  
> **Target Domain**: State Road Transport Corporations (TNSTC / MTC / BMTC)  
> **Evaluation Session**: College Mini-Project / Capstone Viva 2026

---

## 1. Quick Start & Setup Instructions

### Prerequisites
- Node.js `v18.x` or higher (`v24.x` supported)
- npm `v9.x` or higher

### Installation & Run Commands
```bash
# 1. Clone or navigate to the project directory
cd transitdoc-ai

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Build production bundle (optional)
npm run build
```
Once the dev server starts, open your browser at:
`http://localhost:5173`

---

## 2. Demo Authentication Credentials

The app incorporates a full simulated JWT authentication flow (HS256 signature, base64Url encoded header/payload, 1-hour expiration).

| Field | Demo Value |
|---|---|
| **Email** | `admin@transitdoc.ai` |
| **Password** | `admin123` |
| **Role** | `Administrator` (Chief Mechanical Engineer) |
| **Autofill** | Available via the **"Autofill Credentials"** button on `/login` |

> **Viva Tip**: Click the top-right profile avatar menu and select **"Inspect JWT Session"** to show the evaluators the live decoded JWT header, claims payload, and cryptographic token string!

---

## 3. Core Feature Tour

1. **Executive Operations Dashboard (`/dashboard`)**:
   - 6 KPI cards with live count-up animations & trend indicators: *Total Documents, Maintenance Reports, Inspection Reports, Accident Reports, Invoices, Permits*.
   - Recharts visual metrics: Monthly Upload Trends Area Chart, Document Taxonomy Donut Chart, Pipeline Processing Status, and Recent Activities Timeline.

2. **AI Document Ingestion Pipeline (`/upload`)**:
   - Multi-file drag-and-drop zone accepting `.pdf`, `.docx`, `.png`, and `.jpg` (max 10 MB).
   - Animated 8-stage cloud workflow stepper with live cloud worker terminal logs:
     `S3 Upload` &rarr; `AWS Textract` &rarr; `RoBERTa AI` &rarr; `Metadata NER` &rarr; `Neptune Graph` &rarr; `OpenSearch` &rarr; `Bedrock LLM` &rarr; `Completed`.
   - Post-completion tabbed inspector: Editable OCR Text (with confidence score), Editable Metadata form, Softmax Top-3 category distribution gauge, and one-click "Add to Repository".

3. **Centralized Document Repository (`/repository`)**:
   - Filterable, sortable, and paginated table (10 items/page).
   - Multi-filter controls: Category, Depot, Status, and full-text keyword query.
   - Row checkboxes with bulk text export, and single document preview drawer with simulated official workshop clearance stamp.

4. **Semantic Vector Search (`/search`)**:
   - Natural language search bar with example chips (*"Find maintenance reports for TN38AB4567"*, *"Invoices above ₹50,000"*).
   - Vector similarity scoring (0.60 to 0.98), query intent chips (*"Detected: Vehicle = TN38AB4567, Depot = Erode"*), snippet highlighting, and persistent search query history.

5. **Transit Operations Knowledge Graph (`/knowledge-graph`)**:
   - Force-directed interactive Canvas graph built with D3 physics (`d3-force`).
   - 5 entity node types: `Vehicle`, `Engineer`, `Depot`, `Report`, `Incident`.
   - 5 relationship edge types: `INSPECTED_BY`, `ASSIGNED_TO`, `BELONGS_TO_DEPOT`, `INVOLVED_IN`, `DOCUMENTED_IN`.
   - Node selection highlights 1-hop and 2-hop connected neighbors while dimming unrelated nodes.
   - Controls: Zoom In/Out, Fit to Screen, Pause/Resume physics simulation, Search node, and filter by entity type checkboxes.

6. **Generative AI Operations Summary (`/summary`)**:
   - Document picker linking all repository records.
   - Streaming typewriter-effect LLM generation.
   - Structured sections: Executive Summary, Key Findings, Detected Subsystem Vulnerabilities (with severity chips), Interactive Operational Recommendations Checklist, and Circular Risk Level Gauge (Low / Medium / High / Critical).
   - "Copy Summary" and "Print (PDF)" export modes.

7. **ML Benchmark & System Analytics (`/analytics`)**:
   - Key ML metrics: OCR Accuracy (96.4%), Classification F1 Benchmark (94.8%), Neptune Vertices, Vector Queries.
   - Dual-line accuracy evolution over time, weekly query volume bars, Neptune graph growth area chart, and RoBERTa classification confusion matrix heatmap.
   - Dynamic date-range selector (*Last 7 Days*, *Last 30 Days*, *Last 6 Months*).

---

## 4. Simulated vs. Real Cloud Architecture (For Viva Defense)

### Prototype Emulation
All cloud behaviors, machine learning inferences, OCR extraction, vector embeddings, and graph topologies are simulated purely in the browser with realistic asynchronous latency, random jitter, and state persistence in `localStorage`.

### Real Production AWS Cloud Architecture Description
In an enterprise state-transport deployment on Amazon Web Services (AWS), the system consists of:

```
[ Transit Admin / Depot Client ]
             │
             ▼
    [ Amazon CloudFront (CDN) ] ──▶ [ S3 Static Web Hosting (SPA) ]
             │
             ▼
[ Amazon API Gateway + AWS Cognito (JWT Auth & Role-Based Access) ]
             │
   ┌─────────┴─────────────────────────────────────────────┐
   ▼                                                       ▼
[ Amazon S3 ] (Raw PDF/Image Ingestion)           [ AWS Lambda Orchestrator ]
   │                                                       │
   ├─▶ [ AWS Textract ] (Layout, OCR, Table Forms)         │
   ├─▶ [ Amazon SageMaker ] (RoBERTa Fine-Tuned NLP)       │
   ├─▶ [ Amazon Comprehend ] (Transit NER: TN plates, etc) │
   ├─▶ [ Amazon Neptune ] (Property Graph RDF/SPARQL)      │
   ├─▶ [ Amazon OpenSearch Service ] (Dense k-NN Vectors)  │
   └─▶ [ Amazon Bedrock / Claude 3 Sonnet ] (Summaries)    │
                                                           ▼
                                                [ Amazon RDS PostgreSQL ]
```

1. **Ingestion & Storage**: Raw PDF and scanned image files are uploaded directly to an Amazon S3 encrypted bucket via pre-signed URLs.
2. **Document Processing Pipeline**:
   - **AWS Textract**: Invoked asynchronously (`StartDocumentAnalysis`) to extract key-value pairs, tables, and raw text.
   - **Amazon SageMaker**: Hosts a fine-tuned transformer (`roberta-base-transit`) container for multi-class taxonomy classification.
   - **Amazon Comprehend**: Performs custom Named Entity Recognition (NER) to extract vehicle plates (`TN\d{2}[A-Z]{1,2}\d{4}`), depots, and INR costs.
3. **Semantic Retrieval**:
   - **Amazon OpenSearch Service**: Stores 768-dimensional sentence-transformer embeddings using HNSW algorithm for sub-10ms k-NN vector search.
4. **Knowledge Graph**:
   - **Amazon Neptune**: Managed graph database storing vertices (`Bus`, `Engineer`, `Depot`, `Incident`) and edges (`INSPECTED_BY`, `INVOLVED_IN`).
5. **AI Synthesis**:
   - **Amazon Bedrock**: Invokes Claude 3 Sonnet with prompt templates to generate technical risk summaries and maintenance recommendations.

---

## 5. Technology Stack Summary

- **Frontend**: React 18, Vite, React Router v6
- **Styling**: Tailwind CSS, Lucide React Icons
- **Visualizations**: Recharts, D3.js (`d3-force`, `d3-zoom`, `d3-selection`)
- **State Management**: Zustand with `persist` middleware
- **Notifications**: `react-hot-toast`, `canvas-confetti`
