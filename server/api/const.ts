//Setup - Các thông số cài dặt chung cho website
export const GET_WEBSITE_BANNER = 'setup/banner/';
export const GET_WEBSITE_INFO = 'setup/info/';
export const GET_WEBSITE_LANGUAGE = 'setup/language/';
export const GET_WEBSITE_LANGUAGE_TRANSLATE = 'setup/language/translate/';
export const GET_WEBSITE_PRIVACY_POLICY = 'setup/policy/';
export const GET_WEBSITE_TERMS = 'setup/terms/';
export const GET_SOCIAL_LINK = 'setup/social-link/';
export const GET_STYLE_CUSTOM = 'setup/style-custom/';
export const GET_WEBSITE_TEXT_LABEL = 'setup/text-label/';
export const GET_TODO_BLOCK = 'category/block/'

//Article - Bài viết hiện đang sử dụng cho 3 loại Cẩm nang du lịch, lễ hội, giới thiệu
export const GET_ARTICLE = 'article/article/';
export const GET_ALL_ARTICLE_BY_CATEGORY = 'article/category/';// Hiện chưa có

//Album - Danh sách album ảnh, video
export const GET_IMAGE_ALBUM_LIST = 'album/image-category/';
// export const 
export const GET_VIDEO_ALBUM_LIST = 'album/video-category/';

//Geo location - Các quốc gia, tỉnh, thành phố, quận, huyện, làng, xã
export const GET_ALL_COUNTRY = 'category/country/';
export const GET_ALL_PROVINCE = 'category/province/'; // có thể truyền tham số country để lọc
export const GET_ALL_DISTRICT = 'category/district/'; // có thể truyền tham số province để lọc
export const GET_ALL_WARD = 'category/ward/'; // có thể truyền tham số district để lọc

//Contact - Danh sách liên hệ
export const GET_ALL_CONTACT_CATEGORY = 'contact/category/';
export const GET_CONTACT_BY_CATEGORY = 'contact/contact/';

//Event - Sự kiện, tin tức
export const GET_ALL_EVENT_CATEGORY = 'event/category/';
export const GET_EVENT = 'event/event/';// Có thể truyền thêm tham số category hoặc id

//Position - Địa điểm có 3 danh mục chính trong menu Văn hóa - lịch sử, Địa điểm check-in, Tâm linh có thể có Vui choi
export const GET_ALL_POSITION_CATEGORY = 'position/category/';
export const GET_POSITION_SERVICE  = 'position/service/';
export const GET_POSITION_TYPE = 'position/type/';
export const GET_POSITION = 'position/position/';// Có thể truyền thêm tham số category hoặc id

//Restaurant - Quán ăn hiện có 3 danh mục nhà hàng, quán cafe & đặc sản
export const GET_RESTAURANT_SERVICE = 'restaurant/service/';
export const GET_RESTAURANT_TYPE = 'restaurant/type/';
export const GET_RESTAURANT  = 'restaurant/restauant/';// Có thể truyền thêm tham số category hoặc id

//Stay - Lưu trú hiện có 3 danh mục khách sạn, nhà nghỉ, căn hộ
export const GET_STAY_SERVICE = 'stay/service/';
export const GET_STAY_TYPE = 'stay/type/';
export const GET_STAY  = 'stay/house/';// Có thể truyền thêm tham số category hoặc id

//Travel unit - Đơn vị du lịch
export const GET_TRAVEL_UNIT_SERVICE = 'travelunit/service/';
export const GET_TRAVEL_UNIT  = 'travelunit/travelunit/';// Có thể truyền thêm tham số category hoặc id

//Trip - Chương trình du lịch
export const GET_TRIP_TYPE = 'trip/type/';
export const GET_TRIP  = 'trip/trip/';// Có thể truyền thêm tham số category hoặc id

//Tour 360 - Tour du lịch 360 - chỉ có ở Trang chủ
export const GET_TOUR_TYPE = 'tour/type/';
export const GET_TOUR  = 'tour/tour/';// Có thể truyền thêm tham số category hoặc id

