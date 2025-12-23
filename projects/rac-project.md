# 🚂 RAC Reallocation System - Portfolio Summary

---

## **Project Title**
**Real-Time Railway RAC Seat Reallocation System**

## **Project Type**
Full-Stack Web Application | MERN Stack

---

## **Problem Statement**
Indian Railways operates a Reservation Against Cancellation (RAC) system where passengers get partial berths. When confirmed passengers don't show up, their berths remain vacant throughout the journey while RAC passengers continue sitting. There's no automated system to dynamically upgrade RAC passengers to these vacant berths in real-time.

---

## **Solution**
Built a complete **real-time seat reallocation system** that:
- Detects vacant berths when passengers are marked as no-shows
- Automatically identifies eligible RAC passengers using priority-based algorithms
- Implements a dual-approval workflow (TTE approval → Passenger confirmation)
- Delivers instant push notifications to passengers for upgrade offers
- Tracks segment-based occupancy allowing the same berth to serve multiple passengers on non-overlapping routes

---

## **Technical Highlights**

| Metric | Value |
|--------|-------|
| **Lines of Code** | 40,000+ |
| **REST API Endpoints** | 84 (39 GET, 45 POST) |
| **Unit/Integration Tests** | 1,153 tests |
| **Test Coverage** | 79.57% |
| **Portals Built** | 3 (Admin, TTE, Passenger) |
| **Real-time Features** | WebSocket broadcasting |
| **Notification Types** | Push, Email, In-App |

---

## **Technology Stack**

| Layer | Technologies |
|-------|--------------|
| **Backend** | Node.js, Express.js 4.18, MongoDB 6.3 |
| **Frontend** | React 19, Vite 6.4/7.2, Material-UI 7, TypeScript |
| **Real-time** | WebSocket (ws), Web Push API (VAPID) |
| **Authentication** | JWT with refresh tokens, bcrypt, CSRF protection |
| **Testing** | Jest 30, Supertest, 50 test suites |
| **Documentation** | Swagger/OpenAPI |
| **DevOps** | Docker support, Nodemon |

---

## **Key Features Implemented**

### 🎫 **Passenger Portal** (10 pages)
- IRCTC-style login with JWT authentication
- Real-time upgrade offers with countdown timers
- Accept/deny upgrade functionality
- QR code boarding pass generation
- Push notifications (works even when browser is closed)

### 👮 **TTE (Staff) Portal** (17 pages)
- Role-based access control (TTE, Admin roles)
- Passenger verification and no-show marking
- RAC reallocation approval workflow
- Action history with undo capability
- Station-by-station journey progression

### 🔐 **Admin Portal** (23 pages)
- Dynamic train initialization from MongoDB
- Interactive 9-coach × 72-berth visualization
- Segment-based occupancy matrix
- RAC queue priority management
- Real-time statistics dashboard

### ⚙️ **Backend API** (84 endpoints)
- RESTful API architecture
- WebSocket real-time broadcasting
- Automatic data cleanup on server restart
- Multi-train support architecture
- Comprehensive input validation & sanitization

---

## **Architecture Diagram**

```
┌─────────────────────────────────────────────────────────────────┐
│                    RAC REALLOCATION SYSTEM                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐       │
│  │ Admin Portal │  │  TTE Portal  │  │ Passenger Portal │       │
│  │  (React 19)  │  │  (React 19)  │  │    (React 19)    │       │
│  │  Port 3000   │  │  Port 5174   │  │    Port 5175     │       │
│  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘       │
│         │                 │                    │                │
│         └─────────────────┼────────────────────┘                │
│                           │                                     │
│                    ┌──────▼──────┐                              │
│                    │   Backend   │                              │
│                    │ Express.js  │◄────── WebSocket (ws)        │
│                    │  Port 5000  │◄────── Web Push (VAPID)      │
│                    │  84 APIs    │                              │
│                    └──────┬──────┘                              │
│                           │                                     │
│                    ┌──────▼──────┐                              │
│                    │   MongoDB   │                              │
│                    │ - Stations  │                              │
│                    │ - Passengers│                              │
│                    │ - Auth      │                              │
│                    └─────────────┘                              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## **Core Innovation: Segment-Based Occupancy**

Unlike traditional berth booking systems, I implemented **segment-based tracking** that maximizes berth utilization:

```
Berth S1-15 Journey: Vijayawada → Visakhapatnam (12 stations)

Station:     1    2    3    4    5    6    7    8    9   10   11   12
Segment:    [S1] [S2] [S3] [S4] [S5] [S6] [S7] [S8] [S9] [S10][S11][--]

Passenger A: ████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
             (Boarding: Stn 1, Deboarding: Stn 5)

Passenger B: ░░░░░░░░░░░░░░░░░░░░████████████████████░░░░░░░░░░░░░░░░
             (Boarding: Stn 5, Deboarding: Stn 9)

RAC Upgrade: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████████████
             (Upgraded at Stn 9, travels to Stn 12)
```

**Result**: Same physical berth efficiently used by 3 different passengers!

---

## **Reallocation Algorithm**

### RAC Priority System (RAC Number Priority - Ascending Order)
```
RAC-1 (Highest Priority) → Upgraded First
RAC-2                    → Upgraded Second
RAC-3                    → Upgraded Third
And so on...
```

### Dual-Approval Workflow
```
1. Berth becomes vacant (passenger no-show)
         ↓
2. System identifies eligible RAC passengers
         ↓
3. TTE approves reallocation from TTE Portal
         ↓
4. Passenger receives push notification
         ↓
5. Passenger accepts/denies within timeout
         ↓
6. If accepted → RAC status upgraded to CNF
   If denied  → Offer goes to next RAC passenger
```

---

## **Security Implementation**

| Security Feature | Implementation |
|-----------------|----------------|
| **Authentication** | JWT with 1-hour expiry + 7-day refresh tokens |
| **Authorization** | Role-based access control (Admin, TTE, Passenger) |
| **CSRF Protection** | Double-submit cookie pattern |
| **Rate Limiting** | 5 login attempts/15min, 100 general/15min |
| **Input Validation** | Joi/Zod schema validation |
| **XSS Prevention** | Input sanitization, HTML escaping |
| **Password Security** | bcrypt with salt rounds |
| **Token Refresh** | Automatic token refresh on 401 errors |

---

## **Test Coverage**

```
┌────────────────────────────────────────────────────────────────┐
│                    TEST COVERAGE: 79.57%                       │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Services:      ████████████████████████████░░░ 88.37%         │
│                                                                │
│  Reallocation:  █████████████████████████████░░ 89.71%         │
│                                                                │
│  Utils:         ██████████████████░░░░░░░░░░░░░ 71.55%         │
│                                                                │
│  Controllers:   █████████████████░░░░░░░░░░░░░░ 68.58%         │
│                                                                │
│  Total Tests: 1,153 | Test Suites: 50 | All Passing ✅         │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## **Real-World Data Model**

| Train Data | Value |
|------------|-------|
| **Train Model** | 17225 Amaravathi Express |
| **Coaches** | 9 Sleeper + 3A AC coaches |
| **Berths per Coach** | 72 (Sleeper) / 64 (3A AC) |
| **Total Passengers** | 648+ passengers |
| **Stations** | 28 stops |
| **Route** | Narasapur → Secunderabad |
| **Journey Duration** | ~18 hours |

---

## **API Categories**

| Category | Endpoints | Used For |
|----------|-----------|----------|
| **Authentication** | 6 | Login, logout, token refresh, verify |
| **Train Management** | 8 | Initialize, start, next station, reset |
| **Passenger Operations** | 15 | Search, CRUD, no-show, boarding |
| **Reallocation** | 12 | Eligibility, approve, reject, pending |
| **TTE Operations** | 18 | Dashboard, actions, history, undo |
| **Visualization** | 8 | Segment matrix, heatmap, graphs |
| **Notifications** | 10 | Push subscribe, upgrade offers, alerts |
| **Config/Misc** | 7 | Setup, health, CSRF token |

---

## **Skills Demonstrated**

### Backend Development
- RESTful API design (84 endpoints)
- Real-time WebSocket implementation
- MongoDB database modeling
- JWT authentication with refresh tokens
- Rate limiting and security middleware

### Frontend Development
- React 19 with hooks and context
- TypeScript for type safety
- Material-UI component library
- Responsive design for mobile/desktop
- WebSocket client integration

### Testing & Quality
- Jest unit testing (1,153 tests)
- Integration testing with Supertest
- 79.57% code coverage
- Test-driven development approach

### DevOps & Tools
- Docker containerization
- Git version control
- Swagger API documentation
- Environment configuration

---

## **What I Learned**

1. **Segment-Based Data Modeling** - Complex occupancy tracking across journey segments
2. **Real-Time Systems** - WebSocket and Push Notification implementation
3. **Dual-Approval Workflows** - Multi-party confirmation systems
4. **Security Best Practices** - JWT refresh, CSRF, rate limiting
5. **Large-Scale Testing** - Achieving high coverage with 1,153 tests
6. **Full-Stack Integration** - Seamless communication between 4 applications

---

## **Future Enhancements**

- [ ] Mobile app using React Native
- [ ] AI-based prediction for no-shows
- [ ] Multi-language support (Hindi, Telugu)
- [ ] Integration with actual IRCTC APIs
- [ ] Analytics dashboard with Power BI
- [ ] Multi train acess
---

## **Project Links**

- **GitHub Repository**: https://github.com/Prasanth0544/poratls_of_rac   

---

**Developed by**: Prasanth Gannavarapu
**Email**: prasanthgannavarapu5@gmail.com 
**LinkedIn**: https://www.linkedin.com/in/prasanth-gannavarapu-9516242a0
**Last Updated**: December 2024

---

*Built for Indian Railways - Train 17225 Amaravathi Express* 🚂
