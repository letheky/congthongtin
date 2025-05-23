// app.config.ts
export default defineAppConfig({
  icon: {
    size: "24px", // default <Icon> size applied
    class: "nuxt-icon flex-none", // default <Icon> class applied
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
      pin: "material-symbols:location-on-outline",
      mapicon: 'material-symbols:map-outline',
      home: "material-symbols:home-outline",

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
      taxi: "material-symbols:directions-car",
      bus: "material-symbols:directions-bus",
      atm: "map:atm",
      market: "material-symbols:shopping-bag",
      shop: "material-symbols:shopping-cart",
      pharmacy: "material-symbols:local-pharmacy",
      carRental: "material-symbols:car-rental",
      hotline: "ic:baseline-phone",
      calendar: "material-symbols:calendar-month",


      //product detail
      multiImg: "fa6-regular:images",
      checked: "lets-icons:done-ring-round-fill",
      mail: "ic:baseline-mail-outline",

      //contact page
      contactMail: "majesticons:mail-open-line",
      contactPhone: "material-symbols:phone-in-talk-watchface-indicator",
      contactMap: "fa6-solid:map-location-dot",

      //about page
      comments: "uil:comments",
      view: "ic:baseline-remove-red-eye",
      like: "material-symbols:favorite",

      //share group
      facebook: "line-md:facebook",
      twitter: "mdi:twitter",
      telegram: "mdi:telegram",
      linkedin: "line-md:linkedin",
      pinterst: "bx:bxl-pinterest-alt",

      //utilities
      check: 'mdi:check',
      website: 'mdi:web',

      //tour menu
      house: "material-symbols:house",
      info: "maki:information-11",
      image: "material-symbols:imagesmode-outline",
      grid: 'lucide:layout-grid'



    },
    cssLayer: 'base' // set the css layer to inject to
  },
  ui: {
    pagination: {
      slots: {
        root: '',
        list: 'flex items-center justify-center gap-1',
        ellipsis: 'pointer-events-none !py-1 !px-1',
        label: 'min-w-5 text-center',
        first: 'cursor-pointer hidden',
        prev: 'cursor-pointer',
        item: 'cursor-pointer !py-1 !px-2 rounded-md hover:bg-red-400 hover:text-white transition-colors duration-300',
        next: 'cursor-pointer ',
        last: 'cursor-pointer hidden'
      }
    },
    modal: {
      slots: {
        overlay: 'fixed inset-0 bg-elevated/75',
        content: 'fixed bg-white text-slate-700 divide-y divide-default flex flex-col focus:outline-none',
        header: 'flex items-center gap-1.5 p-4 sm:px-6 min-h-16',
        wrapper: '',
        body: 'flex-1  p-4 sm:p-6 font-semibold',
        footer: 'flex items-center gap-1.5 p-4 sm:px-6',
        title: 'text-2xl text-slate-700 font-bold mr-8',
        description: 'mt-1 text-muted text-sm',
        close: 'absolute top-4 end-4'
      },
      variants: {
        transition: {
          true: {
            overlay: 'data-[state=open]:animate-[fade-in_200ms_ease-out] data-[state=closed]:animate-[fade-out_200ms_ease-in]',
            content: 'data-[state=open]:animate-[scale-in_200ms_ease-out] data-[state=closed]:animate-[scale-out_200ms_ease-in]'
          }
        },
        fullscreen: {
          true: {
            content: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-w-7xl w-sm sm:w-lg md:w-3xl xl:w-4xl min-h-48 max-h-none md:max-h-fit overflow-y-auto'
          },
          false: {
            content: 'w-[calc(100vw-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)]'
          }
        }
      }
    }
    ,
    carousel: {
      slots: {
        root: 'relative focus:outline-none',
        viewport: 'overflow-hidden',
        container: 'flex items-start',
        item: 'min-w-0 shrink-0 basis-full',
        controls: '',
        arrows: '',
        prev: 'absolute rounded-full',
        next: 'absolute rounded-full',
        dots: 'absolute inset-x-0 bottom-4 flex flex-wrap items-center justify-center gap-3',
        dot: [
          'cursor-pointer size-3 bg-accented rounded-full',
          'transition'
        ]
      },
      variants: {
        orientation: {
          vertical: {
            container: 'flex-col -mt-4',
            item: 'pt-4',
            prev: 'top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90',
            next: 'bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90'
          },
          horizontal: {
            container: 'flex-row -ms-4',
            item: 'ps-4',
            prev: 'start-4 sm:-start-12 top-1/2 -translate-y-1/2',
            next: 'end-4 sm:-end-12 top-1/2 -translate-y-1/2'
          }
        },
        active: {
          true: {
            dot: 'bg-inverted'
          }
        }
      }
    }
  }
});