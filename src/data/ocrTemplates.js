/**
 * OCR Text Templates for Dynamic Simulation
 * Used when user uploads files in the Upload Document pipeline
 */

export const OCR_TEMPLATES = {
  "Maintenance Report": (meta) => `TAMIL NADU STATE ROAD TRANSPORT CORPORATION
DEPOT MAINTENANCE CLEARANCE RECORD
Document ID: DOC-${Date.now().toString().slice(-4)}
Vehicle Registration: ${meta.vehicleNumber}
Depot Assigned: ${meta.depot}
Lead Mechanical Engineer: ${meta.engineer}
Date of Maintenance: ${meta.date}

DEFECT LOGGED & INVESTIGATION:
Vehicle experienced anomalous vibration and mechanical resistance in the primary operational subsystem. Incident classified under ${meta.incidentType}.
Mechanical disassembly confirmed wear beyond operational tolerances. Diagnostic scans confirmed sensor error codes.

CORRECTIVE RECTIFICATIONS PERFORMED:
1. Complete overhaul and replacement of worn subassemblies with OEM specification parts.
2. Pressure testing, fluid replenishment, and hydraulic/pneumatic circuit bleeding.
3. Wheel alignment and road safety decelerometer audit.
Total Overhaul Expense: ₹${meta.cost.toLocaleString('en-IN')}
Sign-off: Road test completed successfully; vehicle approved for scheduled passenger transit.`,

  "Inspection Report": (meta) => `GOVERNMENT OF TAMIL NADU - TRANSPORT DEPARTMENT
SAFETY, STATUTORY AUDIT & ROADWORTHINESS INSPECTION
Audit Ref: AUD-${Date.now().toString().slice(-4)}
Vehicle Registration Mark: ${meta.vehicleNumber}
Depot Base: ${meta.depot}
Inspecting Engineer: ${meta.engineer}
Date of Audit: ${meta.date}

COMPREHENSIVE AUDIT PARAMETERS:
- Dual Circuit Service Brakes: 67.5% total braking deceleration efficiency - PASSED
- Suspension Spring Brackets & Shock Absorbers: Inspected, torqued to specification - PASSED
- Emergency Push Windows, Hammers, and Failsafe Exit Doors: Fully operational - PASSED
- Diesel Exhaust Opacity (BS-VI Free Acceleration Smoke Test): 29% HSU - PASSED
- Speed Limiting Device (AIS-018): Calibrated and lead-sealed at 80 km/h - PASSED
Inspection Fee Remitted: ₹${meta.cost.toLocaleString('en-IN')}
Clearance valid for passenger transit operations.`,

  "Accident Report": (meta) => `DIVISIONAL TRANSIT ACCIDENT & CRASH INVESTIGATION REPORT
Safety Investigation Board | Case Ref: CIR-${Date.now().toString().slice(-4)}
Vehicle Registration: ${meta.vehicleNumber}
Depot: ${meta.depot} | Assigned Engineer: ${meta.engineer}
Incident Date: ${meta.date} | Classification: ${meta.incidentType}

INCIDENT SUMMARY & SITE OBSERVATIONS:
Vehicle was involved in an operational incident near highway junction. Driver initiated emergency stopping protocol. No passenger fatalities reported; minor material impact recorded.

STRUCTURAL & RUNNING GEAR AUDIT:
- Primary impact absorbed by energy-dissipating front cross-member.
- Steering linkage and pneumatic brake piping sustained localized stress.
- Axle geometry checked on alignment rig; within allowable repair tolerances.

RESTORATION ESTIMATE & QUANTITIES:
- Structural cowl reinforcement, panel welding and anti-corrosive primer coating.
- Replacement of fractured safety glass and lighting fixtures.
Total Estimated Repair Value: ₹${meta.cost.toLocaleString('en-IN')}
Certified by ${meta.engineer} for insurance claim and workshop scheduling.`,

  "Invoice": (meta) => `TAX INVOICE - COMMERCIAL TRANSIT SPARES & LUBRICANTS
Invoice Ref: INV-${Date.now().toString().slice(-4)} | Date: ${meta.date}
GSTIN: 33AAACT9012M1Z5
Billed To: Tamil Nadu Transit Depot, ${meta.depot}
Authorizing Engineer: ${meta.engineer}
Allocated Vehicle: ${meta.vehicleNumber}

Line Items:
1. High-Performance Fleet Replacement Assembly & Consumables
   HSN: 8708 | Qty: 1 Kit | Rate: ₹${Math.round(meta.cost * 0.85).toLocaleString('en-IN')}
2. Workshop Labor & Specialist Calibration Service
   HSN: 9987 | Rate: ₹${Math.round(meta.cost * 0.15).toLocaleString('en-IN')}

Taxable Value: ₹${meta.cost.toLocaleString('en-IN')}
CGST @ 9%: ₹${Math.round(meta.cost * 0.09).toLocaleString('en-IN')}
SGST @ 9%: ₹${Math.round(meta.cost * 0.09).toLocaleString('en-IN')}
Net Payable Amount: ₹${Math.round(meta.cost * 1.18).toLocaleString('en-IN')}
Payment Approved by Divisional Accounts Officer.`,

  "Permit": (meta) => `STATE TRANSPORT AUTHORITY - TAMIL NADU
FORM P.Co.P. - COMPREHENSIVE ROAD PERMIT
Permit Number: PRM-${Date.now().toString().slice(-4)}
Authorized Vehicle Number: ${meta.vehicleNumber}
Home Depot: ${meta.depot}
Supervising Officer: ${meta.engineer}
Authorization Date: ${meta.date}

PERMIT PARTICULARS:
Class of Vehicle: Heavy Passenger Stage Carriage (Omnibus)
Seating Capacity: 52 In-all (Driver + Conductor + 50 Passengers)
Authorized Routes: Inter-district arterial transit corridor originating from ${meta.depot}.
Statutory Permit Fee Remitted: ₹${meta.cost.toLocaleString('en-IN')}
Compliance with AIS-140 GPS Telematics and Central SOS button verified.
Valid for 12 calendar months from the date of issuance.`,

  "Service Log": (meta) => `PREVENTIVE FLEET SCHEDULED MAINTENANCE RECORD
Depot Workshop: ${meta.depot} | Bay 03
Vehicle Plate: ${meta.vehicleNumber}
Service Type: Standard 25,000 km Scheduled Service
Technician / Engineer: ${meta.engineer}
Date Executed: ${meta.date}

SERVICE CHECKLIST:
- Evacuated engine sump; renewed high-grade 15W-40 CI-4 diesel oil.
- Replaced primary & secondary fuel spin-on filtration elements.
- Greased universal joints, kingpins, and front suspension shackle pins.
- Cleaned dry-paper air filter canister and cyclone pre-cleaner.
- Checked battery specific gravity (1.260 standard) and alternator charging (28.4V).
Total Cost of Consumables & Workshop Labor: ₹${meta.cost.toLocaleString('en-IN')}
Vehicle certified roadworthy for scheduled dispatch.`
};
