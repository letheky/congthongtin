import type { WebsiteInfo } from "~/types/websiteInfo"; // Make sure this path is correct

const useStore = defineStore('store', {
    state: () => ({
        websiteInfo: {} as WebsiteInfo, // Initialize with an empty WebsiteInfo object
        provinceList: [],
        districtList: [],
        countryList: [],
        wardList: [],
        textLabelList: [],
        CurrentLang: 'vi'
    }),
    actions: {
        setWebsiteInfo(data: WebsiteInfo) {
            this.websiteInfo = data;
        },
    },
    persist: {
        storage: piniaPluginPersistedstate.sessionStorage()
    },
});

export default useStore;