import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

export interface Classroom {
  id: string
  name: string
  capacity: number
}

export interface Professor {
  professorId: string
  name: string
  email: string
  department: string
  totalHoursPerWeek: number
}

export interface AppState {
  classrooms: Classroom[]
  professors: Professor[]
  classSessions: ClassSession[]
  
  // Classroom actions
  addClassroom: (classroom: Omit<Classroom, 'id'>) => void
  deleteClassroom: (id: string) => void
  
  // Professor actions
  addProfessor: (professor: Omit<Professor, 'professorId'>) => void
  deleteProfessor: (professorId: string) => void
  
  // Class session actions
  addClassSession: (session: Omit<ClassSession, 'id'>) => void
  deleteClassSession: (id: string) => void
}

const initialClassrooms: Classroom[] = [
  { id: "S-212", name: "Classroom S-212", capacity: 50 },
  { id: "LAB-01", name: "Lab LAB-01", capacity: 30 },
  { id: "S-214", name: "Classroom S-214", capacity: 50 },
  { id: "LAB-03", name: "Lab LAB-03", capacity: 30 },
]

const initialProfessors: Professor[] = [
  { professorId: "PROF-001", name: "Dr. Khiat", email: "khiat@polytechnic.dz", department: "GSI", totalHoursPerWeek: 9 },
  { professorId: "PROF-002", name: "Dr. Belbachir", email: "belbachir@polytechnic.dz", department: "GSI", totalHoursPerWeek: 7 },
  { professorId: "PROF-003", name: "Dr. Mezzoudj", email: "mezzoudj@polytechnic.dz", department: "GSI", totalHoursPerWeek: 11 },
  { professorId: "PROF-004", name: "Dr. Kabli", email: "kabli@polytechnic.dz", department: "GSI", totalHoursPerWeek: 6 },
]

const initialSessions: ClassSession[] = [
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
    instructor: "Dr. Khiat",
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
    startTime: "08:15",
    endTime: "09:45",
    capacity: 40,
    currentOccupancy: 38,
    classLevel: "5ème",
  },
]

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      classrooms: initialClassrooms,
      professors: initialProfessors,
      classSessions: initialSessions,
      
      addClassroom: (classroom) => set((state) => ({
        classrooms: [...state.classrooms, { id: `R-${Date.now()}`, ...classroom }]
      })),
      
      deleteClassroom: (id) => set((state) => ({
        classrooms: state.classrooms.filter((c) => c.id !== id)
      })),
      
      addProfessor: (professor) => set((state) => ({
        professors: [...state.professors, { professorId: `PROF-${Date.now()}`, ...professor }]
      })),
      
      deleteProfessor: (professorId) => set((state) => ({
        professors: state.professors.filter((p) => p.professorId !== professorId)
      })),
      
      addClassSession: (session) => set((state) => ({
        classSessions: [...state.classSessions, { id: `class-${Date.now()}`, ...session }]
      })),
      
      deleteClassSession: (id) => set((state) => ({
        classSessions: state.classSessions.filter((c) => c.id !== id)
      })),
    }),
    {
      name: 'class-management-store',
    }
  )
)
