<template>
  <section class="colorful">
    <h3>Colorful Bắc Ninh</h3>
    <div class="colorful-grid">
      <div
        v-for="(place, index) in places"
        :key="place.name"
        class="colorful-item"
        :class="{ large: index === 0, medium: index === 1 }"
      >
        <img class="item-thumbnail" :src="place.image" :alt="place.name" />
        <div class="user-comment">
          <div class="img-user">
            <img :src="place.user.avatar" :alt="place.user.name" />
          </div>
          <div class="comment">
            <h4>{{ place.user.name }}</h4>
            <p>{{ place.user.comment }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="view-all">
      <!-- <PrimaryButton text="Xem thêm" /> -->
    </div>
  </section>
</template>

<script setup>
// import PrimaryButton from "@/components/UI/PrimaryButton.vue";

const places = [
  {
    image: "/images/home/colorful-1.webp",
    url: "/van-mieu-bac-ninh",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment: "Mời anh về Bắc Ninh em chơi thăm",
    },
  },
  {
    image: "/images/home/colorful-2.webp",
    url: "/chua-phu-luu",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment: "Đến Bắc Ninh, đừng quên thưởng thức ẩm thực nơi này",
    },
  },
  {
    image: "/images/home/colorful-3.webp",
    url: "/den-tho-tien-si",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment:
        "Mời anh về Bắc Ninh em chơi thăm, lễ hội nô nức đông vui quanh năm...",
    },
  },
  {
    image: "/images/home/colorful-4.webp",
    url: "/dinh-phu-luu",
    user: {
      name: "Administrator",
      avatar: "/images/home/admin-avatar.jpg",
      comment: "Mời anh về với hội Lim",
    },
  },
];
</script>

<style lang="scss" scoped>
.colorful {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h3 {
    text-align: center;
    margin-bottom: 1rem;
    color: $primary-color;
    font-size: 2.9rem;
    font-weight: 600;
  }

  .colorful-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 250px);
    gap: 1rem;
  }

  .colorful-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.3s ease;

    &.large {
      grid-column: 1 / span 2;
      grid-row: 1 / span 2;
    }
    &.medium {
      grid-column: 3 / span 2;
    }

    &:hover {
      .item-thumbnail {
        transform: scale(1.2);
      }
    }

    .item-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .user-comment {
      position: absolute;
      inset: 0;
      display: flex;
      align-self: flex-end;
      align-items: center;
      padding: 1rem;
      gap: 1rem;
      height: fit-content;
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        object-fit: cover;
      }

      h4 {
        color: white;
        margin: 0;
        font-size: 1rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
      p {
        color: white;
        margin: 0;
        font-size: 0.9rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .view-all {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
}

@media (max-width: 1024px) {
  .colorful {
    .colorful-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(4, 250px);

      .colorful-item.large {
        grid-column: 1 / span 2;
        grid-row: 1 / span 2;
      }
      .colorful-item.medium {
        grid-column: 1 / span 2;
        grid-row: 3 / span 1;
      }
    }
  }
}

@media (max-width: 768px) {
  .colorful {
    .colorful-grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: repeat(5, 250px);

      .colorful-item {
        grid-column: 1 !important;

        &.large {
          grid-row: 1 / span 2;
        }
        &.medium {
          grid-row: 3;
        }
      }
    }
  }
}
</style>
