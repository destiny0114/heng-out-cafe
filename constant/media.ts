export const SLIDES_SCROLL = 1;
export const SLIDE_COUNT = 10;

export const slides = Array.from(Array(SLIDE_COUNT).keys());
export const mediaByIndex = (index: number) => `/static/carousel-${index + 1}.jpg`;
