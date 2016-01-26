import _ from 'lodash';

/**
 *
 * возвращает строку - путь до картинки по шаблону {crop}{width}x{height}q{quality}
 * принемает настройки params
 * width, - ширина картинки
 * height, - высота картинки
 * size, - шаблон размера ( в таком случае игнорируются width, height)
 * image_url - шаблон пути ( main_image.image_url_template )
 *
 * если передали только параметр width, то игнорируем параметр {crop}
 *
 *
 * "http://img01.rl0.ru/pgc/{crop}{width}x{height}q{quality}/5605262d-f845-03d1-f845-0396b4118ed8.photo.0.jpg"
 * @param params
 * @returns {string}
 */
export function imageTemplateCrop(params) {
  let {width, height, size, main_image, crop} = params;
  let imageCrop   = crop || true;
  const imageSize = {
    LOW: "c300x251",
    MIDDLE: "c300x400",
    HIGH: "c620x400"
  }

  if (!main_image || !main_image.image_url) {
    return '';
  }

  var pgcReg   = /\:\/\/\S+\/pgc\//;
  var isHasPgc = pgcReg.test(main_image.image_url);

  if (!isHasPgc || !main_image.image_url_template) {
    return main_image.image_url;
  }

  let image_url = main_image.image_url_template;

  let newImagePath = '';
  if (size && imageSize[size]) {
    newImagePath = image_url.replace(/\{crop\}\{width\}\x\{height\}\q\{quality\}/, imageSize[size]);
  }

  if ((width && height)) {
    let w        = crop === false ? `${width}` : `c${width}`;
    newImagePath = image_url.replace(/\{crop\}\{width\}/, w)
      .replace(/\{height\}/, height)
      .replace(/q\{quality\}/, '');
  }

  if ((width && !height)) {
    newImagePath = image_url.replace(/\{crop\}\{width\}/, width)
      .replace(/\{height\}/, '-')
      .replace(/q\{quality\}/, '');
  }

  return newImagePath;
}

let Utils = {};


export default Utils;
