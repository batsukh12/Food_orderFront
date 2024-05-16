const backend_api = {
  baseUrl: "http://192.168.1.211:3001/api",
  Register: "/register",
  Login: "/login",
  Restaurant: "/restaurant",
  Cart: "/cart",
  Food: "/food",
  Bookmark: "/bookmark",
  User: "/user",
  Address: "/address",

  RefreshToken: "/refresh_token",
};
const const_image = {
  base_IMG_URL: "http://192.168.1.211:3001/images",
  TYPE: { POSTER: "poster", LOGO: "logo", GALLERY: "gallery" },
  SIZE: { SQUARE: "square", LANDSCAPE: "landscape", PORTRAIT: "portrait" },
  QUALITY: { SD: "sd", HD: "hd" },
};
export default { backend_api, const_image };
