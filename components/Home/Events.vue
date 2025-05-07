<template>
  <section class="events">
    <h3>Sự kiện</h3>
    <div class="events-container">
      <swiper
        :modules="[Navigation, Autoplay]"
        :slides-per-view="1"
        :space-between="20"
        :navigation="true"
        :pagination="{ clickable: true }"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
        }"
        :loop="true"
        class="events-swiper"
      >
        <swiper-slide
          v-for="event in events"
          :key="event.id"
          class="event-slide"
        >
          <div class="event-item">
            <div class="event-content">
              <h4>{{ event.title }}</h4>

              <hr />
              <div class="event-location d-flex align-items-center gap-2 mb-2">
                <Icon name="map" class="location-icon" />
                <p class="mb-0 fs-6">Bắc Ninh</p>
              </div>
              <div class="event-date">
                <Icon name="calendar" class="calendar-icon" />
                {{ event.date }}
              </div>
            </div>
            <div class="event-image">
              <img :src="event.image" :alt="event.title" />
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div class="view-all">
      <!-- <SecondaryButton text="Xem tất cả" /> -->
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";
// import SecondaryButton from "@/components/UI/SecondaryButton.vue";

const events = [
  {
    id: 1,
    date: "03/03/2025 - 03/03/2025",
    title: "Hội thi Dân ca Quan họ Xuân Ất Tỵ 2025",
    image: "/image/home/event-1.webp",
  },
  {
    id: 2,
    date: "02/03/2025 - 02/03/2025",
    title: "Khai mạc Hội thi hát đối đáp Dân ca Quan họ Bắc Ninh",
    image: "/image/home/event-2.webp",
  },
  {
    id: 3,
    date: "01/03/2025 - 01/03/2025",
    title: "Lễ hội Đền Đô Bắc Ninh",
    image: "/image/home/event-3.webp",
  },
  {
    id: 4,
    date: "28/02/2025 - 28/02/2025",
    title: "Festival Quan họ - Kinh Bắc 2025",
    image: "/image/home/event-4.webp",
  },
];
</script>

<style lang="scss" scoped>
.events {
  padding: 4rem 2rem;
  background-color: #f8f9fa;

  h3 {
    text-align: center;
    margin-bottom: 3rem;
    color: $secondary-color;
    font-size: 2.9rem;
    font-weight: 600;
  }

  .events-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    padding: 0 40px;
  }

  :deep(.swiper) {
    padding: 10px 0 40px;
  }

  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    position: absolute;
    color: #000;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid #e5e5e5;
    background: #fff;
    top: auto;
    bottom: 3.5rem;
    margin: 0;

    &:after {
      font-size: 0.8rem;
      font-weight: bold;
    }

    &:hover {
      background: $secondary-color;
      color: #fff;
    }

    &.swiper-button-disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }

  :deep(.swiper-button-prev) {
    left: calc(50% - 3rem);
  }

  :deep(.swiper-button-next) {
    left: 50%;
  }

  .event-item {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    overflow: hidden;
    height: 35vh;
    display: flex;
    flex-direction: row;

    .event-content {
      padding: 2rem;
      width: 55%;
      display: flex;
      flex-direction: column;
      min-width: 0; /* Prevents text overflow issues */
      position: relative;

      .event-date {
        color: $primary-color;
        font-weight: 500;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.95rem;

        .calendar-icon {
          width: 18px;
          height: 18px;
        }
      }

      hr {
        margin: 1rem 0;
        opacity: 0.1;
      }

      .event-location {
        color: #666;
        margin-bottom: 1rem;

        .location-icon {
          width: 18px;
          height: 18px;
        }

        p {
          color: #666;
        }
      }

      h4 {
        margin: 0;
        color: $secondary-color;
        font-size: 1.4rem;
        line-height: 1.5;
        font-weight: 600;
      }
    }

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);

      .event-image img {
        transform: scale(1.1);
      }
    }

    .event-image {
      width: 45%;
      min-width: 300px;
      height: auto;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
  }

  .view-all {
    display: flex;
    justify-content: center;
    margin-top: 3rem;
  }
}

@media (max-width: 768px) {
  .events {
    padding: 3rem 1rem;

    h3 {
      font-size: 2.4rem;
      margin-bottom: 2rem;
    }

    .events-container {
      padding: 0 20px;
    }

    .event-item {
      flex-direction: column-reverse;

      .event-image {
        width: 100%;
        min-width: 100%;
        height: 200px;
      }

      .event-content {
        padding: 1.5rem;

        h4 {
          font-size: 1.2rem;
        }
      }
    }
  }
}
</style>
