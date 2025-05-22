<template>
  <ClientOnly>
    <div id="map" ref="mapContainer" />
  </ClientOnly>
  <Transition name="position-fade" mode="out-in">
    <TourModalDetailV1
      v-if="isTourOpen"
      :model-value="isTourOpen"
      :current-tour-id="currentOpenTourId"
      :close="handleCloseModal"
    />
  </Transition>
  <Transition name="position-fade" mode="out-in">
    <div
      v-if="Object.keys(currentTour).length > 0"
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full backdrop-blur-sm flex items-center justify-center"
    >
      <UIMapV1
        class="relative !w-[700px] !h-100 !backdrop-blur-sm"
        :target-location="currentTour"
      />
      <button
        class="absolute top-[calc(50%-200px)] right-[calc(50%-350px)] translate-x-10 bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded-md shadow-lg hover:bg-red-700 cursor-pointer transition duration-300"
        @click="handleCloseDirections"
      >
        <Icon name="close" class="w-5 h-5" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { QDHoangSa, QDTruongSa, dms2deg } from "vietnamisland";
const { getTranslation } = useTranslation();

const mapContainer = ref(null);
let map = null;
let L = null; // Store Leaflet reference globally in the component

const { locationList } = defineProps({
  locationList: {
    type: Object,
    required: true,
  },
});

//Khám phá 360
const { isOpen: isTourOpen, close: closeTour, open: openTour } = useModal();
const currentOpenTourId = ref("");

const openDetailTour = (tour) => {
  currentOpenTourId.value = tour.id;
  openTour();
};
const handleCloseModal = () => {
  currentOpenTourId.value = "";
  document.body.classList.remove("no-scroll");
  closeTour();
};
//Chỉ đường
const { close: closeDirections, open: openDirections } = useModal();
const currentTour = ref({});
const setCurrentTour = (tour) => {
  currentTour.value = tour;
};
const handleCloseDirections = () => {
  currentTour.value = {};
  closeDirections();
};

// Avoid SSR issues
onMounted(async () => {
  try {
    // Import Leaflet first
    const leafletModule = await import("leaflet");
    L = leafletModule.default || leafletModule;

    // Now initialize the map after both imports are complete
    initMap();
    addVietnamIslandLocationMarker();
    addTargetLocationMarker();
  } catch (error) {
    console.error("Error initializing map:", error);
  }

  function initMap() {
    map = L.map(mapContainer.value, {
      attributionControl: false,
    }).setView([locationList[0].lat, locationList[0].lng], 12);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/vmt47/ckpqdjwlb1r3x18qh1i6hprx6/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoidm10NDciLCJhIjoiY2twZ2NibmJzMDRyNDJybnY3bHVlemJpZSJ9.ZqYWBbera69i1fqOPmybBw",
      {
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 3,
        maxZoom: 20,
      }
    ).addTo(map);
    const HSLabel = L.divIcon({
      html: "QĐ. Hoàng Sa",
      className: "text-nowrap",
    });
    L.marker([16.604171, 111.820813], { icon: HSLabel }).addTo(map);

    const TSLabel = L.divIcon({
      html: "QĐ. Trường Sa",
      className: "text-nowrap",
    });
    L.marker([9.565994, 113.119031], { icon: TSLabel }).addTo(map);
  }

  // My location marker
  function addVietnamIslandLocationMarker() {
    QDHoangSa.forEach(function (item) {
      const lat = dms2deg(item.lat);
      const lng = dms2deg(item.lng);
      const contentPopup =
        '<h4 style="font-family: inherit;">' +
        item.name +
        "</h4>" +
        "<b>Quần đảo Hoàng Sa, Việt Nam</b>" +
        "<p>" +
        item.desc +
        "</p>";

      L.circle([lat, lng], {
        color: "#fff",
        fillColor: "#f00",
        fillOpacity: 1.0,
        radius: 300,
      })
        .addTo(map)
        .bindPopup(contentPopup);
    });

    QDTruongSa.forEach(function (item) {
      const lat = dms2deg(item.lat);
      const lng = dms2deg(item.lng);
      const contentPopup =
        '<h4 style="font-family: inherit;">' +
        item.name +
        "</h4>" +
        "<b>Quần đảo Trường Sa, Việt Nam</b>" +
        "<p>" +
        item.desc +
        "</p>";

      L.circle([lat, lng], {
        color: "#fff",
        fillColor: "#f00",
        fillOpacity: 1.0,
        radius: 300,
      })
        .addTo(map)
        .bindPopup(contentPopup);
    });
  }

  function addTargetLocationMarker() {
    locationList.forEach((targetLocation) => {
      if (targetLocation && targetLocation.lat && targetLocation.lng) {
        let targetIcon;

        if (targetLocation.thumbnail) {
          // Custom icon using the provided thumbnail
          targetIcon = L.divIcon({
            html: `<img src="${targetLocation.thumbnail}" style="width: 30px; height: 30px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);">`,
            className: "target-location-marker",
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -17],
          });
        } else {
          // Default target icon
          targetIcon = L.divIcon({
            html: `<div style="background-color: #DB4437; border: 2px solid white; border-radius: 50%; width: 16px; height: 16px; box-shadow: 0 0 5px rgba(0,0,0,0.3);"></div>`,
            className: "target-location-marker",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });
        }

        // Create marker and add to map
        const targetMarker = L.marker(
          [targetLocation.lat, targetLocation.lng],
          {
            icon: targetIcon,
          }
        ).addTo(map);

        // Add popup with target location info if available
        if (getTranslation(targetLocation, "name")) {
          const popupContent = `
            <div style="
                    position: relative;
                    width: 100%;
                    height: 260px;
                   
                  ">
                  <img src=${
                    targetLocation.thumbnail
                  } class="w-full  h-full object-cover" style="mask-image: linear-gradient(rgb(0 0 0 / 100%), transparent)"/>
              <h4 class=" absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-white pt-10 text-center uppercase text-2xl text-shadow-lg text-nowrap">
                ${getTranslation(targetLocation, "name")}
              </h4>
              <div class="absolute top-7/12 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center gap-4 text-white text-shadow-lg">
                <button class="dash-btn" data-action="open-tour" data-tour-id="${
                  targetLocation.id
                }">
                  Khám phá 360
                </button>
                <button class="dash-btn" data-action="set-current-tour">
                  Chỉ đường
                </button>
            </div>
          `;
          targetMarker.bindPopup(popupContent);
          // Add event listener for when the popup opens
          targetMarker.on("popupopen", function (e) {
            const popup = e.popup;
            const tourButton = popup
              .getElement()
              .querySelector('[data-action="open-tour"]');
            const directionsButton = popup
              .getElement()
              .querySelector('[data-action="set-current-tour"]');

            if (tourButton) {
              tourButton.addEventListener("click", () => {
                openDetailTour(targetLocation); // Pass the whole object if openDetailTour needs it
              });
            }

            if (directionsButton) {
              directionsButton.addEventListener("click", () => {
                openDirections();
                setCurrentTour(targetLocation);
              });
            }
          });
        }

        // Add click event to pan and zoom to the marker
        targetMarker.on("click", function () {
          map.setView([targetLocation.lat + 0.002, targetLocation.lng], 15); // Adjust zoom level (15) as needed
        });
      }
    });
  }
});
</script>

<style lang="scss" scoped>
#map {
  height: 100%;
  min-height: 70dvh;
  width: 100%;
  z-index: 1;
}

:deep(.leaflet-popup-content) {
  width: 400px !important;
  background-color: #4a576d;
}
</style>
