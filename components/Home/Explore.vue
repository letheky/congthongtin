<template>
  <section class="explore">
    <h3>Khám phá Bắc Ninh</h3>
    <p>Hãy cùng khám phá những điều ấn tượng - quan trọng tại Bắc Ninh!</p>
    <div class="explore-grid">
      <div
        v-for="(place, index) in places"
        :key="place.name"
        class="explore-item"
        :class="{ large: index === 0 }"
      >
        <img :src="place.image" :alt="place.name" />
        <div class="overlay">
          <div class="view-360">
            <img src="/images/360-icon.png" alt="360° view" class="icon-360" />
          </div>
          <h4>{{ place.name }}</h4>
        </div>
      </div>
    </div>

    <div class="view-all">
      <!-- <SecondaryButton text="Xem tất cả" /> -->
    </div>

    <section class="explore-full">
      <div class="explore-full-grid">
        <div
          v-for="(place, index) in fullPlaces"
          :key="place.name"
          class="explore-item"
        >
          <img :src="place.image" :alt="place.name" />
          <div class="overlay">
            <h4>{{ place.name }}</h4>
          </div>
        </div>
        <div class="center-item">
          <div class="center-content">
            <h2>Bắc Ninh</h2>
            <p class="typing-text">{{ currentText }}</p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup>
// import SecondaryButton from '@/components/UI/SecondaryButton.vue';
import { ref, onMounted } from 'vue';

const places = [
  {
    name: "Văn Miếu Bắc Ninh",
    image: "/images/home/discovery-1.webp",
    url: "/van-mieu-bac-ninh",
  },
  {
    name: "Chùa Phù Lưu",
    image: "/images/home/discovery-2.webp",
    url: "/chua-phu-luu",
  },
  {
    name: "Đền thờ tiến sĩ Lê Văn Thịnh",
    image: "/images/home/discovery-3.webp",
    url: "/den-tho-tien-si",
  },
  {
    name: "Đình Phù Lưu",
    image: "/images/home/discovery-4.webp",
    url: "/dinh-phu-luu",
  },
  {
    name: "Chùa Phí Tướng",
    image: "/images/home/discovery-5.webp",
    url: "/chua-phi-tuong",
  },
];

const fullPlaces = [
  {
    name: "Chùa Bút Tháp - Kiệt tác của lịch sử",
    image: "/images/home/explore-1.webp",
    url: "/chua-but-thap",
  },
  {
    name: "Chùa Dâu – ngôi chùa cổ nhất Việt Nam",
    image: "/images/home/explore-2.webp",
    url: "/chua-dau",
  },
  {
    name: "Di tích lịch sử Khu lăng mộ và đền thờ các vị Vua triều Lý",
    image: "/images/home/explore-3.webp",
    url: "/lang-mo-den-tho-vua-ly",
  },
  {
    name: "Di tích lịch sử và kiến trúc nghệ thuật chùa Phật Tích",
    image: "/images/home/explore-4.webp",
    url: "/chua-phat-tich",
  },
  {
    name: "Di tích lịch sử, kiến trúc nghệ thuật đình Đình Bảng",
    image: "/images/home/explore-5.webp",
    url: "/dinh-dinh-bang",
  },
  {
    name: "Cụm di tích lịch sử, cách mạng Đình, Đền, Chùa Đồng Kỵ",
    image: "/images/home/explore-6.webp",
    url: "/cum-di-tich-dong-ky",
  },
  {
    name: "Cụm di tích Lăng và Đền thờ Cao Lỗ Vương",
    image: "/images/home/explore-7.webp",
    url: "/lang-den-cao-lo-vuong",
  },
  {
    name: "Thành cổ Luy Lâu",
    image: "/images/home/explore-8.webp",
    url: "/thanh-co-luy-lau",
  },
];

const texts = ['Đến...', 'Trải nghiệm...', 'Và yêu'];
const currentText = ref('');
const currentIndex = ref(0);
const isDeleting = ref(false);
const typingSpeed = 150;
const deletingSpeed = 75;
const delayBetweenTexts = 2000;

const typeText = () => {
  const current = currentIndex.value;
  const text = texts[current];
  
  if (isDeleting.value) {
    currentText.value = text.substring(0, currentText.value.length - 1);
  } else {
    currentText.value = text.substring(0, currentText.value.length + 1);
  }

  let typeSpeed = isDeleting.value ? deletingSpeed : typingSpeed;

  if (!isDeleting.value && currentText.value === text) {
    typeSpeed = delayBetweenTexts;
    isDeleting.value = true;
  } else if (isDeleting.value && currentText.value === '') {
    isDeleting.value = false;
    currentIndex.value = (currentIndex.value + 1) % texts.length;
  }

  setTimeout(typeText, typeSpeed);
};

onMounted(() => {
  setTimeout(typeText, typingSpeed);
});
</script>

<style lang="scss" scoped>
.explore {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;

  h3 {
    text-align: center;
    margin-bottom: 1rem;
    color: $secondary-color;
    font-size: 2.9rem;
    font-weight: 600;
  }

  p {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
    font-size: 1.8rem;
  }

  .explore-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 250px);
    gap: 1rem;
  }

  .explore-item {
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

    &:hover {
      

      img {
        transform: scale(1.2);
      }

      .overlay {
        background: rgba(0, 0, 0, 0.4);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 1.5rem;
      transition: background 0.3s ease;

      .view-360 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .icon-360 {
          width: 48px;
          height: 48px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
      }

      h4 {
        color: white;
        margin: 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .explore-full {
    margin-top: 4rem;
    max-width: 1400px;
    margin-inline: auto;

    .explore-full-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: 1rem;

      .explore-item {
        position: relative;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
      }

      .center-item {
        grid-column: 2;
        grid-row: 2;
        background-color: $secondary-color;
        display: flex;
        align-items: center;
        justify-content: center;

        .center-content {
          text-align: center;
          color: white;
          min-height: 12rem;
          display: flex;
          flex-direction: column;
          justify-content: center;

          h2 {
            font-size: 3rem;
            font-weight: 600;
            margin-bottom: 1rem;
          }

          p {
            color: white;
            font-size: 1.6rem;
            margin: 0;
            min-height: 2.4rem;
          }
        }
      }
    }
  }

  .view-all {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .typing-text {
    min-height: 2.4rem;
    display: inline-block;
    position: relative;
    padding-right: 2px;
  }

  .typing-text::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: white;
    animation: blink 0.7s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
}

@media (max-width: 1024px) {
  .explore {
    .explore-full-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(5, 1fr);

      .center-item {
        grid-column: 1 / span 2;
        grid-row: 3;
      }
    }
  }
}

@media (max-width: 768px) {
  .explore {
    .explore-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(5, 250px);

      .explore-item.large {
        grid-column: 1;
        grid-row: 1;
      }
    }

    .explore-full-grid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(9, 250px);

      .center-item {
        grid-column: 1;
        grid-row: 5;
      }
    }
  }
}
</style>
