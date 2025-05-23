<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="w-full overflow-hidden">
    <BreadCrumbV2 :breadcrumb="breadcrumbData" />
    <article class="w-full 2xl:max-w-7xl mx-auto py-10 px-5 md:px-10 flex">
      <main class="w-full md:w-2/3">
        <template v-if="destination">
          <h2 class="text-2xl font-bold text-slate-400 my-4">
            {{ getTranslation(destination, "name") }}
          </h2>
          <hr class="text-slate-400" />
          <span class="text-slate-500 text-sm flex align-center gap-3 my-4">
            <p class="flex items-center gap-1">
              <Icon name="pin" class="w-5 h-5" />
              {{ getTranslation(destination.district, "name") }}
            </p>
            <p class="flex items-center gap-1">
              <Icon name="view" class="w-5 h-5" />
              {{ destination.view }}
              {{ $t("article.view") }}
            </p>
            <p class="flex items-center gap-1">
              <Icon name="like" class="w-5 h-5" />
              {{ destination.like }}
              {{ $t("article.like") }}
            </p>
            <p class="flex items-center gap-1">
              <ClientOnly>
                <UIRatingV1 :model-value="4.2" :size="20" :precision="2"
              /></ClientOnly>
              {{ destination.rate }}
              {{ $t("article.rate") }}
            </p>
          </span>
          <div class="w-full h-fit">
            <UCarousel
              v-slot="{ item }"
              loop
              dots
              :autoplay="{ delay: 2000 }"
              :items="destination.image_list"
              class="w-full"
            >
              <NuxtImg
                :src="item.image"
                class="w-full aspect-[2/1] min-h-140 rounded-lg"
              />
            </UCarousel>
          </div>
          <div class="my-5 text-slate-700">
            <p v-html="getTranslation(destination, 'content')" />
          </div>
          <template v-if="destination.service.length > 0">
            <h3 class="text-slate-700 text-2xl font-bold tracking-tighter my-3">
              {{ $t("article.service") }}
            </h3>
            <span v-for="item in destinationServiceList" :key="item" class="text-slate-700 flex items-center gap-1">
              <Icon name="check" class="text-sky-500 w-5 h-5" />
              {{ item }}
            </span>
          </template>
          <template v-if="getTranslation(destination, 'address')">
            <UIAccordionSingleV1 :address="getTranslation(destination, 'address')" />
          </template>
        </template>
      </main>
      <aside class="w-full md:w-1/3">Hello</aside>
    </article>
  </div>
</template>

<script setup lang="ts">
// import type PositionItem from '~/types/position'
definePageMeta({
  layout: "home",
});
const { getTranslation } = useTranslation();
const route = useRoute();
const id = route.params.id;

// const { data: destination } = await useFetch(`/api/position/${id}`);
// const {data: serviceList } = await useFetch('api/position/service');
const destination = {
  translations: {
    vi: {
      name: "Chùa Bút Tháp - Kiệt tác của lịch sử",
      des: "",
      content:
        "<p>Chùa Bút Tháp, tên chữ là Ninh Phúc tự, được biết đến là một trong những danh lam cổ tự đẹp nhất ở vùng đồng bằng châu thổ Bắc Bộ, vẫn bảo tồn được tương đối nguyên vẹn cho đến ngày nay. Ngôi chùa tọa lạc trên khu đất cao, rộng, bằng phẳng, nằm kề bên bờ nam Sông Đuống, thuộc thôn Bút Tháp, xã Đình Tổ, huyện Thuận Thành.<br>Xây dựng từ thế kỷ 14 với diện tích khoảng 10.000m2, chùa Bút Tháp có kiến trúc độc đáo, bố cục hài hòa với môi trường thiên nhiên và rất sinh động. Cũng như nhiều ngôi chùa cổ phía Bắc, chùa Bút Tháp được xây theo kiểu nội công ngoại quốc, với các công trình kiến trúc được bố trí cân xứng, chặt chẽ ở khu vực trung tâm. Công trình ngoài cùng là tam quan, có kiến trúc tương đối giản dị. Tiếp đó là gác chuông 2 tầng 8 mái. Sau gác chuông là 7 tòa nhà nối tiếp nhau: Tiền Đường, Thiên Hương, Thượng điện, Tích Thiện Am, nhà Trung, Phủ thờ, Hậu đường với tổng chiều dài hơn 100 mét.<br>Mỗi một công trình kiến trúc ở chùa là một tác phẩm nghệ thuật khéo léo với các hoạ tiết trang trí được làm bằng các chất liệu phong phú và đa dạng như đá, gỗ, gạch. Trong đó, ấn tượng nhất là tòa Tích Thiện Am, một tòa nhà ba gian hai chái, chính giữa có hai tầng gác nhô cao với các đầu đao uốn cong. Bên trong tòa Tích Thiện am đặt Cửu phẩm liên hoa, đây là một cối kinh bát giác cao 7,8m với 9 tầng, 8 mặt tượng trưng cho 9 kiếp tu hành của Đức Thích Ca và 8 phương của đạo Phật. Các mặt của Cửu phẩm liên hoa được chạm những bức phù điêu thể hiện các câu chuyện và điển tích của đạo Phật với ý nghĩa khuyến thiện trừ ác. Mỗi vòng quay của tháp ứng với 3.542.400 câu niệm phật, dù được làm từ mấy thế kỷ trước, tòa Cửu phẩm vẫn có thể quay được và không hề phát ra tiếng kêu.<br>Trong chùa còn lưu giữ được rất nhiều cổ vật và tượng Phật giáo như tượng các vị Bồ Tát, tượng Hộ Pháp, tượng các vị La Hán... Nổi bật và được xem là độc nhất vô nhị ở Việt Nam là pho tượng Phật Quan Âm nghìn tay nghìn mắt, đây là một kiệt tác hàng đầu về nghệ thuật tạc tượng làm nổi bật triết lý nhà Phật. Tượng cao 3,7m, ngang 2,1m, có 11 đầu, 46 tay lớn và hơn 900 tay nhỏ, dài ngắn khác nhau. Mỗi bàn tay lại có một con mắt đen láy, nhịp điệu mỗi cánh tay cũng khác nhau, cả nghìn tay nghìn mắt nhìn tổng thể như những vòng hào quang tỏa ra.<br>Một công trình bằng đá khác được coi là biểu tượng của chùa Bút Tháp, đó là tháp Báo Nghiêm. Tòa tháp trông như một cây bút gồm 5 tầng với chiều cao 13,05m, tầng đáy rộng với mái hiên nhô ra, bốn tầng trên gần giống nhau, năm góc của 5 tầng có 5 quả chuông nhỏ. Xung quanh tháp được trang trí hoa văn sinh động và độc đáo; lòng tháp có một khoang tròn đường kính 2,29m; tầng tháp dưới cùng có 13 bức chạm đá với đề tài động vật. Tương truyền vào năm 1876, khi vua Tự Đức qua chùa thấy có một cây tháp hình dáng khổng lồ liền gọi tên là Bút Tháp, và ngôi chùa mang tên Bút Tháp từ đó.<br>Trải qua bao thăng trầm lịch sử, chùa Bút Tháp luôn được bảo vệ, giữ gìn và tôn tạo ngày càng đẹp hơn trở thành một trong những điểm thăm quan - Du lịch tâm linh nổi tiếng ở vùng Bắc Ninh - Kinh Bắc. Hàng năm, Lễ hội chùa Bút Tháp được tổ chức vào ngày 23-24 tháng 3 Âm lịch với các hoạt động văn hóa truyền thống thu hút đông đảo người dân trong vùng và du khách thập phương về dự.<br>Với những giá trị tiêu biểu về lịch sử, văn hóa và nghệ thuật, chùa Bút Tháp đã được Bộ Văn hóa - Thông tin xếp hạng và công nhận là di tích Lịch sử văn hóa cấp Quốc gia từ năm 1962. Đến năm 2012, pho tượng Phật Quan Âm nghìn tay nghìn mắt được Thủ tướng Chính Phủ cấp bằng công nhận là Bảo vật Quốc gia.</p>",
      address: "Thôn Bút Tháp, xã Đình Tổ, huyện Thuận Thành",
      open_time: "8:00 a.m - 6:00 p.m",
      rule: "QUY ĐỊNH THAM QUAN\r\nQuý khách thân mến, vui lòng tuân thủ các quy tắc dưới đây để bảo vệ khu vực và đảm bảo an toàn, trật tự:\r\n1. Giữ im lặng; không gây tiếng ồn lớn.\r\n2. Ăn mặc giản dị và phù hợp.\r\n3. Không chạm, trèo hoặc dựa vào các hiện vật hoặc công trình kiến ​​trúc.\r\n4. Vứt rác đúng nơi quy định.\r\n5. Không hút thuốc hoặc mang theo vật liệu dễ cháy/nổ.\r\n6. Không chụp ảnh hoặc quay phim ở những khu vực hạn chế.\r\n7. Trẻ em dưới 12 tuổi phải có người lớn đi kèm.\r\n8. Không bán hàng rong, phát tờ rơi hoặc hoạt động thương mại trái phép.\r\n9. Thực hiện theo hướng dẫn của nhân viên khu vực và nhân viên an ninh.\r\n10. Hành xử tôn trọng và bảo vệ di sản văn hóa.\r\n⚠️ Vi phạm có thể dẫn đến việc từ chối dịch vụ hoặc hành động pháp lý.",
      ticket: "100.00đ cho người lớn\r\n50.000đ cho trẻ hơn 5 tuổi",
      audio: null,
      tags: "Chùa Bút Tháp",
    },
    en: {
      name: "But Thap Pagoda - A masterpiece of history",
      des: null,
      content:
        "<p>But Thap Pagoda, whose Chinese name is Ninh Phuc Tu, is known as one of the most beautiful ancient temples in the Northern Delta, still relatively intact to this day. The pagoda is located on a high, wide, flat land, adjacent to the south bank of the Duong River, in But Thap village, Dinh To commune, Thuan Thanh district. Built in the 14th century with an area of ​​about 10,000m2, But Thap Pagoda has a unique architecture, a layout that is in harmony with the natural environment and is very lively. Like many ancient pagodas in the North, But Thap Pagoda was built in the style of internal public and external foreign, with architectural works arranged symmetrically and tightly in the central area. The outermost structure is the three-door gate, with a relatively simple architecture. Next is the 2-storey, 8-roofed bell tower. After the bell tower are 7 consecutive buildings: Tien Duong, Thien Huong, Thuong Dien, Tich Thien Am, Trung house, Phu Tho, Hau Duong with a total length of more than 100 meters.</p><p>Each architectural structure in the pagoda is a skillful work of art with decorative motifs made of rich and diverse materials such as stone, wood, and brick. The most impressive of these is the Tich Thien Am building, a three-room, two-wing building with two raised attics in the middle with curved roof edges. Inside the Tich Thien Am building is the Nine-Piece Lotus, an octagonal sutra mill 7.8m high with 9 floors and 8 sides symbolizing the 9 lives of Sakyamuni's practice and the 8 directions of Buddhism. The sides of the Nine-Piece Lotus are carved with reliefs depicting stories and Buddhist legends with the meaning of encouraging good and eliminating evil. Each rotation of the tower corresponds to 3,542,400 Buddhist chants. Although it was made several centuries ago, the Nine-Piece Lotus can still rotate and does not make any noise.</p><p><br></p><p>The pagoda still preserves many Buddhist antiques and statues such as statues of Bodhisattvas, Dharma protectors, and Arhats... The most prominent and considered unique in Vietnam is the statue of Buddha Quan Am with a thousand hands and a thousand eyes, a masterpiece of sculpture art that highlights Buddhist philosophy. The statue is 3.7m high, 2.1m wide, has 11 heads, 46 large hands and more than 900 small hands, of different lengths. Each hand has a jet-black eye, the rhythm of each arm is also different, the thousand hands and eyes look like halos radiating as a whole. Another stone structure considered a symbol of But Thap Pagoda is Bao Nghiem Tower. The tower looks like a pen with 5 floors with a height of 13.05m, the bottom floor is wide with a protruding eaves, the four upper floors are almost the same, the five corners of the 5 floors have 5 small bells. The tower is decorated with vivid and unique patterns; The tower has a circular chamber with a diameter of 2.29m; the bottom floor of the tower has 13 stone carvings with animal themes. Legend has it that in 1876, when King Tu Duc passed by the pagoda and saw a giant tower, he immediately named it But Thap, and the pagoda has been named But Thap since then.</p><p>Through many historical ups and downs, But Thap Pagoda has always been protected, preserved and embellished to become more and more beautiful, becoming one of the famous spiritual tourist attractions in the Bac Ninh - Kinh Bac region. Every year, But Thap Pagoda Festival is held on the 23rd-24th of the third lunar month with traditional cultural activities attracting a large number of local people and visitors from all over the world to attend.</p><p>With its outstanding historical, cultural and artistic values, But Thap Pagoda was ranked and recognized as a National Historical and Cultural Relic by the Ministry of Culture and Information in 1962. In 2012, the statue of the Thousand-Handed and Thousand-Eyed Bodhisattva Avalokitesvara was recognized as a National Treasure by the Prime Minister.</p>",
      address: "But Thap village, Dinh To commune, Thuan Thanh district",
      open_time: "8:00 a.m - 6:00 p.m",
      rule: "SITE VISIT REGULATIONS\nDear visitors, please follow the rules below to preserve the site and ensure safety and order:\n1. Maintain silence; do not cause loud noise.\n2. Dress modestly and appropriately.\n3. Do not touch, climb, or lean on artifacts or structures.\n4. Dispose of trash properly.\n5. No smoking or bringing flammable/explosive materials.\n6. No photography or filming in restricted areas.\n7. Children under 12 must be accompanied by an adult.\n8. No unauthorized vending, flyer distribution, or commercial activity.\n9. Follow instructions from site staff and security personnel.\n10. Behave respectfully and protect the cultural heritage.\n⚠️ Violations may result in denial of service or legal action.",
      ticket: "100.000đ for adult\n50.000đ for children over 5 years old",
      audio: null,
      tags: "But Thap Pagoda",
    },
  },
  thumbnail:
    "http://172.236.145.72:8002/media/app_position/Position/2025/05/12/4f5e95c3-8d5c-4c32-8851-cdad356a0746.webp",
  image:
    "http://172.236.145.72:8002/media/app_position/Position/2025/05/12/57e51713-4e3f-4f2e-a447-195ce5321f59.webp",
  phone: "02223 822 532",
  website: null,
  lat: 21.06079,
  lng: 106.02229,
  charge: false,
  allow_comment: true,
  highlight: true,
  suggest_time: [],
  tour: null,
  type: [
    "b5efb535-b012-474d-85de-eb4963fae71a",
    "62b64326-2c5f-437f-9f5c-adc551293efc",
  ],
  service: ["e90f2371-bc9a-4e45-ac60-83a6a35e796d"],
  category: [
    "acdb6f98-44a6-46ab-8d3b-3f6d44b7e992",
    "425567f7-0f9c-4cac-9f5c-86df78bd958b",
    "fa276249-f323-4459-90d6-5d73b0cba2e0",
    "589043a4-6f64-4828-9c53-c800f22d8e1b",
  ],
  country: {
    translations: {
      vi: {
        name: "Việt Nam",
      },
      en: {
        name: "Vietnam",
      },
    },
    code: "84",
    id: "b7e5bb2b-8a8b-4505-b81a-f5b4bc5dfc12",
    order: null,
    slug: "viet-nam",
    created_at: "2025-05-12T15:05:16.847218+07:00",
    created_by: null,
    updated_at: "2025-05-12T15:23:21.658210+07:00",
    updated_by: null,
  },
  province: {
    translations: {
      vi: {
        name: "Tỉnh Bắc Ninh",
      },
      en: {
        name: "Bac Ninh Province",
      },
    },
    code: "27",
    country: "b7e5bb2b-8a8b-4505-b81a-f5b4bc5dfc12",
    id: "c3111182-c941-431b-ad90-7e84cfe7efb2",
    order: null,
    slug: "tinh-bac-ninh",
    created_at: "2025-05-12T15:10:07.709065+07:00",
    created_by: null,
    updated_at: "2025-05-12T15:10:18.219744+07:00",
    updated_by: null,
  },
  district: {
    translations: {
      vi: {
        name: "Huyện Thuận Thành",
      },
      en: {
        name: "Thuan Thanh District",
      },
    },
    code: "262",
    province: "c3111182-c941-431b-ad90-7e84cfe7efb2",
    id: "1f06b881-2800-4aae-8b98-9f9d177d958a",
    order: null,
    slug: "huyen-thuan-thanh",
    created_at: "2025-05-12T15:15:01.334183+07:00",
    created_by: null,
    updated_at: "2025-05-12T15:18:21.278087+07:00",
    updated_by: null,
  },
  ward: {
    translations: {
      vi: {
        name: "Xã Thanh Khương",
      },
      en: {
        name: "Thanh Khuong Village",
      },
    },
    code: "xtk",
    district: "33c7c3b9-90fd-43eb-963a-d606d5d5d333",
    id: "f46d5bb8-7cec-485b-8ed6-d593f46e03d2",
    order: null,
    slug: "xa-thanh-khuong",
    created_at: "2025-05-13T11:06:38.541711+07:00",
    created_by: null,
    updated_at: "2025-05-13T11:06:46.915825+07:00",
    updated_by: null,
  },
  rate: 0,
  rate_list: [],
  image_list: [
    {
      translations: {
        vi: {
          title: "Chùa Bút Tháp 1",
          des: null,
        },
      },
      image:
        "http://172.236.145.72:8002/media/app_position/Image/2025/05/13/750e797f-4e35-488d-8d8e-818912a6aeeb.webp",
      position: "93f98f6d-a62b-4301-9bad-a49ef3507aa6",
      id: "08ab8064-a531-492a-ba4e-77c88273342b",
      order: null,
      slug: null,
      created_at: "2025-05-13T14:36:37.877767+07:00",
      created_by: null,
      updated_at: "2025-05-13T14:36:37.879524+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          title: "Chùa Bút Tháp 2",
          des: null,
        },
      },
      image:
        "http://172.236.145.72:8002/media/app_position/Image/2025/05/13/36d7df61-d17d-4a0b-a48d-cc4c76445a29.webp",
      position: "93f98f6d-a62b-4301-9bad-a49ef3507aa6",
      id: "bd69c5cc-efec-422f-b331-ce3033eaf01a",
      order: null,
      slug: null,
      created_at: "2025-05-13T14:36:37.893778+07:00",
      created_by: null,
      updated_at: "2025-05-13T14:36:37.895258+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          title: "Chùa Bút Tháp 3",
          des: null,
        },
      },
      image:
        "http://172.236.145.72:8002/media/app_position/Image/2025/05/13/06f2c51c-79e7-44ee-a045-f8cc8b024fc2.webp",
      position: "93f98f6d-a62b-4301-9bad-a49ef3507aa6",
      id: "7e066f37-69f1-43f9-89ef-f859344e0c8d",
      order: null,
      slug: null,
      created_at: "2025-05-13T14:36:37.905804+07:00",
      created_by: null,
      updated_at: "2025-05-13T14:36:37.907182+07:00",
      updated_by: null,
    },
  ],
  video_list: [],
  id: "93f98f6d-a62b-4301-9bad-a49ef3507aa6",
  order: null,
  slug: "",
  created_at: "2025-05-22T12:27:04.740242+07:00",
  created_by: null,
  updated_at: "2025-05-22T12:27:04.759876+07:00",
  updated_by: "c1c86bc4-3552-417d-852a-42fe5d6b5e73",
  like: 0,
  view: 3,
};
const serviceList = {
  page_size: 8,
  total_objects: 8,
  total_pages: 1,
  current_page_number: 1,
  next: null,
  previous: null,
  results: [
    {
      translations: {
        vi: {
          name: "Thuyết minh lịch sử",
          des: null,
        },
        en: {
          name: "Historical subtitles",
          des: null,
        },
      },
      id: "e90f2371-bc9a-4e45-ac60-83a6a35e796d",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.822252+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.828627+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          name: "Shop lưu niệm",
          des: null,
        },
      },
      id: "e34b8559-0c36-4ebe-984c-42c46291ea4d",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.839737+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.844958+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          name: "Xe đạp đôi",
          des: null,
        },
      },
      id: "27e01702-f9a1-42e9-b6d9-bed16a180f1f",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.854306+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.857764+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          name: "Cưỡi ngựa chụp hình",
          des: null,
        },
      },
      id: "9f754414-df7e-4e1c-b531-324856f44cb7",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.867607+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.871156+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          name: "Lều trại dã ngoại",
          des: null,
        },
      },
      id: "d8bf18e9-2eba-4fc7-b6ec-2adee7d6ebca",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.881040+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.884590+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          name: "Thuê đồ cắm trại",
          des: null,
        },
      },
      id: "3784cbcb-a67f-4b36-9094-0a776e134b64",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.894486+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.898822+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          name: "Tham quan bằng xe jeep",
          des: null,
        },
      },
      id: "63d4a79d-92dd-4442-8fd3-013f3dbe93cb",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.908841+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.912457+07:00",
      updated_by: null,
    },
    {
      translations: {
        vi: {
          name: "Xe đạp đôi",
          des: null,
        },
      },
      id: "7454ca2b-2664-4156-9f9e-67a576a0bfcc",
      order: null,
      slug: null,
      created_at: "2025-05-13T10:22:50.922296+07:00",
      created_by: null,
      updated_at: "2025-05-13T10:22:50.925825+07:00",
      updated_by: null,
    },
  ],
};
const destinationServiceList = computed(() => {
  const result: string[] = [];
  const filterdService = serviceList.results.filter((service) =>
    destination.service.includes(service.id)
  );
  filterdService.forEach((service) => {
    result.push(getTranslation.value(service, "name"));
  });
  return result;
});


const breadcrumbData = computed(() => [
  {
    label: "home",
    text: "",
    path: "/",
  },
  {
    label: "destination",
    text: "",
    path: "/destination",
  },
  // You might want to conditionally add the current destination name once it's loaded
  // {
  //   text: destination.value ? getTranslation(destination.value, "name") : '',
  //   path: destination.value ? `/destination/${destination.value.id}` : '',
  // }
]);
</script>

<style scoped></style>
