import { ClassroomStatus, ClassSession } from "@/lib/real-time-data"
import { useLocalStorage } from "./use-local-storage"

export function useClassroomsStorage(initialClassrooms: ClassroomStatus[]) {
  const [classrooms, setClassrooms, isLoaded] = useLocalStorage<ClassroomStatus[]>(
    "classrooms",
    initialClassrooms,
  )

  const addClassroom = (classroom: Omit<ClassroomStatus, "weekSchedule">) => {
    const newClassroom: ClassroomStatus = {
      ...classroom,
      weekSchedule: [],
    }
    setClassrooms([...classrooms, newClassroom])
  }

  const updateClassroom = (id: string, updates: Partial<ClassroomStatus>) => {
    setClassrooms(classrooms.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }

  const deleteClassroom = (id: string) => {
    setClassrooms(classrooms.filter((c) => c.id !== id))
  }

  return { classrooms, addClassroom, updateClassroom, deleteClassroom, isLoaded }
}
