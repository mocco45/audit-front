import { defineStore } from "pinia"

export const useNavStore = defineStore('navStore',{
state: () => ({
    isOpen: true,
}),
actions: {
    toggle(){
        this.isOpen = !this.isOpen;
    }
}
});