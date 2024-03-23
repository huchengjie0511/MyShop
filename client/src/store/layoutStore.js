import { defineStore } from "pinia";

export const useLayoutStore = defineStore({
    state: () => ({
        myProperty: false,
        aiProperty:false,
        homeProperty:true,
        shopProperty:false,
        
    }),

}) 