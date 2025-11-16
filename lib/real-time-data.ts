"use client"

// Shared data structures and real-time simulation service
export interface ClassSession {
  id: string
  courseTitle: string
  type: "Cours" | "TP" | "TD"
  instructor: string
  location: string
  day: string
  startTime: string
  endTime: string
  capacity: number
  currentOccupancy: number
  classLevel: string
}

export interface ClassroomStatus {
  id: string
  name: string
  capacity: number
  isLocked: boolean
  lastAccess: string
  currentClass: ClassSession | null
  nextClass: ClassSession | null
  weekSchedule: ClassSession[]
}

export interface DoorStatus {
  id: string
  classroomId: string
  name: string
  isOpen: boolean
  lastUnlockedBy: string
  lastUnlockedTime: string
  batteryLevel: number
  isConnected: boolean
  linkedClasses: ClassSession[]
}

export interface ProfessorSchedule {
  professorId: string
  name: string
  email: string
  department: string
  totalHoursPerWeek: number
  schedule: ClassSession[]
}

// Mock data - replace with real API calls
export const mockClassSessions: ClassSession[] = [
  {
    id: "1",
    courseTitle: "Enterprise Resource Planning",
    type: "TP",
    instructor: "Dr. Khiat",
    location: "LAB-01",
    day: "Dimanche",
    startTime: "08:15",
    endTime: "09:45",
    capacity: 30,
    currentOccupancy: 28,
    classLevel: "5ème",
  },
  {
    id: "2",
    courseTitle: "ITI",
    type: "TP",
    instructor: "Dr. Khiat/Mlle Senousaoui",
    location: "LAB-01",
    day: "Dimanche",
    startTime: "10:00",
    endTime: "11:30",
    capacity: 30,
    currentOccupancy: 25,
    classLevel: "5ème",
  },
  {
    id: "3",
    courseTitle: "Systèmes Embarqués",
    type: "Cours",
    instructor: "Dr. Belbachir",
    location: "S-214",
    day: "Dimanche",
    startTime: "14:00",
    endTime: "15:30",
    capacity: 50,
    currentOccupancy: 45,
    classLevel: "5ème",
  },
  {
    id: "4",
    courseTitle: "Systèmes Embarqués",
    type: "TD",
    instructor: "Dr. Belbachir",
    location: "S-214",
    day: "Dimanche",
    startTime: "15:30",
    endTime: "17:00",
    capacity: 50,
    currentOccupancy: 48,
    classLevel: "5ème",
  },
  {
    id: "5",
    courseTitle: "Travail collaboratif",
    type: "Cours",
    instructor: "Mme.Si Moussa",
    location: "S-212",
    day: "Lundi",
    startTime: "10:00",
    endTime: "11:30",
    capacity: 40,
    currentOccupancy: 38,
    classLevel: "5ème",
  },
  {
    id: "6",
    courseTitle: "Fouille de données et recherche d'information",
    type: "TP",
    instructor: "Dr. Kabli",
    location: "LAB-03",
    day: "Lundi",
    startTime: "10:00",
    endTime: "11:30",
    capacity: 30,
    currentOccupancy: 29,
    classLevel: "5ème",
  },
  {
    id: "7",
    courseTitle: "Fouille de données et recherche d'information",
    type: "Cours",
    instructor: "Dr. Kabli",
    location: "S-212",
    day: "Lundi",
    startTime: "11:45",
    endTime: "13:15",
    capacity: 50,
    currentOccupancy: 47,
    classLevel: "5ème",
  },
  {
    id: "8",
    courseTitle: "ERP",
    type: "Cours",
    instructor: "Dr. Khiat",
    location: "S-212",
    day: "Lundi",
    startTime: "14:00",
    endTime: "15:30",
    capacity: 50,
    currentOccupancy: 49,
    classLevel: "5ème",
  },
  {
    id: "9",
    courseTitle: "ITI",
    type: "Cours",
    instructor: "MR Khiat",
    location: "S212",
    day: "Lundi",
    startTime: "15:30",
    endTime: "17:00",
    capacity: 50,
    currentOccupancy: 50,
    classLevel: "5ème",
  },
  {
    id: "10",
    courseTitle: "EDI",
    type: "Cours",
    instructor: "Dr. Mezzoudj",
    location: "S-212",
    day: "Mardi",
    startTime: "08:15",
    endTime: "09:45",
    capacity: 50,
    currentOccupancy: 45,
    classLevel: "5ème",
  },
  {
    id: "11",
    courseTitle: "Antennes imprimées",
    type: "Cours",
    instructor: "Dr. Didouh",
    location: "S-212",
    day: "Mardi",
    startTime: "10:00",
    endTime: "11:30",
    capacity: 50,
    currentOccupancy: 42,
    classLevel: "Master",
  },
  {
    id: "12",
    courseTitle: "EDI",
    type: "TP",
    instructor: "Dr. Mezzoudj",
    location: "LAB-01",
    day: "Mardi",
    startTime: "11:45",
    endTime: "13:15",
    capacity: 30,
    currentOccupancy: 28,
    classLevel: "5ème",
  },
  {
    id: "13",
    courseTitle: "Sécurité des réseaux de Télécommunication",
    type: "TP",
    instructor: "Dr. Mezzoudj",
    location: "LAB-03",
    day: "Mercredi",
    startTime: "08:15",
    endTime: "09:45",
    capacity: 30,
    currentOccupancy: 28,
    classLevel: "5ème",
  },
  {
    id: "14",
    courseTitle: "Sécurité des réseaux de Télécommunication",
    type: "Cours",
    instructor: "Dr. Mezzoudj",
    location: "S-212",
    day: "Mercredi",
    startTime: "10:00",
    endTime: "11:30",
    capacity: 50,
    currentOccupancy: 48,
    classLevel: "5ème",
  },
  {
    id: "15",
    courseTitle: "Fouille de données et recherche d'information",
    type: "TP",
    instructor: "Dr. Kabli",
    location: "S-212",
    day: "Mercredi",
    startTime: "11:45",
    endTime: "13:15",
    capacity: 50,
    currentOccupancy: 46,
    classLevel: "5ème",
  },
  {
    id: "16",
    courseTitle: "Cloud Computing Virtualisation",
    type: "Cours",
    instructor: "Dr. Mezzoudj",
    location: "S-212",
    day: "Mercredi",
    startTime: "14:00",
    endTime: "15:30",
    capacity: 50,
    currentOccupancy: 49,
    classLevel: "5ème",
  },
  {
    id: "17",
    courseTitle: "Cloud Computing Virtualisation",
    type: "TP",
    instructor: "Dr. Mezzoudj",
    location: "LAB-02",
    day: "Mercredi",
    startTime: "15:30",
    endTime: "17:00",
    capacity: 30,
    currentOccupancy: 29,
    classLevel: "5ème",
  },
  {
    id: "18",
    courseTitle: "Rédaction scientifique",
    type: "Cours",
    instructor: "Pr. Brahami",
    location: "S-212",
    day: "Jeudi",
    startTime: "10:00",
    endTime: "11:30",
    capacity: 50,
    currentOccupancy: 35,
    classLevel: "5ème",
  },
  {
    id: "19",
    courseTitle: "Travail collaboratif",
    type: "TP",
    instructor: "Dr. Belbachir",
    location: "LAB-01",
    day: "Jeudi",
    startTime: "11:45",
    endTime: "13:15",
    capacity: 30,
    currentOccupancy: 27,
    classLevel: "5ème",
  },
]

export const mockClassrooms: ClassroomStatus[] = [
  {
    id: "S-212",
    name: "Classroom S-212",
    capacity: 50,
    isLocked: false,
    lastAccess: "Dr. Khiat - 10:15",
    currentClass: mockClassSessions[1],
    nextClass: mockClassSessions[2],
    weekSchedule: mockClassSessions.filter((c) => c.location === "S-212"),
  },
  {
    id: "LAB-01",
    name: "Lab LAB-01",
    capacity: 30,
    isLocked: true,
    lastAccess: "Dr. Mezzoudj - 09:30",
    currentClass: null,
    nextClass: mockClassSessions[5],
    weekSchedule: mockClassSessions.filter((c) => c.location === "LAB-01"),
  },
  {
    id: "S-214",
    name: "Classroom S-214",
    capacity: 50,
    isLocked: false,
    lastAccess: "Dr. Belbachir - 08:45",
    currentClass: mockClassSessions[2],
    nextClass: mockClassSessions[3],
    weekSchedule: mockClassSessions.filter((c) => c.location === "S-214"),
  },
  {
    id: "LAB-03",
    name: "Lab LAB-03",
    capacity: 30,
    isLocked: true,
    lastAccess: "Dr. Kabli - 09:15",
    currentClass: null,
    nextClass: mockClassSessions[6],
    weekSchedule: mockClassSessions.filter((c) => c.location === "LAB-03"),
  },
]

export const mockDoors: DoorStatus[] = [
  {
    id: "DOOR-001",
    classroomId: "S-212",
    name: "Door S-212",
    isOpen: false,
    lastUnlockedBy: "Dr. Khiat",
    lastUnlockedTime: "10:15",
    batteryLevel: 85,
    isConnected: true,
    linkedClasses: mockClassSessions.filter((c) => c.location === "S-212"),
  },
  {
    id: "DOOR-002",
    classroomId: "LAB-01",
    name: "Door LAB-01",
    isOpen: true,
    lastUnlockedBy: "Dr. Mezzoudj",
    lastUnlockedTime: "09:30",
    batteryLevel: 92,
    isConnected: true,
    linkedClasses: mockClassSessions.filter((c) => c.location === "LAB-01"),
  },
  {
    id: "DOOR-003",
    classroomId: "S-214",
    name: "Door S-214",
    isOpen: false,
    lastUnlockedBy: "Dr. Belbachir",
    lastUnlockedTime: "08:45",
    batteryLevel: 78,
    isConnected: true,
    linkedClasses: mockClassSessions.filter((c) => c.location === "S-214"),
  },
  {
    id: "DOOR-004",
    classroomId: "LAB-03",
    name: "Door LAB-03",
    isOpen: false,
    lastUnlockedBy: "Dr. Kabli",
    lastUnlockedTime: "09:15",
    batteryLevel: 88,
    isConnected: true,
    linkedClasses: mockClassSessions.filter((c) => c.location === "LAB-03"),
  },
]

export const mockProfessors: ProfessorSchedule[] = [
  {
    professorId: "PROF-001",
    name: "Dr. Khiat",
    email: "khiat@polytechnic.dz",
    department: "GSI",
    totalHoursPerWeek: 9,
    schedule: mockClassSessions.filter((c) => c.instructor.includes("Khiat")),
  },
  {
    professorId: "PROF-002",
    name: "Dr. Belbachir",
    email: "belbachir@polytechnic.dz",
    department: "GSI",
    totalHoursPerWeek: 7,
    schedule: mockClassSessions.filter((c) => c.instructor.includes("Belbachir")),
  },
  {
    professorId: "PROF-003",
    name: "Dr. Mezzoudj",
    email: "mezzoudj@polytechnic.dz",
    department: "GSI",
    totalHoursPerWeek: 11,
    schedule: mockClassSessions.filter((c) => c.instructor.includes("Mezzoudj")),
  },
  {
    professorId: "PROF-004",
    name: "Dr. Kabli",
    email: "kabli@polytechnic.dz",
    department: "GSI",
    totalHoursPerWeek: 6,
    schedule: mockClassSessions.filter((c) => c.instructor.includes("Kabli")),
  },
]

// Real-time simulation - in production, replace with WebSocket or polling
export function simulateRealTimeUpdates(callback: () => void) {
  // Simulate updates every 3 seconds
  const interval = setInterval(callback, 3000)
  return () => clearInterval(interval)
}
