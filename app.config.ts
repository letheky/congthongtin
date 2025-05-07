// app.config.ts
export default defineAppConfig({
  icon: {
    size: "24px", // default <Icon> size applied
    class: "nuxt-icon", // default <Icon> class applied
    mode: "css", // default <Icon> mode applied
    aliases: {
      //menu header icon
      group: "material-symbols:groups",
      locations: "solar:point-on-map-linear",
      contact:
        "streamline:interface-help-customer-support-1-customer-headset-help-microphone-phone-support",
      user: "material-symbols:person",
      handbag: "ph:handbag",
      search: "material-symbols:search-rounded",
      phone: "ic:baseline-phone",
      pin: "material-symbols:location-on-outline",

      //overlay footer for mobile
      menu: "material-symbols:lists-rounded",
      menu2: "material-symbols:menu",
      chevronRight: "mdi:chevron-right",
      chevronLeft: "mdi:chevron-left",
      chevronDown: "mdi:chevron-down",
      chevronUp: "mdi:chevron-up",
      arrowUp: "material-symbols:arrow-drop-up",
      arrowDown: "material-symbols:arrow-drop-down",
      back: "ic:baseline-keyboard-backspace",
      forward: "material-symbols:arrow-forward",
      close: "material-symbols:close",
      closeCircle: "material-symbols:cancel-outline",
      building: "mdi:office-building-outline",
      eat: "material-symbols:fork-spoon",
      landmark: "lucide:landmark",
      handbook: "hugeicons:books-01",
      gas: "material-symbols:local-gas-station",
      taxi: "material-symbols:taxi-alert",
      bus: "material-symbols:bus-alert",
      atm: "map:atm",
      market: "material-symbols:shopping-bag",
      supermarket: "material-symbols:shopping-cart",
      pharmacy: "material-symbols:local-pharmacy",
      carRental: "material-symbols:car-rental",
      hotline: "solar:phone-calling-linear",
      calendar: "material-symbols:calendar-month",


      //product detail
      multiImg: "fa6-regular:images",
      checked: "lets-icons:done-ring-round-fill",
      mail: "ic:baseline-mail-outline",
    },
    cssLayer: 'base' // set the css layer to inject to
  },
});