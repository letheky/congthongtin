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
      menu2: "material-symbols-light:menu",
      chevronRight: "tabler:chevron-right",
      chevronLeft: "tabler:chevron-left",
      chevronDown: "tabler:chevron-down",
      chevronUp: "tabler:chevron-up",
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


      //product detail
      multiImg: "fa6-regular:images",
      checked: "lets-icons:done-ring-round-fill",

      //admin page
      dashboard: "ic:outline-dashboard",
      typography: "tabler:typography",
      shadow: "fluent:square-shadow-20-regular",
      register: "lucide:user-plus",
      login: "octicon:sign-in",
      sample: "ph:aperture",
      avatar: "carbon:user-avatar-filled",
      task: "fluent:task-list-20-filled",
      mail: "ic:baseline-mail-outline",
      circle: "mdi:circle-outline",
      currency: "mdi:currency-usd",
      increase: "solar:arrow-left-up-outline",
      decrease: "solar:arrow-right-down-outline",

      //admin product
      products: 'eos-icons:products-outlined',
      edit: 'material-symbols:edit-square-outline',
      delete: 'ic:baseline-delete-outline'
    },
    cssLayer: 'base' // set the css layer to inject to
  },
});