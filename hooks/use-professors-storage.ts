import { ProfessorSchedule } from "@/lib/real-time-data"
import { useLocalStorage } from "./use-local-storage"

export function useProfessorsStorage(initialProfessors: ProfessorSchedule[]) {
  const [professors, setProfessors, isLoaded] = useLocalStorage<ProfessorSchedule[]>(
    "professors",
    initialProfessors,
  )

  const addProfessor = (professor: Omit<ProfessorSchedule, "schedule" | "professorId">) => {
    const newProfessor: ProfessorSchedule = {
      ...professor,
      professorId: `PROF-${Date.now()}`,
      schedule: [],
    }
    setProfessors([...professors, newProfessor])
  }

  const updateProfessor = (professorId: string, updates: Partial<ProfessorSchedule>) => {
    setProfessors(professors.map((p) => (p.professorId === professorId ? { ...p, ...updates } : p)))
  }

  const deleteProfessor = (professorId: string) => {
    setProfessors(professors.filter((p) => p.professorId !== professorId))
  }

  return { professors, addProfessor, updateProfessor, deleteProfessor, isLoaded }
}
