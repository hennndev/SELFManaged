import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

type ColleagueStoreTypes = {
    colleagues: Array<ColleaguesDataTypes>
    addColleague: (colleague: ColleaguesDataTypes) => void
    editColleague: (colleagueId: ColleaguesDataTypes) => void
    deleteColleague: (colleagueId: string) => void
}


export const useColleagueStore = create<ColleagueStoreTypes>()(
    persist((set) => ({
        colleagues: [],
        addColleague: (colleague) => set((state) => ({colleagues: [...state.colleagues, colleague]})),
        editColleague: (colleagueUpdt) => set((state) => ({colleagues: state.colleagues.map(colleague => {
            if(colleague.id === colleagueUpdt.id) {
                return {
                    ...colleague,
                    ...colleagueUpdt
                }
            } else {
                return colleague
            }
        })})),
        deleteColleague: (colleagueId) => set((state) => ({colleagues: state.colleagues.filter(colleague => colleague.id !== colleagueId)}))
    }), {
        name: 'colleagues',
}))