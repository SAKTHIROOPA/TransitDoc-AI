/**
 * TransitDoc AI - Shared Master Documents Dataset
 * Realistic Indian Transit Context (Tamil Nadu State Transport)
 * Powering Dashboard, Repository, Semantic Search, Knowledge Graph, AI Summary & Analytics
 */

export const INITIAL_DOCUMENTS = [
  {
    id: "DOC-2026-001",
    name: "tn38ab4567_brake_pressure_inspection.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN38AB4567",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-09-12",
    status: "Completed",
    cost: 18500,
    incidentType: "Brake Failure",
    confidence: 96.4,
    riskLevel: "High",
    fileSize: "2.4 MB",
    ocrText: `STATE TRANSPORT WORKSHOP - ERODE CENTRAL DEPOT
MAINTENANCE & SAFETY CLEARANCE REPORT
Document Ref: ERO/MN/2026-0912/01
Vehicle Registration: TN38AB4567 (Ashok Leyland Viking BS-VI)
Chassis No: ALV-2022-98412 | Engine No: H4-99812-ERD
Odometer Reading: 184,520 km
Supervising Engineer: R. Karthikeyan (Emp ID: ERD-ENG-402)
Date of Inspection: 12-September-2026

DEFECT DESCRIPTION & SYMPTOMS:
Driver reported sudden loss of pneumatic pressure in secondary air brake reservoir while descending Bhavani ghat section. Warning buzzer activated at 4.2 bar (critical threshold < 6.0 bar).

INSPECTION FINDINGS:
1. Dual circuit air brake valve (WABCO assembly) exhibited seal leakage at auxiliary port B.
2. Front left brake drum surface showed thermal micro-fissures from friction buildup.
3. Air dryer desiccant cartridge saturated with oil mist, impeding pneumatic recharge rate.

CORRECTIVE REPAIRS EXECUTED:
- Replaced complete brake booster valve kit (Part #WB-98214-G).
- Replaced front axle brake shoe linings (both wheels, Grade-A composite).
- Flushed pneumatic lines and renewed air dryer desiccant cartridge.
- Calibrated safety unloader valve cutoff pressure to 8.5 bar.
Total Labor Hours: 6.5 hrs | Spare Parts Cost: ₹14,200 | Labor: ₹4,300 | Total: ₹18,500
Status: Roadworthy certified after 15 km loaded deceleration test.`
  },
  {
    id: "DOC-2026-002",
    name: "tn33cd1289_radiator_overheating_log.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN33CD1289",
    engineer: "S. Priya Nair",
    depot: "Coimbatore",
    uploadDate: "2026-09-18",
    status: "Completed",
    cost: 32000,
    incidentType: "Engine Overheating",
    confidence: 94.8,
    riskLevel: "High",
    fileSize: "3.1 MB",
    ocrText: `TAMIL NADU TRANSIT CORPORATION - COIMBATORE SOUTH DIVISION
DEPOT TECHNICAL WORK ORDER & OVERHAUL RECORD
Document Ref: CBE-ENG-2026-441
Vehicle Reg: TN33CD1289 | Route: Pollachi - Coimbatore Central
Inspection Date: 18-September-2026
Lead Engineer: S. Priya Nair (Emp ID: CBE-E-109)

REPORTED ANOMALY:
Coolant temperature gauge pegged at 108°C on Mettupalayam bypass road. High temperature coolant purge reservoir venting steam.

DIAGNOSTIC TEST RESULTS:
1. Radiator core fins heavily clogged with road silt, reducing convective heat transfer by 45%.
2. Viscous fan clutch slipped under heavy engine load; failed to lock up above 85°C.
3. Water pump impeller exhibited moderate cavitation erosion along trailing vane tips.

PARTS REPLACED & OVERHAUL:
- Heavy-duty copper-brass radiator core replacement (Part #RC-6701-HD).
- Electronic viscous fan hub assembly replacement.
- Engine coolant drained and refilled with 50/50 ethylene glycol premix (32 Litres).
- Thermostat valve replaced (opening temp 82°C verified in test bath).
Total Cost: ₹32,000 (Spares: ₹26,500, Workshop overhead: ₹5,500)
Clearance: Engine idle test 45 mins at 88°C stable.`
  },
  {
    id: "DOC-2026-003",
    name: "tn37ef9021_salem_depot_collision_assessment.docx",
    category: "Accident Report",
    vehicleNumber: "TN37EF9021",
    engineer: "M. Abdul Rahman",
    depot: "Salem",
    uploadDate: "2026-08-30",
    status: "Completed",
    cost: 84500,
    incidentType: "Minor Collision",
    confidence: 97.2,
    riskLevel: "Critical",
    fileSize: "4.8 MB",
    ocrText: `STATE ACCIDENT INVESTIGATION & DAMAGE CLAIM REPORT
Salem West Divisional Workshop | FIR Ref: SLM-CR-892/2026
Incident Date: 30-August-2026 14:20 IST | Location: Seelanaickenpatti Junction
Bus Registration: TN37EF9021 | Driver: K. Palanisamy (Badge #4892)
Investigating Mechanical Engineer: M. Abdul Rahman

INCIDENT SUMMARY:
Bus rear-ended a stationary goods carrier waiting at traffic signal during heavy downpour. Driver cited aquaplaning and reduced visibility. No passenger fatalities; three minor contusions treated at Salem GH.

STRUCTURAL & MECHANICAL DAMAGE AUDIT:
- Front bumper cross-member deformed inward by 140 mm.
- Radiator support frame twisted; condenser coil ruptured.
- Left side fibreglass fascia panel crushed; windscreen glass shattered (laminated).
- Steering box linkage slightly misaligned; pitman arm clearance within safe tolerance.

RECONSTRUCTION ESTIMATE & BILL OF QUANTITIES:
1. Frame straightening and hydraulic jack realignment: ₹18,000
2. Full front cowl fibreglass fabrication & painting: ₹28,500
3. Laminated windshield replacement (Saint-Gobain Transit Spec): ₹16,000
4. Front bumper reinforcement beam replacement: ₹12,000
5. Electrical harness rewire & headlight clusters: ₹10,000
Total Claim Amount: ₹84,500. Insurance surveyor inspected and cleared.`
  },
  {
    id: "DOC-2026-004",
    name: "inv_2026_wabco_brake_linings_erode.pdf",
    category: "Invoice",
    vehicleNumber: "TN38AB4567",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-09-14",
    status: "Completed",
    cost: 54600,
    incidentType: "Brake Failure",
    confidence: 98.1,
    riskLevel: "Medium",
    fileSize: "1.2 MB",
    ocrText: `TAX INVOICE - WABCO INDIA PNEUMATICS LTD
Invoice No: WB-TN-2026-9812 | Date: 14-Sep-2026 | GSTIN: 33AAACW1294F1Z8
Billed To: Tamil Nadu State Transport Workshop, Erode Central
Consignee: Workshop Store Superintendent (Ref PO: TNSTC/ERD/PO-2281)
Attn: Engineer R. Karthikeyan

Item Description | HSN | Qty | Unit Price (₹) | Total (₹)
1. Heavy Commercial Asbestos-Free Brake Linings (TN38 series) | 8708 | 24 Sets | 1,500 | 36,000
2. Dual Circuit Relay Valve Assembly (Wabco 973) | 8481 | 2 Units | 5,200 | 10,400
3. Air Desiccant Spin-on Cartridges 4.5 Bar | 8421 | 8 Units | 1,025 | 8,200
Subtotal: ₹54,600 | CGST @ 9%: ₹4,914 | SGST @ 9%: ₹4,914 | Total Amount: ₹64,428
Payment Terms: Net 30 days via NEFT/PFMS Govt Account.`
  },
  {
    id: "DOC-2026-005",
    name: "fitness_certificate_tn30gh5543_tiruppur.pdf",
    category: "Permit",
    vehicleNumber: "TN30GH5543",
    engineer: "K. Lakshmi",
    depot: "Tiruppur",
    uploadDate: "2026-07-22",
    status: "Completed",
    cost: 4500,
    incidentType: "None (Routine)",
    confidence: 97.9,
    riskLevel: "Low",
    fileSize: "1.8 MB",
    ocrText: `GOVERNMENT OF TAMIL NADU - MOTOR VEHICLES DEPARTMENT
REGIONAL TRANSPORT OFFICE, TIRUPPUR NORTH (TN-39)
FORM 38 - CERTIFICATE OF FITNESS FOR TRANSPORT VEHICLE
Certificate Number: FC-TN39-2026-008149
Registration Mark: TN30GH5543 | Seating Capacity: 52+2
Chassis No: MAT448011F49021 | Class: Stage Carriage Bus
Inspecting Motor Vehicle Inspector: K. Lakshmi (MVI Grade-1)
Depot Assigned: Tiruppur City Central Depot

STATUTORY INSPECTION PARAMETERS:
- Smoke Meter Opacity Test: 32% HSU (Emission limit < 50% HSU) - PASSED
- Roller Brake Tester Efficiency: 68% total braking effort - PASSED
- Headlight Aim & High Beam Candlepower: Within IS 841 standard - PASSED
- Speed Governor Functionality: Locked and electronically sealed at 80 km/h.
- Emergency Exit Door & Warning Buzzer: Fully operational.
- First Aid Box & Fire Extinguishers (2x 5kg ABC Powder): Valid up to Jul-2027.
This vehicle complies with all requirements of Section 56 of the Motor Vehicles Act 1988.
Valid From: 22-July-2026 to 21-July-2027.`
  },
  {
    id: "DOC-2026-006",
    name: "tn45jk7788_tyre_burst_investigation.pdf",
    category: "Accident Report",
    vehicleNumber: "TN45JK7788",
    engineer: "V. Senthil Kumar",
    depot: "Madurai",
    uploadDate: "2026-08-11",
    status: "Completed",
    cost: 48000,
    incidentType: "Tyre Burst",
    confidence: 93.5,
    riskLevel: "High",
    fileSize: "2.9 MB",
    ocrText: `SPECIAL TECHNICAL INVESTIGATION - TYRE CASING INTEGRITY FAILURE
Depot: Madurai North Workshop | Report #: MDR-FL-TYR-2026-11
Vehicle: TN45JK7788 (Express Route: Madurai - Rameswaram)
Date of Event: 11-August-2026 11:30 hrs | Weather: Ambient Temp 38°C
Lead Examiner: V. Senthil Kumar (Senior Mechanical Engineer)

EVENT PARTICULARS:
Right rear inner tyre (Size 10.00 R20 16PR, MRF Steel Muscle) exploded while traversing NH-87 at approximately 65 km/h. Driver maintained vehicle trajectory safely onto shoulder. Minor damage to wheel arch guard liner.

METALLURGICAL & FORENSIC OBSERVATIONS:
- Tread depth measured 3.2 mm prior to failure (above legal min 1.6 mm).
- Delamination observed along crown ply transition shoulder.
- Internal casing evidence indicates chronic running at under-inflated pressure (approx 85 psi vs recommended 115 psi cold).
- Excessive intra-carcass friction generated thermal degradation of steel wire belt.

ACTIONABLE DIRECTIVES:
- Fleet-wide mandatory morning digital tyre pressure check with calibration log.
- Replaced pair of rear tyres with fresh batch radials: ₹38,000.
- Fabricated new stainless steel wheel well baffle: ₹10,000.
- Cleared for regional feeder duty.`
  },
  {
    id: "DOC-2026-007",
    name: "routine_service_log_tn42lm3321_chennai.pdf",
    category: "Service Log",
    vehicleNumber: "TN42LM3321",
    engineer: "Anand R.",
    depot: "Chennai Central",
    uploadDate: "2026-09-01",
    status: "Completed",
    cost: 12400,
    incidentType: "None (Routine)",
    confidence: 96.0,
    riskLevel: "Low",
    fileSize: "1.5 MB",
    ocrText: `CHENNAI CENTRAL REGIONAL MAINTENANCE DEPOT
SCHEDULE-III PREVENTIVE SERVICE DOCKET (50,000 KM INTERVAL)
Bus Registration: TN42LM3321 | Depot Bay: 04
Engineer-in-Charge: Anand R. (Workshop Foreman)
Execution Date: 01-September-2026

SERVICE CHECKLIST EXECUTED:
- Engine crankcase oil evacuated (18.5 Litres 15W-40 CI-4 Plus).
- Replaced fuel filter primary and secondary cartridges.
- Air intake cyclonic pre-cleaner washed and compressed air dried.
- Steering gearbox lash inspected: 15 mm play (within standard limit).
- Battery electrolyte specific gravity measured: 1.250 across all 6 cells.
- Alternator output load test: 28.2V at 1200 RPM - Healthy.
- Greased propeller shaft universal joints, king pins, and suspension shackle pins.
Material Consumables: ₹9,800 | Workshop labor charge: ₹2,600 | Total: ₹12,400.
Vehicle approved for daily express operation.`
  },
  {
    id: "DOC-2026-008",
    name: "tn58mn6644_electrical_fault_ac_failure.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN58MN6644",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-08-04",
    status: "Completed",
    cost: 29500,
    incidentType: "AC Malfunction",
    confidence: 95.1,
    riskLevel: "Medium",
    fileSize: "2.7 MB",
    ocrText: `ELECTRICAL & HVAC SYSTEM DIAGNOSTIC DOCKET
Workshop: Erode Depot Electric Sub-station
Bus ID: TN58MN6644 (Air-Conditioned Deluxe Coach)
Technician & Engineer: R. Karthikeyan
Date of Job: 04-August-2026

COMPLAINT LOGGED:
Passenger cabin blower tripping on thermal overload after 20 minutes of operation. Ambient cabin temp rose to 34°C on Tiruchengode route.

DIAGNOSIS:
- Sub-engine alternator rectifier bridge short-circuited due to insulation moisture ingress.
- HVAC condenser motor #2 bearing seized, drawing 32 Amperes (rated max 16 Amperes).
- Refrigerant R134a low side pressure recorded at 18 psi (standard 28-32 psi), indicating slow Schrader valve stem leakage.

REPAIR ACTIONS:
1. Replaced condenser brushless motor assembly: ₹14,500
2. Installed new solid-state rectifier regulator board: ₹8,000
3. Nitrogen pressure leak tested at 200 psi; evacuated system to 500 microns.
4. Recharged 4.2 kg R134a virgin refrigerant: ₹7,000
Total Expense: ₹29,500. Sub-cooling and superheat temperatures verified within OEM spec.`
  },
  {
    id: "DOC-2026-009",
    name: "tn72pq9081_passenger_injury_fall_inquiry.pdf",
    category: "Accident Report",
    vehicleNumber: "TN72PQ9081",
    engineer: "S. Priya Nair",
    depot: "Coimbatore",
    uploadDate: "2026-07-15",
    status: "Completed",
    cost: 15000,
    incidentType: "Passenger Injury",
    confidence: 92.4,
    riskLevel: "Critical",
    fileSize: "3.4 MB",
    ocrText: `PASSENGER SAFETY INCIDENT INQUIRY BOARD
Coimbatore South Division | Inquiry File: CS-SAF-2026-78
Vehicle: TN72PQ9081 | Route 5C (Gandhipuram - Singanallur)
Date: 15-July-2026 08:45 AM (Peak Office Hours)
Investigating Officer: S. Priya Nair

EVENT DETAILS:
A commuter boarded rear door while bus was slowly egressing the bus bay. Pneumatic passenger door closed abruptly, trapping patron's forearm, causing slip onto curb. First aid administered immediately; taken to ESI Hospital Coimbatore.

TECHNICAL MECHANISM INSPECTION:
- Pneumatic door actuator sensitive edge switch had severed return wire inside rubber seal gasket.
- Door sensor failsafe circuit failed to automatically reopen doors when obstructed by 25 kg force.
- Driver dashboard door indicator lamp was bypassed with dummy resistance wire by prior shift electrician.

RECOMMENDED SAFETY RECTIFICATIONS:
- Complete pneumatic door sensitive edge safety strip replacement (Part #DR-881): ₹9,500
- Rewired door interlock with accelerator throttle cutoff (bus cannot accelerate with open doors): ₹5,500
- Disciplinary action notice issued to electrical shift supervisor.
Status: Implemented and audited across all 35 buses in depot fleet.`
  },
  {
    id: "DOC-2026-010",
    name: "annual_pollution_under_control_batch_salem.pdf",
    category: "Permit",
    vehicleNumber: "TN37EF9021",
    engineer: "M. Abdul Rahman",
    depot: "Salem",
    uploadDate: "2026-06-19",
    status: "Completed",
    cost: 1200,
    incidentType: "None (Routine)",
    confidence: 98.4,
    riskLevel: "Low",
    fileSize: "1.1 MB",
    ocrText: `BHARAT STAGE VI DIESEL SMOKE EMISSION TESTING RECORD
Central Pollution Control Board Authorized Center (Station code: TN-SLM-04)
Salem Depot Fleet Clearance
Vehicle Plate: TN37EF9021 | Make: Ashok Leyland BS-VI
Inspector: M. Abdul Rahman | Date: 19-June-2026

SMOKE OPACITY MEASUREMENTS (FREE ACCELERATION METHOD):
Flush 1: 0.82 m-1
Flush 2: 0.79 m-1
Flush 3: 0.81 m-1
Mean Light Absorption Coefficient (K): 0.80 m-1 (Statutory standard <= 1.50 m-1)
Mean Opacity Percentage: 28.5% HSU (Permissible threshold 50.0%)
Oil Temperature: 82°C | High Idle RPM: 2450 RPM
RESULT: PASSED CERTIFICATE ISSUED (Valid up to 18-June-2027)
PUC Registration Serial: TN04-2026-90182.`
  },
  {
    id: "DOC-2026-011",
    name: "inv_2026_exide_battery_consignment_madurai.pdf",
    category: "Invoice",
    vehicleNumber: "TN45JK7788",
    engineer: "V. Senthil Kumar",
    depot: "Madurai",
    uploadDate: "2026-08-25",
    status: "Completed",
    cost: 72000,
    incidentType: "Electrical Fault",
    confidence: 97.6,
    riskLevel: "Low",
    fileSize: "1.4 MB",
    ocrText: `TAX INVOICE - EXIDE INDUSTRIES COMMERCIAL FLEET SUPPLY
Invoice: EX-MDR-2026-402 | Date: 25-Aug-2026 | GSTIN: 33AAACE2018Q1ZR
Purchaser: Divisional Depot Storekeeper, Madurai North
Endorsed by: V. Senthil Kumar (Sr. Engineer)

Line Items:
1. Exide Express Heavy Commercial 12V 150Ah Lead-Acid Batteries (Model XP1500)
   Qty: 6 Units @ ₹12,000 = ₹72,000
   Includes 24-month free replacement warranty against internal grid plate breakdown.
2. Battery Terminal Acid-Resistant Lead Clamps & Insulators
   Qty: 12 Sets (Complimentary consignment allowance)
Total Taxable Value: ₹72,000
IGST @ 28%: ₹20,160 | Gross Invoice: ₹92,160
Delivery challan signed and stock registered in Central Stores Register Book 14, Page 88.`
  },
  {
    id: "DOC-2026-012",
    name: "tn01an1122_steering_gearbox_replacement.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN01AN1122",
    engineer: "Anand R.",
    depot: "Chennai Central",
    uploadDate: "2026-09-05",
    status: "Completed",
    cost: 41000,
    incidentType: "Minor Collision",
    confidence: 95.8,
    riskLevel: "High",
    fileSize: "3.2 MB",
    ocrText: `TECHNICAL DEFECT RESOLUTION REPORT - FRONT RUNNING GEAR
Chennai Central Maintenance Division | Bay 12
Registration: TN01AN1122 | Engine: Tata 697 TC BS-IV
Engineer: Anand R. | Date: 05-September-2026

DRIVER OPERATIONAL GRIEVANCE:
Steering wheel binding during sharp left-hand turns at intersections with noticeable knocking sound transmitting up the steering column.

ENGINEERING DISASSEMBLY & ASSESSMENT:
1. Recirculating ball hydraulic power steering box showed scoring on worm gear teeth.
2. Hydraulic fluid contaminated with bronze shavings from failed thrust bearing race.
3. Power steering pump flow control valve stuck open, dropping hydraulic boost pressure from 110 bar to 45 bar.

REPAIR DETAILS:
- Complete power steering gear unit replacement (ZF / Rane OEM Unit #RN-9021): ₹34,000
- Hydraulic fluid loop chemical flush and filled with fresh Dexron III ATF (4.5 L): ₹3,500
- Replaced drag link ball joint and adjusted toe-in to +1.5 mm: ₹3,500
Total Maintenance Expenditure: ₹41,000.
Post-repair dynamic road test: steering wheel center returnability verified.`
  },
  {
    id: "DOC-2026-013",
    name: "periodic_inspection_tn33cd1289_coimbatore.pdf",
    category: "Inspection Report",
    vehicleNumber: "TN33CD1289",
    engineer: "S. Priya Nair",
    depot: "Coimbatore",
    uploadDate: "2026-09-22",
    status: "Completed",
    cost: 6500,
    incidentType: "None (Routine)",
    confidence: 98.0,
    riskLevel: "Low",
    fileSize: "2.1 MB",
    ocrText: `TAMIL NADU TRANSIT - QUARTERLY FITNESS INSPECTION RECORD
Coimbatore South Depot | Form M-44
Bus Plate: TN33CD1289 | Fleet Unit #302
Lead Inspector: S. Priya Nair | Inspection Date: 22-Sep-2026

SAFETY INSPECTION SUMMARY:
- Brake Lining Wear: Front axle 8 mm, Rear axle 11 mm (Permissible minimum: 4 mm) - PASSED
- Suspension Leaf Springs: No broken leaves, center bolts tight, U-bolts torqued to 450 Nm - PASSED
- Pneumatic Tank Auto-drain Valves: Purged without trace of emulsified moisture - PASSED
- Wiper Motor & Windshield Washers: Two-speed wiper operational at 45 strokes/min - PASSED
- Interior LED illumination and destination matrix board: All clusters functioning - PASSED
Total Workshop Inspection & Consumable Fee: ₹6,500.
Recommended Next Inspection: 22-December-2026.`
  },
  {
    id: "DOC-2026-014",
    name: "inv_2026_mrf_tyre_consignment_tiruppur.pdf",
    category: "Invoice",
    vehicleNumber: "TN30GH5543",
    engineer: "K. Lakshmi",
    depot: "Tiruppur",
    uploadDate: "2026-08-18",
    status: "Completed",
    cost: 96000,
    incidentType: "Tyre Burst",
    confidence: 97.4,
    riskLevel: "Medium",
    fileSize: "1.6 MB",
    ocrText: `COMMERCIAL INVOICE - MRF TYRES & RETREAD PRODUCTS
Invoice #: MRF-TPR-2026-1180 | Date: 18-Aug-2026 | GST: 33AAACM0194P1Z3
Customer: Regional Transport Depot, Tiruppur
Approving Officer: K. Lakshmi (Inspection Engineer)

Supplied Commodities:
1. MRF Steel Muscle S3C8 All-Wheel Commercial Radials (10.00 R20)
   Qty: 6 Units @ ₹16,000 = ₹96,000
2. Heavy Duty Butyl Rubber Inner Tubes & Flaps
   Qty: 6 Sets @ ₹1,200 = ₹7,200
Total Amount Pre-Tax: ₹103,200 | GST @ 18%: ₹18,576 | Total Payable: ₹121,776
Passed for payment against capital asset procurement account.`
  },
  {
    id: "DOC-2026-015",
    name: "tn38ab4567_differential_oil_leak_salem.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN38AB4567",
    engineer: "M. Abdul Rahman",
    depot: "Salem",
    uploadDate: "2026-07-28",
    status: "Completed",
    cost: 14200,
    incidentType: "Engine Overheating",
    confidence: 94.2,
    riskLevel: "Medium",
    fileSize: "2.3 MB",
    ocrText: `DRIVETRAIN MECHANICAL SERVICE SHEET
Salem West Division | Bay 07
Bus Reg: TN38AB4567 | Technician: M. Abdul Rahman
Inspection: 28-July-2026

ISSUE IDENTIFICATION:
Differential carrier banjo housing showed oil seepage along drive pinion oil seal lip. Hypoid gear oil level dropped 1.8 Litres below fill plug orifice.

WORK PERFORMED:
- Propeller shaft rear flange unbolted and companion flange extracted.
- Defective Viton double-lip pinion oil seal tapped out and renewed.
- Companion flange polished to remove micro-grooves.
- Rear axle differential sump filled with 12 Litres 85W-140 GL-5 Hypoid Oil.
Total Cost: ₹14,200 (Oil seal ₹2,200, Gear Oil ₹8,500, Workshop Labor ₹3,500).
Road tested 20 km without differential overheating or fluid leaks.`
  },
  {
    id: "DOC-2026-016",
    name: "tn42lm3321_clutch_plate_burnout_repair.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN42LM3321",
    engineer: "Anand R.",
    depot: "Chennai Central",
    uploadDate: "2026-08-20",
    status: "Completed",
    cost: 26800,
    incidentType: "Brake Failure",
    confidence: 95.5,
    riskLevel: "Medium",
    fileSize: "2.8 MB",
    ocrText: `TRANSMISSION OVERHAUL & CLUTCH ASSEMBLY SERVICE RECORD
Chennai Central Main Workshop | Work Order: CHN-TR-2026-310
Bus Registration: TN42LM3321 | Depot: Chennai Central
Supervising Engineer: Anand R. | Date: 20-Aug-2026

SYMPTOMS:
Severe clutch slipping on gear changes; pungent friction smell inside passenger cabin when accelerating from bus stops in congested traffic.

DISASSEMBLY INSPECTION:
- 380 mm single plate dry clutch friction disc worn to steel rivets.
- Diaphragm spring fingers scorched and distorted from excessive heat.
- Flywheel friction surface showed blue heat spots and 0.4 mm runout.

REPLACED COMPONENTS:
1. Valeo Heavy Duty 380 mm organic clutch disc: ₹11,200
2. Heavy clutch pressure plate cover assembly: ₹8,900
3. Flywheel surface skimmed on lathe: ₹2,200
4. Clutch release bearing and pilot needle bearing: ₹4,500
Total Incurred Cost: ₹26,800.
Free pedal travel set to 30 mm; progressive engagement verified.`
  },
  {
    id: "DOC-2026-017",
    name: "inspection_report_tn45jk7788_madurai.pdf",
    category: "Inspection Report",
    vehicleNumber: "TN45JK7788",
    engineer: "V. Senthil Kumar",
    depot: "Madurai",
    uploadDate: "2026-09-08",
    status: "Completed",
    cost: 5800,
    incidentType: "None (Routine)",
    confidence: 96.9,
    riskLevel: "Low",
    fileSize: "1.9 MB",
    ocrText: `MADURAI REGIONAL BUS SAFETY & SANITATION AUDIT
Depot: Madurai North | Inspection Officer: V. Senthil Kumar
Bus ID: TN45JK7788 | Date: 08-September-2026

INSPECTION SCOPE:
- Chassis Rivet & Welded Joints: Ultrasound testing on main cross-bearers - NO CRACKS.
- Fuel System: Diesel tank mounting straps tight, rubber anti-vibration pads intact.
- Exhaust System: SCR catalytic muffler ceramic honeycomb clean, no soot accumulation.
- Passenger Amenities: 52 seats sanitized, grab handles firm, emergency roof hatches unlatched and relocked smoothly.
Inspection Cost: ₹5,800. Clearance awarded for interstate operations.`
  },
  {
    id: "DOC-2026-018",
    name: "tn30gh5543_alternator_electrical_burn.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN30GH5543",
    engineer: "K. Lakshmi",
    depot: "Tiruppur",
    uploadDate: "2026-07-09",
    status: "Completed",
    cost: 21500,
    incidentType: "Electrical Fault",
    confidence: 94.6,
    riskLevel: "Medium",
    fileSize: "2.4 MB",
    ocrText: `ELECTRICAL DOCKET - ALTERNATOR ARMATURE SHORT CIRCUIT
Tiruppur Workshop Section 2 | Job Card: TPR-EL-2026-19
Bus: TN30GH5543 | Lead Engineer: K. Lakshmi | Date: 09-July-2026

FAULT REPORT:
Battery charge indicator light illuminated red on instrument cluster. Bus stalled near Avinashi when restarting from depot dispatch bay.

BENCH TESTING:
- 24V 80A Lucas-TVS Alternator stator windings showed thermal breakdown of varnish insulation.
- Internal voltage regulator IC transistor burned.
- Stator phase resistance measured 0.1 ohm (indicative of inter-turn short).

RESTORATION:
- Complete Lucas-TVS 24V 90A High-Output Alternator unit replacement: ₹17,500
- Heavy battery main charging cables fitted with heat-shrink insulated copper lugs: ₹2,000
- Bench tested charging output: 28.4V stable at 1400 engine RPM: ₹2,000
Total Service Cost: ₹21,500.`
  },
  {
    id: "DOC-2026-019",
    name: "national_permit_tn58mn6644_erode.pdf",
    category: "Permit",
    vehicleNumber: "TN58MN6644",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-06-25",
    status: "Completed",
    cost: 18000,
    incidentType: "None (Routine)",
    confidence: 98.8,
    riskLevel: "Low",
    fileSize: "1.7 MB",
    ocrText: `STATE TRANSPORT AUTHORITY - TAMIL NADU
ALL INDIA / INTER-STATE TOURIST VEHICLE PERMIT
Permit No: TN/AIS/2026/049182 | Authorization Code: AUTH-MTR-991
Vehicle Registration No: TN58MN6644 | Category: AC Sleeper Omnibus
Authorized Depot: Erode Central Division | Engineer: R. Karthikeyan
Date of Authorization: 25-June-2026

SPECIFIED TERRITORIES:
State of Tamil Nadu, State of Karnataka, State of Kerala, Union Territory of Puducherry.
Statutory Fee Paid: ₹18,000 via Vahan 4.0 Portal.
GPS / AIS-140 Vehicle Tracking Device & Panic Buttons verified active on National Vahan Telematics Gateway.
Valid through: 24-June-2027.`
  },
  {
    id: "DOC-2026-020",
    name: "inv_2026_valvoline_engine_oil_chennai.pdf",
    category: "Invoice",
    vehicleNumber: "TN01AN1122",
    engineer: "Anand R.",
    depot: "Chennai Central",
    uploadDate: "2026-09-10",
    status: "Completed",
    cost: 88000,
    incidentType: "Engine Overheating",
    confidence: 98.3,
    riskLevel: "Low",
    fileSize: "1.3 MB",
    ocrText: `TAX INVOICE - VALVOLINE CUMMINS PRIVATE LIMITED
Invoice #: VC-CHN-2026-8819 | Date: 10-Sep-2026 | GSTIN: 33AAACV0914J1Z6
Buyer: Chennai Central Transit Workshops & Depots
Authorized Recipient: Anand R. (Workshop Lead)

Supplied Lubricants:
1. Valvoline Premium Blue 15W-40 Heavy Duty Diesel Engine Oil (210 L Barrel)
   Qty: 2 Barrels @ ₹44,000 = ₹88,000
2. Grease Multipurpose Lithium EP-2 (18 kg Pail)
   Qty: 4 Pails @ ₹3,200 = ₹12,800
Subtotal: ₹100,800 | GST @ 18%: ₹18,144 | Grand Total: ₹118,944
Batch Quality Certificate attached: Viscosity index 138, TBN 10.2 mg KOH/g.`
  },
  {
    id: "DOC-2026-021",
    name: "tn33cd1289_front_axle_kingpin_play.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN33CD1289",
    engineer: "S. Priya Nair",
    depot: "Coimbatore",
    uploadDate: "2026-08-14",
    status: "Completed",
    cost: 16500,
    incidentType: "Minor Collision",
    confidence: 95.2,
    riskLevel: "Medium",
    fileSize: "2.5 MB",
    ocrText: `SUSPENSION & STEERING ALIGNMENT LOG
Coimbatore South Heavy Repair Facility
Bus: TN33CD1289 | Date: 14-Aug-2026 | Engineer: S. Priya Nair

FAULT AUDIT:
Front right wheel exhibited perceptible vertical tilt and tyre edge scalloping. Dial gauge measurement revealed 2.4 mm axial play in front axle kingpin bush (permissible tolerance < 0.5 mm).

OVERHAUL ACTION:
- Disassembled front stub axle assembly using hydraulic press.
- Replaced worn bronze kingpin bushes and induction-hardened kingpin (Part #KP-AL-901).
- Reamed bushes to exact pin tolerance with zero tight binding.
- Realigned front wheels: Camber 1°0', Caster 3°30', Toe-in 2.0 mm.
Total Expense: ₹16,500.`
  },
  {
    id: "DOC-2026-022",
    name: "tn37ef9021_headlight_wiper_electrical_failure.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN37EF9021",
    engineer: "M. Abdul Rahman",
    depot: "Salem",
    uploadDate: "2026-07-02",
    status: "Completed",
    cost: 8500,
    incidentType: "Electrical Fault",
    confidence: 96.1,
    riskLevel: "Low",
    fileSize: "1.9 MB",
    ocrText: `DEPOT ELECTRICAL MAINTENANCE DOCKET
Salem West Workshop | Engineer: M. Abdul Rahman
Vehicle: TN37EF9021 | Date: 02-July-2026

DEFECT:
Dual high-beam halogen headlights and dual windshield wipers inoperative simultaneously after heavy lightning storm.

ROOT CAUSE:
Main 50A master fuse blown due to water bridging in external wiring harness connector near front radiator shroud. Relay contacts welded closed.

REPAIRS:
- Installed IP67 waterproof junction box and replaced oxidized copper harness section.
- Replaced 24V 70A automotive high-load relay and ceramic fuse block: ₹5,000
- New wiper motor linkage lubrication and alignment: ₹3,500
Total: ₹8,500. Road certified for night express schedule.`
  },
  {
    id: "DOC-2026-023",
    name: "monthly_service_tn38ab4567_erode.pdf",
    category: "Service Log",
    vehicleNumber: "TN38AB4567",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-08-01",
    status: "Completed",
    cost: 11000,
    incidentType: "None (Routine)",
    confidence: 97.5,
    riskLevel: "Low",
    fileSize: "1.6 MB",
    ocrText: `MONTHLY PREVENTIVE MAINTENANCE AUDIT
Erode Central Workshop | Bay 01
Bus: TN38AB4567 | Supervising Engineer: R. Karthikeyan
Date: 01-August-2026

SERVICE ROUTINE PERFORMED:
1. Engine oil level and specific gravity checked.
2. Air filter element removed and reverse-blown with 3 bar dry air.
3. Brake pedal free play calibrated to 20 mm.
4. Fuel water separator bowl drained; cleaned ceramic sediment screen.
5. All 6 road wheels torqued with torque multiplier to 550 Nm.
Total Consumables & Greasing: ₹11,000. Vehicle fit for scheduled Bhavanisagar route.`
  },
  {
    id: "DOC-2026-024",
    name: "tn30gh5543_brake_chamber_leakage_accident_prevented.pdf",
    category: "Accident Report",
    vehicleNumber: "TN30GH5543",
    engineer: "K. Lakshmi",
    depot: "Tiruppur",
    uploadDate: "2026-06-12",
    status: "Completed",
    cost: 39000,
    incidentType: "Brake Failure",
    confidence: 94.7,
    riskLevel: "Critical",
    fileSize: "3.7 MB",
    ocrText: `NEAR-MISS SAFETY HAZARD INVESTIGATION - AIR BRAKE EXPULSION
Tiruppur Central Workshop | Incident File: TPR-NM-2026-04
Vehicle: TN30GH5543 | Route: Tiruppur - Coimbatore Highway
Investigating Engineer: K. Lakshmi | Date: 12-June-2026

INCIDENT DESCRIPTION:
Driver reported sudden loss of rear braking effectiveness when slowing down near Palladam toll plaza. Driver skillfully used emergency parking brake spring actuator and engine retarder to halt bus safely without collision.

TECHNICAL INVESTIGATION:
- Type 24/30 spring brake chamber diaphragm on right rear axle ruptured along clamp ring crimp.
- High-pressure compressed air vented continuously to atmosphere, causing pressure drop across circuit 2.
- Anti-compounding valve failed to isolate fractured chamber.

EMERGENCY REMEDIAL MEASURES:
- Replaced both rear spring brake actuators with genuine WABCO Type 24/30 chambers: ₹24,000
- Installed new safety inversion valve with dual gauge isolator: ₹9,500
- Fleet advisory issued for pneumatic diaphragm cycle inspection: ₹5,500
Total Expenditure: ₹39,000. Full deceleration brake stop test passed with 72% efficiency.`
  },
  {
    id: "DOC-2026-025",
    name: "inv_2026_saint_gobain_windshield_salem.pdf",
    category: "Invoice",
    vehicleNumber: "TN37EF9021",
    engineer: "M. Abdul Rahman",
    depot: "Salem",
    uploadDate: "2026-09-02",
    status: "Completed",
    cost: 48000,
    incidentType: "Minor Collision",
    confidence: 98.7,
    riskLevel: "Low",
    fileSize: "1.5 MB",
    ocrText: `TAX INVOICE - SAINT-GOBAIN AUTOMOTIVE GLASS INDIA
Invoice: SG-SLM-2026-781 | Date: 02-Sep-2026 | GST: 33AAACS1982K1Z9
Delivered to: Salem West Divisional Bus Workshop
Verified by: M. Abdul Rahman (Engineer)

Description of Goods:
1. Curved Laminated Safety Windscreen Glass (Ashok Leyland Viking Front Upper)
   Qty: 3 Units @ ₹16,000 = ₹48,000
2. EPDM Rubber Windscreen Weatherstrip Locking Bead
   Qty: 18 Meters @ ₹250 = ₹4,500
Taxable Amount: ₹52,500 | GST @ 18%: ₹9,450 | Total: ₹61,950
Materials received in crack-free wooden crate packaging with ISI CM/L-78921 seal.`
  },
  {
    id: "DOC-2026-026",
    name: "tn72pq9081_engine_mount_fracture.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN72PQ9081",
    engineer: "S. Priya Nair",
    depot: "Coimbatore",
    uploadDate: "2026-08-28",
    status: "Completed",
    cost: 23400,
    incidentType: "Engine Overheating",
    confidence: 95.4,
    riskLevel: "Medium",
    fileSize: "2.6 MB",
    ocrText: `ENGINE MECHANICAL RIGIDITY LOG
Coimbatore South Depot | Work Docket: CS-MCH-2026-921
Bus Reg: TN72PQ9081 | Lead Engineer: S. Priya Nair
Date: 28-Aug-2026

SYMPTOMS:
Excessive cabin vibration and metallic thumping during idling and gear transitions.

DISCOVERY:
Front right rubber-metal bonded engine support insulator fractured cleanly across steel vulcanized bracket. Engine dropped 35 mm, causing lower radiator hose to kink against cooling fan cowl.

CORRECTIVE WORK:
- Lifted engine using hydraulic overhead crane.
- Replaced all four heavy-duty elastomeric engine and transmission mounts: ₹16,400
- Renewed kinked silicone radiator lower hose and stainless T-bolt clamps: ₹4,500
- Workshop overhead & alignment: ₹2,500
Total: ₹23,400. Engine vibration levels brought back below 2.5 mm/s RMS.`
  },
  {
    id: "DOC-2026-027",
    name: "interstate_stage_carriage_permit_tn42lm3321.pdf",
    category: "Permit",
    vehicleNumber: "TN42LM3321",
    engineer: "Anand R.",
    depot: "Chennai Central",
    uploadDate: "2026-05-30",
    status: "Completed",
    cost: 25000,
    incidentType: "None (Routine)",
    confidence: 99.1,
    riskLevel: "Low",
    fileSize: "1.9 MB",
    ocrText: `STATE TRANSPORT AUTHORITY - CHENNAI DIVISION
INTERSTATE REGULAR STAGE CARRIAGE PASSENGER PERMIT
Permit No: STA/CHN/IR-2026-1049 | Vehicle: TN42LM3321
Route: Chennai CMBT to Bengaluru Majestic via Vellore & Hosur
Route Distance: 350 km one way | Daily Scheduled Trips: 2
Issuing Authority: Regional Transport Commissioner, Chennai Central
Endorsed Engineer: Anand R. | Date: 30-May-2026

PERMIT CONDITIONS:
- Vehicle must maintain AIS-140 emergency messaging and CCTV surveillance feed.
- Toll tag fastag active with minimum balance.
- Valid third party passenger liability insurance policy #TN-IC-99014.
Government Fees Remitted: ₹25,000. Valid through: 29-May-2028.`
  },
  {
    id: "DOC-2026-028",
    name: "tn45jk7788_diesel_injector_calib_invoice.pdf",
    category: "Invoice",
    vehicleNumber: "TN45JK7788",
    engineer: "V. Senthil Kumar",
    depot: "Madurai",
    uploadDate: "2026-09-15",
    status: "Completed",
    cost: 38500,
    incidentType: "Engine Overheating",
    confidence: 97.9,
    riskLevel: "Medium",
    fileSize: "1.4 MB",
    ocrText: `COMMERCIAL INVOICE - BOSCH DIESEL SYSTEM WORKSHOP
Invoice #: BOS-MDR-2026-992 | Date: 15-Sep-2026 | GST: 33AAACB1209N1Z4
Billed to: Tamil Nadu Transit Depot, Madurai North
Certified Engineer: V. Senthil Kumar

Services & Spares Rendered:
1. Common Rail CRIN2 Piezo Diesel Fuel Injector Overhaul & Ultrasonic Cleaning
   Qty: 6 Units @ ₹4,500 = ₹27,000
2. Bosch Multi-Hole Injector Nozzle Tips (Part #0433175402)
   Qty: 6 Units @ ₹1,500 = ₹9,000
3. Common Rail Micro-Filter & Copper Sealing Washers: ₹2,500
Total Pre-Tax: ₹38,500 | CGST 9%: ₹3,465 | SGST 9%: ₹3,465 | Net Payable: ₹45,430
All 6 injectors calibrated on Bosch EPS-815 test bench with IMA calibration codes provided.`
  },
  {
    id: "DOC-2026-029",
    name: "tn58mn6644_windshield_wiper_motor_burnout.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN58MN6644",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-07-21",
    status: "Completed",
    cost: 7800,
    incidentType: "Electrical Fault",
    confidence: 95.8,
    riskLevel: "Low",
    fileSize: "1.8 MB",
    ocrText: `ELECTRICAL DOCKET - WIPER SYSTEM RESTORATION
Erode Central Workshop | Bay 02
Bus Reg: TN58MN6644 | Tech Lead: R. Karthikeyan | Date: 21-July-2026

DEFECT:
Wiper arms halted midway across windscreen during continuous monsoon operation; wiper fuse blown.

FINDINGS:
- Heavy road debris jammed passenger side wiper arm pivot shaft inside zinc sleeve.
- Electric wiper motor armature overheated and charred brush holders.

REPAIR:
- Installed new 24V 150W high torque waterproof wiper gear motor: ₹5,800
- Cleaned and lubricated pantograph arm linkage with marine lithium grease: ₹1,000
- Replaced wiper silicone blades (28 inch): ₹1,000
Total Cost: ₹7,800.`
  },
  {
    id: "DOC-2026-030",
    name: "safety_audit_report_erode_depot_q3.pdf",
    category: "Inspection Report",
    vehicleNumber: "TN38AB4567",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-09-28",
    status: "Completed",
    cost: 9200,
    incidentType: "None (Routine)",
    confidence: 97.1,
    riskLevel: "Low",
    fileSize: "2.8 MB",
    ocrText: `COMPREHENSIVE FLEET SAFETY AUDIT - Q3 2026
Erode Central Division | Audit Docket: ERO-SAF-2026-Q3
Examined Fleet Sample: TN38AB4567, TN58MN6644, TN33CD1289
Lead Auditor: R. Karthikeyan | Date: 28-Sep-2026

AUDIT HIGHLIGHTS:
- Anti-Lock Braking System (ABS) Electronic Modulators: Function verified on all wheel speed sensors.
- Fire Detection & Suppression Systems (FDAS) in engine bay: Nitrogen pressure within green zone.
- Fuel Tank Roll-Over Protection: Vent cutoff valves responsive.
- Battery disconnect master switches: Easily accessible from driver seat.
Workshop safety compliance score: 94.2/100. Audit cost: ₹9,200.`
  },
  {
    id: "DOC-2026-031",
    name: "tn30gh5543_propeller_shaft_flange_failure.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN30GH5543",
    engineer: "K. Lakshmi",
    depot: "Tiruppur",
    uploadDate: "2026-08-08",
    status: "Completed",
    cost: 34000,
    incidentType: "Minor Collision",
    confidence: 94.9,
    riskLevel: "High",
    fileSize: "3.0 MB",
    ocrText: `DRIVELINE INTEGRITY & TRANSMISSION REPAIR
Tiruppur Central Workshop | Ref: TPR-DL-2026-551
Vehicle: TN30GH5543 | Engineer: K. Lakshmi | Date: 08-Aug-2026

DEFECT:
Severe shuddering underneath floorboards when vehicle speed exceeded 50 km/h. Driver halted bus immediately to prevent driveline detachment.

INSPECTION:
- Rear universal joint cross journal fractured across grease channel.
- Center rubber support bearing cushion shredded.
- Spline coupling showed 1.8 mm radial wobble.

PARTS REPLACED:
- Complete balanced 3-piece propeller shaft assembly: ₹27,500
- Heavy duty center support bearing with polyurethane insulator: ₹4,500
- High tensile 10.9 grade flange bolts with locknuts: ₹2,000
Total Bill: ₹34,000. Driveline dynamic balancing verified at 3000 shaft RPM.`
  },
  {
    id: "DOC-2026-032",
    name: "tn37ef9021_salem_depot_air_suspension_bellow.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN37EF9021",
    engineer: "M. Abdul Rahman",
    depot: "Salem",
    uploadDate: "2026-07-18",
    status: "Completed",
    cost: 28000,
    incidentType: "Brake Failure",
    confidence: 96.3,
    riskLevel: "Medium",
    fileSize: "2.6 MB",
    ocrText: `PNEUMATIC SUSPENSION SYSTEM LOG
Salem West Workshop | Bay 05
Bus ID: TN37EF9021 | Supervising Engineer: M. Abdul Rahman | Date: 18-July-2026

DEFECT:
Left rear bus suspension tilting downward by 80 mm; air compressor running continuously.

DIAGNOSIS:
- Left rear rolling lobe air spring bellow punctured by road gravel thrown from rear duals.
- Leveling valve linkage bent, preventing height sensor feedback.

REPAIRS EXECUTED:
- Replaced Contitech heavy duty air bellow (Part #CT-9102-AS): ₹18,000
- Replaced mechanical pneumatic leveling valve kit: ₹6,500
- Recalibrated chassis ride height to standard 380 mm above wheel axle center: ₹3,500
Total: ₹28,000. Pressure test held 8.5 bar overnight without deflation.`
  },
  {
    id: "DOC-2026-033",
    name: "tn72pq9081_brake_drum_cracking_investigation.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN72PQ9081",
    engineer: "S. Priya Nair",
    depot: "Coimbatore",
    uploadDate: "2026-06-29",
    status: "Completed",
    cost: 22000,
    incidentType: "Brake Failure",
    confidence: 95.7,
    riskLevel: "High",
    fileSize: "2.4 MB",
    ocrText: `PNEUMATIC BRAKE DRUM METALLURGICAL EVALUATION
Coimbatore South Heavy Bay | Lead Engineer: S. Priya Nair
Bus Plate: TN72PQ9081 | Date: 29-June-2026

FAULT LOGGED:
Harsh judder under moderate brake application; driver reported steering wheel pulling to the left during braking.

EXAMINATION:
- Front right brake drum cast iron friction face displayed radial heat check fissures extending 45 mm.
- Drum diameter exceeded maximum machine limit (414 mm vs max allowable 412 mm).

RECTIFICATION:
- Replaced pair of front heavy duty gray cast iron brake drums: ₹14,000
- New asbestos-free brake shoes with copper rivet attachment: ₹5,500
- Grease pack wheel hub bearings with high-temp synthetic wheel grease: ₹2,500
Total Expenditure: ₹22,000. Deceleration rate recorded 6.2 m/s² on test strip.`
  },
  {
    id: "DOC-2026-034",
    name: "fitness_certificate_tn01an1122_chennai.pdf",
    category: "Permit",
    vehicleNumber: "TN01AN1122",
    engineer: "Anand R.",
    depot: "Chennai Central",
    uploadDate: "2026-08-05",
    status: "Completed",
    cost: 4500,
    incidentType: "None (Routine)",
    confidence: 98.9,
    riskLevel: "Low",
    fileSize: "1.7 MB",
    ocrText: `FORM 38 - CERTIFICATE OF ROADWORTHINESS & FITNESS
Regional Transport Office, Chennai Central (TN-01)
Reg No: TN01AN1122 | Engine No: 697TC-99120 | Chassis: TATA-LPO-1618
Depot: Chennai Central Regional Workshop | Engineer: Anand R.
Inspection Date: 05-August-2026

FITNESS ASSESSMENT:
- Service Brakes efficiency: 69.4% (Threshold > 50%) - PASSED
- Parking brake hold on 1:5 gradient: Held stationary - PASSED
- Chassis cross-member squareness and suspension bolts: Clear - PASSED
- Catalytic converter and urea DEF doser pressure: Healthy - PASSED
Statutory testing fee: ₹4,500. Valid through 04-August-2027.`
  },
  {
    id: "DOC-2026-035",
    name: "tn33cd1289_ac_compressor_seizure_madurai.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN33CD1289",
    engineer: "V. Senthil Kumar",
    depot: "Madurai",
    uploadDate: "2026-07-11",
    status: "Completed",
    cost: 49000,
    incidentType: "AC Malfunction",
    confidence: 94.1,
    riskLevel: "High",
    fileSize: "3.1 MB",
    ocrText: `HVAC COMPRESSOR CATASTROPHIC FAILURE ASSESSMENT
Madurai North Heavy Workshop | Engineer: V. Senthil Kumar
Bus: TN33CD1289 (Intercity AC Coach) | Date: 11-July-2026

INCIDENT:
Loud screeching followed by smoke from rear auxiliary engine bay; AC stopped cooling immediately.

INVESTIGATION:
- Bock FK40 655K swashplate compressor internal drive shaft seized due to PAG lubricant breakdown.
- Magnetic clutch burned out and fused to drive pulley.
- Evaporator expansion valve clogged with aluminum debris.

REMEDIAL ACTIONS:
- Replaced complete Bock 4-cylinder swashplate AC compressor unit: ₹36,000
- Installed dual line filter driers and flushed refrigerant loop with R141b solvent: ₹7,000
- Evacuated and recharged 5.5 kg R134a with fresh POE oil charge: ₹6,000
Total Project Cost: ₹49,000. Cabin cooled to 22°C in 38°C ambient test bay.`
  },
  {
    id: "DOC-2026-036",
    name: "quarterly_inspection_tn58mn6644_erode.pdf",
    category: "Inspection Report",
    vehicleNumber: "TN58MN6644",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-09-19",
    status: "Completed",
    cost: 5200,
    incidentType: "None (Routine)",
    confidence: 97.8,
    riskLevel: "Low",
    fileSize: "2.0 MB",
    ocrText: `QUARTERLY PASSENGER BUS AUDIT & EMISSION RECORD
Erode Central Depot | Inspection Officer: R. Karthikeyan
Bus: TN58MN6644 | Date: 19-September-2026

PARAMETERS VERIFIED:
- Pneumatic door safety interlock functional.
- Reverse gear warning chime and proximity sensors active.
- Emergency glass breaker hammers positioned at all 6 passenger bays.
- Fuel sediment bowl zero particulate contamination.
- Driver dashboard gauges all illuminated and calibrated.
Inspection charge: ₹5,200. Cleared for inter-district commercial operations.`
  },
  {
    id: "DOC-2026-037",
    name: "tn45jk7788_steering_tie_rod_end_wear.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN45JK7788",
    engineer: "V. Senthil Kumar",
    depot: "Madurai",
    uploadDate: "2026-06-04",
    status: "Completed",
    cost: 13500,
    incidentType: "Minor Collision",
    confidence: 96.0,
    riskLevel: "Medium",
    fileSize: "2.2 MB",
    ocrText: `FRONT AXLE MECHANICAL DOCKET
Madurai North Workshop | Lead: V. Senthil Kumar
Bus ID: TN45JK7788 | Date: 04-June-2026

DEFECT:
Wandering trajectory on straight highway stretches; excessive steering wheel free play (40 mm).

DIAGNOSIS:
Left and right steering tie rod end ball sockets worn loose; boots torn with grit ingress.

REPAIR:
- Installed heavy duty greasable tie rod end kit: ₹8,500
- Center link track rod adjustment and laser wheel alignment: ₹3,500
- Workshop service: ₹1,500
Total: ₹13,500. Road test certified zero wandering.`
  },
  {
    id: "DOC-2026-038",
    name: "inv_2026_tata_motors_suspension_bushes.pdf",
    category: "Invoice",
    vehicleNumber: "TN01AN1122",
    engineer: "Anand R.",
    depot: "Chennai Central",
    uploadDate: "2026-07-29",
    status: "Completed",
    cost: 42000,
    incidentType: "None (Routine)",
    confidence: 98.5,
    riskLevel: "Low",
    fileSize: "1.3 MB",
    ocrText: `ORIGINAL EQUIPMENT SPARES INVOICE - TATA MOTORS COMMERCIAL
Invoice: TML-CHN-2026-1102 | Date: 29-July-2026 | GST: 33AAACT0491L1Z2
Delivered to: Chennai Central Transit Workshops
Engineer: Anand R.

Description of Parts:
1. Polyurethane Suspension Silentbloc Bushes (Front & Rear Leaf Springs)
   Qty: 32 Units @ ₹850 = ₹27,200
2. Heavy Tensile Leaf Spring Center Bolts (M16x250)
   Qty: 8 Units @ ₹350 = ₹2,800
3. Spring Shackle Bracket Castings (Grade SG Iron)
   Qty: 4 Units @ ₹3,000 = ₹12,000
Taxable Value: ₹42,000 | GST 18%: ₹7,560 | Total Amount: ₹49,560
Stock entry made in Register #09, Folio 12.`
  },
  {
    id: "DOC-2026-039",
    name: "tn38ab4567_turbocharger_wastegate_failure.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN38AB4567",
    engineer: "R. Karthikeyan",
    depot: "Erode",
    uploadDate: "2026-06-18",
    status: "Completed",
    cost: 45000,
    incidentType: "Engine Overheating",
    confidence: 95.9,
    riskLevel: "High",
    fileSize: "3.3 MB",
    ocrText: `ENGINE INDUCTION & FORCED AIR SYSTEM DOCKET
Erode Central Workshop | Bay 03
Vehicle: TN38AB4567 | Engineer: R. Karthikeyan | Date: 18-June-2026

DRIVER REPORT:
Black exhaust smoke under acceleration and lack of pulling power on gradient slopes; boost pressure needle stuck below 0.5 bar (normal 1.8 bar).

INVESTIGATION:
- Garrett variable geometry turbocharger wastegate actuator pneumatic diaphragm split.
- Turbine wheel housing exhibited soot build-up and carbon fouling on nozzle rings.
- Compressor wheel blades showed minor erosion from contaminated intake air.

RESTORATION:
- Turbocharger assembly removed, rebuilt with new core cartridge (CHRA): ₹36,000
- Wastegate boost control solenoid and pressure sensor renewed: ₹5,500
- Intercooler flushed with ultrasonic degreaser: ₹3,500
Total Overhaul: ₹45,000. Boost pressure verified at 1.85 bar under full dynamometer load.`
  },
  {
    id: "DOC-2026-040",
    name: "annual_safety_compliance_tiruppur_depot.pdf",
    category: "Inspection Report",
    vehicleNumber: "TN30GH5543",
    engineer: "K. Lakshmi",
    depot: "Tiruppur",
    uploadDate: "2026-09-30",
    status: "Completed",
    cost: 8000,
    incidentType: "None (Routine)",
    confidence: 97.7,
    riskLevel: "Low",
    fileSize: "2.5 MB",
    ocrText: `TIRUPPUR REGIONAL TRANSIT ANNUAL AUDIT
Depot: Tiruppur City Central | Officer: K. Lakshmi
Vehicles Audited: TN30GH5543 & Sister Units | Date: 30-September-2026

AUDIT OVERVIEW:
- 100% compliance on emergency window exits and hammers.
- First aid kits restocked with burn dressings and antiseptic lotions.
- Drivers breathalyzer logs maintained for 90 consecutive days without defect.
- Vehicle emission logs current with central RTO database.
Audit certification cost: ₹8,000. Grade-A depot status retained.`
  },
  {
    id: "DOC-2026-041",
    name: "tn37ef9021_exhaust_scr_adblue_doser_block.pdf",
    category: "Maintenance Report",
    vehicleNumber: "TN37EF9021",
    engineer: "M. Abdul Rahman",
    depot: "Salem",
    uploadDate: "2026-09-25",
    status: "Completed",
    cost: 27500,
    incidentType: "Engine Overheating",
    confidence: 96.6,
    riskLevel: "Medium",
    fileSize: "2.7 MB",
    ocrText: `BS-VI EMISSION CONTROL REPAIR SHEET
Salem West Depot | Work Docket: SLM-SCR-2026-88
Bus: TN37EF9021 | Engineer: M. Abdul Rahman | Date: 25-Sep-2026

FAULT CODE:
OBD-II error P20EE - SCR NOx Catalyst Efficiency Below Threshold (Bank 1). Yellow engine MIL illuminated; engine power de-rated by 25%.

DIAGNOSTIC WORK:
- DEF (Diesel Exhaust Fluid / AdBlue) dosing injection nozzle crusted with crystallized urea salts.
- SCR upstream NOx sensor heater circuit failed (code P2200).

REPAIRS:
- De-crystallized and cleaned AdBlue injector with heated deionized water: ₹3,500
- Replaced Continental 24V NOx Sensor upstream unit: ₹18,000
- Drained contaminated urea tank; refilled with 40 Litres certified ISO 22241 DEF: ₹6,000
Total Expenditure: ₹27,500. NOx reduction efficiency restored to 94.8%.`
  },
  {
    id: "DOC-2026-042",
    name: "tn72pq9081_fuel_tank_puncture_incident.pdf",
    category: "Accident Report",
    vehicleNumber: "TN72PQ9081",
    engineer: "S. Priya Nair",
    depot: "Coimbatore",
    uploadDate: "2026-09-04",
    status: "Completed",
    cost: 36000,
    incidentType: "Minor Collision",
    confidence: 93.9,
    riskLevel: "Critical",
    fileSize: "3.5 MB",
    ocrText: `HAZARDOUS FUEL INCIDENT INQUIRY REPORT
Coimbatore South Depot | Safety Cell Docket: CS-HAZ-2026-09
Vehicle: TN72PQ9081 | Route: Pollachi - Coimbatore
Investigating Engineer: S. Priya Nair | Date: 04-Sep-2026

INCIDENT:
A piece of unfastened construction angle iron lying on highway pierced bottom of aluminum fuel tank. Approximately 60 litres of diesel spilled onto road before bus halted safely in designated lay-by.

EMERGENCY RESPONSE:
- Local Fire Brigade summoned; chemical foam spread over spill to extinguish ignition risk.
- Passengers evacuated safely to relief vehicle within 4 minutes.

RECONSTRUCTION & REPAIR:
- Replaced pierced fuel tank with new 250 Litre heavy gauge baffled aluminum tank: ₹24,000
- Fabricated 4 mm steel underbody stone shield armor guard: ₹8,000
- Fire brigade hazmat cleanup clearance fee: ₹4,000
Total Cost: ₹36,000. Passed hydrostatic pressure leak test.`
  }
];

export const TRANSIT_DEPOTS = [
  "Erode",
  "Coimbatore",
  "Salem",
  "Tiruppur",
  "Madurai",
  "Chennai Central"
];

export const DOCUMENT_CATEGORIES = [
  "Maintenance Report",
  "Inspection Report",
  "Accident Report",
  "Invoice",
  "Permit",
  "Service Log"
];

export const INCIDENT_TYPES = [
  "Brake Failure",
  "Engine Overheating",
  "Minor Collision",
  "Tyre Burst",
  "AC Malfunction",
  "Electrical Fault",
  "Passenger Injury",
  "None (Routine)"
];

export const TRANSIT_ENGINEERS = [
  "R. Karthikeyan",
  "S. Priya Nair",
  "M. Abdul Rahman",
  "K. Lakshmi",
  "V. Senthil Kumar",
  "Anand R."
];
