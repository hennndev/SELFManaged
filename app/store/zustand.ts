import { create } from "zustand"

type LayoutTypes = {
    showModalProfile: boolean //in primary layout
    handleShowModalProfile: (value: boolean) => void //in primary layout
}

export const useLayoutStore = create<LayoutTypes>((set) => ({
    showModalProfile: false, //in primary layout
    handleShowModalProfile: (value: boolean) => set(() => ({showModalProfile: value})) //in primary layout
}))