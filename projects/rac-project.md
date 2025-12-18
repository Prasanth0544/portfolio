# RAC Reallocation System

---

## Real-World Context: What is RAC?

RAC (Reservation Against Cancellation) is a booking status in Indian Railways where two passengers share a single berth. If a confirmed passenger cancels or does not board the train, RAC passengers are eligible for berth upgrades. However, upgrades are often delayed or missed due to manual verification by TTEs (Travelling Ticket Examiners).

---

## Problems in the Existing RAC System

- No real-time detection of no-show passengers
- No detection of vacant journey segments
- Manual and delayed seat reallocation by TTEs
- RAC upgrades depend entirely on human intervention
- Passengers often miss upgrades despite vacant berths
- No automated notification or response mechanism

---

## How My System Improves RAC Reallocation

- **Detects vacant segments in real-time** - not just no-shows, but any vacant berth segments
- **Segment-based vacancy matching** - identifies exactly which journey segments are vacant
- Automatically identifies eligible RAC passengers based on journey overlap
- Sends instant upgrade offers with a response timer
- Updates all systems (Admin, TTE, Passenger) in real-time via WebSocket

---

## Key Innovation: Segment-Based Vacancy Detection

Unlike traditional systems that only track full-journey vacancies, my system tracks **per-segment occupancy**:

```
BERTH S1-15 Occupancy:
┌─────────────────────────────────────────────────────────────┐
│ Station:  1    2    3    4    5    6    7    8    9   10    │
├─────────────────────────────────────────────────────────────┤
│ Segment:  ████████████████░░░░░░░░░░░░░░░█████████████████  │
│           Passenger A      VACANT        Passenger B        │
│           (Stn 1→5)       (Stn 5→7)      (Stn 7→10)         │
└─────────────────────────────────────────────────────────────┘

RAC Passenger traveling Stn 4→8 can be upgraded for segments 5→7!
```

**This means:**
- Same berth can have multiple passengers on non-overlapping segments
- Vacant "gaps" in the middle of a journey are detected
- RAC passengers are matched based on journey segment overlap

---

## System Flow

```
TRAIN INITIALIZED → JOURNEY PROGRESSES → SYSTEM SCANS FOR VACANCIES
                                                    ↓
                           ┌────────────────────────────────────┐
                           │     VACANCY SOURCES:                │
                           │  1. No-show passengers              │
                           │  2. Partial journey segments        │
                           │  3. Pre-existing gaps               │
                           └────────────────────────────────────┘
                                                    ↓
           PASSENGER ACCEPTS ← UPGRADE OFFER SENT ← ELIGIBLE RAC FOUND
                   ↓
           STATUS: RAC → CONFIRMED (Real-time update to all portals)
```

**Step-by-Step:**

1. **Admin configures train** - coaches, berths, stations, passengers
2. **Journey progresses** - system tracks current station
3. **TTE marks no-shows** - creates vacancy for remaining journey
4. **System scans all berths** - finds vacant segments at current station
5. **Matches RAC passengers** - journey must overlap with vacant segment
6. **Push notification sent** - upgrade offer with countdown timer
7. **Passenger responds** - Accept → RAC becomes Confirmed
8. **Real-time broadcast** - all portals update instantly

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                                │
├────────────────┬────────────────┬────────────────────────────┤
│  Admin Portal  │   TTE Portal   │    Passenger Portal        │
│  (Port 5173)   │   (Port 5174)  │    (Port 5175)             │
│                │                │                            │
│  - Configure   │  - Verify      │  - View status             │
│  - Monitor     │  - Mark no-show│  - Accept upgrades         │
│  - Manage      │  - Approve     │  - Notifications           │
└────────────────┴────────────────┴────────────────────────────┘
                            │
                   REST API + WebSocket
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 BACKEND (Port 5000)                          │
│                 Node.js + Express                            │
│                                                              │
│  - 30+ API endpoints                                         │
│  - WebSocket for real-time updates                          │
│  - Segment-based vacancy detection                          │
│  - Push notifications (Web Push, Email, SMS)                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB                                 │
│  - trainState (coaches, berths, segmentOccupancy[])         │
│  - passengers (bookings, fromIdx, toIdx)                    │
│  - notifications (upgrade offers)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database with segment arrays |
| WebSocket (ws) | Real-time communication |
| JWT + bcrypt | Authentication |
| Web Push / Nodemailer / Twilio | Notifications |

### Frontend (3 Portals)
| Technology | Purpose |
|------------|---------|
| React 19 + Vite | UI framework |
| TypeScript | Type safety |
| Material UI | Components |

---

## What Each Portal Does

**Admin Portal** - Configure trains, manage passengers, view segment occupancy visualization

**TTE Portal** - Verify boarding, mark no-shows, approve reallocation requests

**Passenger Portal** - View status, receive upgrade offers, accept/deny with timer

---

## Quick Interview Answer

> "In Indian Railways, RAC passengers share a berth and are eligible for upgrades when berths become vacant. The problem is that upgrades are handled manually and often missed.
>
> I built a real-time MERN-based system that tracks **per-segment berth occupancy** - so it detects not just no-shows, but any vacant journey segments. When a vacancy is found, the system automatically matches eligible RAC passengers based on journey overlap and sends instant upgrade offers with real-time notifications."

---

*Built with MERN Stack (MongoDB, Express, React, Node.js)*
