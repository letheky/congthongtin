<template>
  <section class="utilities w-full">
    <h3 class="text-4xl font-bold text-center text-slate-700 mb-10">
      {{ t("utilities.title") }}
    </h3>
    <div class="utilities-grid gap-2">
      <div
        v-for="utility in utilities"
        :key="utility.name"
        class="utility-item"
      >
        <div :class="['icon-circle', utility.class]">
          <div class="pulse-ring"></div>
          <Icon :name="utility.icon" class="utility-icon" />
        </div>
        <span>{{ t(`utilities.${utility.icon}`) }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
const { t } = useI18n();

const utilities = [
  {
    icon: "gas",
    class: "gas",
    bgColor: "#ffd8cc",
    iconColor: "#ff6b35",
  },
  {
    icon: "taxi",
    class: "taxi",
    bgColor: "#fff2cc",
    iconColor: "#ffc107",
  },
  {
    icon: "bus",
    class: "bus",
    bgColor: "#d1e7ff",
    iconColor: "#0d6efd",
  },
  {
    icon: "atm",
    class: "atm",
    bgColor: "#d4f4d7",
    iconColor: "#198754",
  },
  {
    icon: "market",
    class: "market",
    bgColor: "#f5d6c6",
    iconColor: "#d4622e",
  },
  {
    icon: "shop",
    class: "shop",
    bgColor: "#d7f5f5",
    iconColor: "#20c997",
  },
  {
    icon: "pharmacy",
    class: "pharmacy",
    bgColor: "#ffd6e5",
    iconColor: "#e83e8c",
  },
  {
    icon: "carRental",
    class: "car-rental",
    bgColor: "#DFECFC",
    iconColor: "#3A569D",
  },
  {
    icon: "hotline",
    class: "hotline",
    bgColor: "#e5d8ff",
    iconColor: "#8540f5",
  },
];
</script>

<style lang="scss" scoped>
.utilities {
  max-width: 100vw;
  padding: 4rem 8rem;
  background-color: #f8f9fa;

  h3 {
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 600;
  }

  .utilities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr));
    // max-width: 1200px;
    margin: 0 auto;
  }

  .utility-item {
    @include flex-center-vertical;
    gap: 0.75rem;

    span {
      font-size: 0.9rem;
      color: #333;
    }

    .icon-circle {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
      position: relative;
      overflow: visible;

      .pulse-ring {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        animation: none;
        border: 2px solid transparent;
        transition: border-color 0.3s ease;
      }

      &:hover {
        transform: scale(1.1);
        cursor: pointer;

        .pulse-ring {
          animation: pulse 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      }

      .utility-icon {
        width: 1.75rem;
        height: 1.75rem;
        stroke-width: 1.5;
        color: #fff;
        position: relative;
        z-index: 1;
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
          opacity: 1;
          border-color: currentColor;
        }
        100% {
          transform: scale(2);
          opacity: 0;
          border-color: currentColor;
        }
      }

      &.gas {
        background-color: v-bind("utilities[0].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[0].iconColor");
        }
      }

      &.taxi {
        background-color: v-bind("utilities[1].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[1].iconColor");
        }
      }

      &.bus {
        background-color: v-bind("utilities[2].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[2].iconColor");
        }
      }

      &.atm {
        background-color: v-bind("utilities[3].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[3].iconColor");
        }
      }

      &.market {
        background-color: v-bind("utilities[4].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[4].iconColor");
        }
      }

      &.shop {
        background-color: v-bind("utilities[5].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[5].iconColor");
        }
      }

      &.pharmacy {
        background-color: v-bind("utilities[6].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[6].iconColor");
        }
      }

      &.car-rental {
        background-color: v-bind("utilities[7].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[7].iconColor");
        }
      }

      &.hotline {
        background-color: v-bind("utilities[8].bgColor");
        .utility-icon,
        .pulse-ring {
          color: v-bind("utilities[8].iconColor");
        }
      }
    }
  }
}
</style>
