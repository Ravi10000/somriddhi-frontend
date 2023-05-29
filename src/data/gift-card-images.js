export const imagesArray = [
  "/gift-cards/wedding.jpg",
  "/gift-cards/congratulations.png",
  "/gift-cards/waytogo.png",
  "/gift-cards/thank you.png",
];

export default function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * imagesArray.length);
  return imagesArray[randomIndex];
}
