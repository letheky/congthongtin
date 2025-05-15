import type { WebsiteInfo } from "~/types/websiteInfo"

const useStore = defineStore('store', {
    state: () => ({
        websiteInfo: {},
        CurrentLang: 'vi'
    }),
    actions: {
        setWebsiteInfo(data: WebsiteInfo) {
            this.websiteInfo = data
        }
    },
    persist: {
        storage: sessionStorage
    }
})

export default useStore