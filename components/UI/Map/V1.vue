<template>
  <ClientOnly>
    <div id="map" ref="mapContainer" />
  </ClientOnly>
</template>

<script setup>
import { QDHoangSa, QDTruongSa, dms2deg } from "vietnamisland";

const mapContainer = ref(null);
let map = null;
let myLocation;
let routingControl;
let L = null; // Store Leaflet reference globally in the component

const { targetLocation } = defineProps({
  targetLocation: {
    type: Object,
    required: true,
  },
});

// Avoid SSR issues
onMounted(async () => {
  try {
    // Import Leaflet first
    const leafletModule = await import("leaflet");
    L = leafletModule.default || leafletModule;

    // Import and properly handle routing machine
    await import("leaflet-routing-machine");

    // Make sure we have L.Routing available

    if (!L.Routing) {
      // If L.Routing is not available, wait a bit and try adding it manually
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Checking Routing plugin again:", !!L.Routing);
    }

    // Now initialize the map after both imports are complete
    initMap();
    addVietnamIslandLocationMarker();
    addTargetLocationMarker();
    addMyLocationMarker();
  } catch (error) {
    console.error("Error initializing map:", error);
  }

  function initMap() {
    map = L.map(mapContainer.value, {
      attributionControl: false,
    }).setView([21.003338848107077, 105.82029788357946], 9);
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

  function addMyLocationMarker() {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      // First, check the permission status if the Permissions API is available
      if (navigator.permissions && navigator.permissions.query) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((permissionStatus) => {
            console.log(
              "Geolocation permission status:",
              permissionStatus.state
            );

            // Always request location regardless of current permission state
            requestGeolocation();

            // Set up a listener for permission changes
            permissionStatus.onchange = () => {
              console.log("Permission changed to:", permissionStatus.state);
              if (permissionStatus.state === "granted") {
                requestGeolocation();
              }
            };
          })
          .catch((error) => {
            console.error("Error checking permission:", error);
            // Fallback to direct request if permissions API fails
            requestGeolocation();
          });
      } else {
        // Permissions API not available, request directly
        requestGeolocation();
      }
    } else {
      console.error("Geolocation is not supported by this browser");
      // Show a message to the user that geolocation is not supported
      const geoNotSupportedMsg = L.control({ position: "bottomleft" });
      geoNotSupportedMsg.onAdd = function () {
        const div = L.DomUtil.create("div", "geo-error-msg");
        div.innerHTML =
          '<div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin: 10px;">Location services not supported by your browser</div>';
        return div;
      };
      geoNotSupportedMsg.addTo(map);
    }

    // Function to handle the actual geolocation request
    function requestGeolocation() {
      // Show a loading indicator
      const loadingIndicator = L.control({ position: "bottomleft" });
      loadingIndicator.onAdd = function () {
        const div = L.DomUtil.create("div", "geo-loading");
        div.innerHTML = `
        <div class="text-center flex items-center gap-2" style="background: #e9ecef; padding: 10px; border-radius: 4px; margin: 10px;">
            <div role="status">
                <svg aria-hidden="true" class="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <span>Loading...</span>
        </div>
        `;
        return div;
      };
      const loadingControl = loadingIndicator.addTo(map);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Remove loading indicator
          if (loadingControl) {
            map.removeControl(loadingControl);
          }

          const { latitude, longitude } = position.coords;

          // Create a custom icon for current location
          const locationIcon = L.divIcon({
            html: `<div style="background-color: #4285F4; border: 2px solid white; border-radius: 50%; width: 16px; height: 16px; box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.3), 0 0 5px rgba(66, 133, 244, 0.5);"></div>`,
            className: "current-location-marker",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          });

          // Remove existing marker if any
          if (myLocation) {
            map.removeLayer(myLocation);
          }

          // Add marker to map
          myLocation = L.marker([latitude, longitude], {
            icon: locationIcon,
            zIndexOffset: 1000,
          }).addTo(map);

          // Now we can safely create the route
          if (targetLocation && targetLocation.lat && targetLocation.lng) {
            createRoute(
              [latitude, longitude],
              [targetLocation.lat, targetLocation.lng]
            );
          }

          // Add accuracy circle
          L.circle([latitude, longitude], {
            radius: position.coords.accuracy,
            fillColor: "#4285F4",
            fillOpacity: 0.15,
            stroke: false,
          }).addTo(map);

          // Center map on user's location
          map.setView([latitude, longitude], 9);
        },
        (error) => {
          // Remove loading indicator
          if (loadingControl) {
            map.removeControl(loadingControl);
          }

          console.error("Error getting location:", error);

          // Show appropriate error message based on error code
          let errorMessage = "Could not get your location";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Location access was denied. Please enable location services to use this feature.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "Location information is unavailable at this time.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out. Please try again.";
              break;
            default:
              errorMessage =
                "An unknown error occurred while requesting location.";
          }

          // Display error message on the map
          const errorControl = L.control({ position: "bottomleft" });
          errorControl.onAdd = function () {
            const div = L.DomUtil.create("div", "geo-error-msg");
            div.innerHTML = `<div style="background: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px; margin: 10px;">
              ${errorMessage}
              <button id="retry-location" style="display: block; margin-top: 5px; padding: 5px 10px; background: #721c24; color: white; border: none; border-radius: 4px; cursor: pointer;">
                Try Again
              </button>
            </div>`;

            // Need to wait for the control to be added to DOM before attaching event
            setTimeout(() => {
              document
                .getElementById("retry-location")
                ?.addEventListener("click", function () {
                  map.removeControl(errorControl);
                  requestGeolocation();
                });
            }, 100);

            return div;
          };
          errorControl.addTo(map);

          // If we can't get user location but have target location, show just the target
          if (targetLocation && targetLocation.lat && targetLocation.lng) {
            map.setView([targetLocation.lat, targetLocation.lng], 9);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 second timeout
          maximumAge: 0, // Don't use cached position
        }
      );
    }
  }

  function addTargetLocationMarker() {
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
      const targetMarker = L.marker([targetLocation.lat, targetLocation.lng], {
        icon: targetIcon,
      }).addTo(map);

      // Add popup with target location info if available
      if (targetLocation.name) {
        const popupContent = `
          <div style="text-align: center;">
            <h4 style="margin: 0; font-weight: bold;">${
              targetLocation.name
            }</h4>
            ${
              targetLocation.address
                ? `<p style="margin: 5px 0 0;">${targetLocation.address}</p>`
                : ""
            }
          </div>
        `;
        targetMarker.bindPopup(popupContent).openPopup();
      }
    }
  }

  function createRoute(startPoint, endPoint) {
    try {
      // Ensure Leaflet and Leaflet Routing Machine are loaded
      if (!L) {
        console.error("Leaflet not loaded yet");
        return;
      }

      if (!L.Routing) {
        console.error("Leaflet Routing not loaded yet");

        // Try to load routing plugin again if it failed initially
        setTimeout(async () => {
          try {
            await import("leaflet-routing-machine");
            if (L.Routing) {
              createRoute(startPoint, endPoint); // Retry route creation
            }
          } catch (err) {
            console.error("Failed to load routing plugin on retry:", err);
          }
        }, 1000);
        return;
      }

      // Remove existing routing control if any
      if (routingControl) {
        map.removeControl(routingControl);
      }

      // Create new routing control
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(startPoint[0], startPoint[1]),
          L.latLng(endPoint[0], endPoint[1]),
        ],
        routeWhileDragging: false,
        showAlternatives: false,
        fitSelectedRoutes: false,
        lineOptions: {
          styles: [{ color: "#E8000B", opacity: 0.8, weight: 5 }],
        },
        createMarker: function () {
          return null;
        }, // Don't create default markers
        collapsible: true, // Make the itinerary collapsible
      }).addTo(map);

      // Fit bounds to include both points with padding
      const bounds = L.latLngBounds(startPoint, endPoint);
      map.fitBounds(bounds, { padding: [52, 52] });
    } catch (error) {
      console.error("Error creating route:", error);
    }
  }
});
</script>

<style lang="scss" scoped>
#map {
  height: 400px;
  width: 100%;
}
/* Hide some unwanted elements from leaflet routing machine */
:deep(.leaflet-routing-container) {
  max-width: 320px;
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Open Sans", sans-serif;
  @media screen and (max-width: 767px) {
    display: none;
  }
}

:deep(.leaflet-routing-alt) {
  max-height: 150px;
  overflow-y: auto;
  table {
    display: none;
  }
}
:deep(.leaflet-routing-alt:not(:first-of-type)) {
  display: none;
}

/* Make instruction text more readable */
:deep(.leaflet-routing-alt h2) {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 5px 0;
}

:deep(.leaflet-routing-alt h3) {
  font-size: 13px;
  margin: 5px 0;
}
</style>
