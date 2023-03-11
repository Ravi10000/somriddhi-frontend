export default function handleResponsive({ list, setList, itemsPerSlide }) {
  for (let i = 0; i < list.length; i += itemsPerSlide) {
    const newArray = [];
    for (let j = i; j < i + itemsPerSlide; j++) {
      if (list[j]) {
        newArray.push(list[j]);
        // console.log(newArray);
      }
    }
    setList((prevArray) => [...prevArray, newArray]);
  }
}
