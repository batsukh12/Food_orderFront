import ApiConfig from "../config";
const getLogo = (imageId) =>
  `${ApiConfig.const_image.base_IMG_URL}/logo/${imageId}.png`;

const getPoster = (imageId, quality = ApiConfig.const_image.QUALITY.SD) =>
  `${ApiConfig.const_image.base_IMG_URL}/poster/${quality}/${imageId}.png`;

const getGalleryImage = (
  imageId,
  size,
  quality = ApiConfig.const_image.QUALITY.SD
) =>
  `${ApiConfig.const_image.base_IMG_URL}}/gallery/${size}/${quality}/${imageId}.png`;

export default { getLogo, getPoster, getGalleryImage };
