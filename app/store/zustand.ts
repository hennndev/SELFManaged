import { create } from "zustand"

type LayoutTypes = {
    showModalEditProfile: boolean
    handleShowmModalEditProfile: (value: boolean) => void
}

export const useLayoutStore = create<LayoutTypes>((set) => ({
    showModalEditProfile: false,
    handleShowmModalEditProfile: (value: boolean) => set(() => ({showModalEditProfile: value}))
}))