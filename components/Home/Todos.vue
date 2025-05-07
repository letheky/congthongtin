<template>
  <div class="todo-home d-flex">
    <div
      v-for="todo in todos"
      :key="todo.id"
      class="todo-card"
      :style="{ backgroundImage: `url(${todo.image})` }"
      @mouseenter="hovered = todo.id"
      @mouseleave="hovered = null"
    >
      <div class="overlay"></div>
      <component :is="todo.icon" class="todo-icon" />
      <div class="todo-title">{{ todo.title }}</div>
      <Transition name="scale">
        <div class="todo-hover" v-if="hovered === todo.id">
          <div
            class="todo-content"
            v-for="content in todo.content.split('.').map((c) => c.trim())"
            :key="content"
          >
            {{ content }}
          </div>
          <PrimaryButton>Khám phá </PrimaryButton>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Building2, Utensils, Landmark, BookOpen } from "lucide-vue-next";
import PrimaryButton from "@/components/UI/PrimaryButton.vue";

const hovered = ref(null);

const todos = [
  {
    id: 1,
    title: "Ở đâu?",
    content: "Luôn có địa chỉ lưu trú phù hợp ở đâu đó dành riêng cho bạn",
    icon: Building2,
    image: "/image/home/todo-1.webp",
  },
  {
    id: 2,
    title: "Ăn gì?",
    content:
      "Lựa chọn ẩm thực phong phú thỏa mãn tín đồ ẩm thực. Đa dạng trải nghiệm từ cao cấp đến đường phố",
    icon: Utensils,
    image: "/image/home/todo-2.webp",
  },
  {
    id: 3,
    title: "Chơi gì?",
    content: "Tìm kiếm sự độc độc đáo mới lạ",
    icon: Landmark,
    image: "/image/home/todo-3.webp",
  },
  {
    id: 4,
    title: "Cẩm nang du lịch",
    content: "Tận hưởng chuyến du lịch của bạn",
    icon: BookOpen,
    image: "/image/home/todo-4.webp",
  },
];
</script>

<style lang="scss" scoped>
.todo-card {
  position: relative;
  height: 40vh;
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  &::after {
    content: "";
    pointer-events: none;
    position: absolute;
    width: 86%;
    height: 86%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid #fff;
    z-index: $priority-high;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  &::before {
    content: "";
    pointer-events: none; 
    position: absolute;
    width: 92%;
    height: 92%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 4px solid #fff;
    z-index: $priority-high;
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
  }

  .todo-icon {
    z-index: 2;
    color: #fff;
    width: 3rem;
    height: 3rem;
    margin-bottom: 1rem;
  }

  .todo-title {
    z-index: 2;
    color: #fff;
    font-size: 1.8rem;
  }

  .todo-hover {
    @include flex-center-vertical;
    position: absolute;
    height: calc(100% - 10rem);
    width: 100%;
    top: 10rem;
    left: 0;
    z-index: 3;

    .todo-content {
      color: #fff;
      font-size: 1rem;
      text-align: center;
      font-weight: 400;
      max-width: 80%;
    }
  }
  &:hover {
    width: 30%;
    &::after {
      opacity: 1;
    }
    &::before {
      opacity: 1;
    }
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.5s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0);
}

.scale-enter-to,
.scale-leave-from {
  transform: scale(1);
}

@media (max-width: 900px) {
  .todo-home {
    flex-wrap: wrap;
  }
  .todo-card {
    width: 50%;
    &:hover {
      width: 50%;
    }
  }
}

@media (max-width: 600px) {
  .todo-home {
    grid-template-columns: 1fr;
  }
  .todo-card {
    width: 100%;
    &:hover {
      width: 100%;
    }
  }
}
</style>
