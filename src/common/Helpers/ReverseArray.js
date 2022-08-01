const ReverseArray = (arr) => {
  let answer = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    answer.push(arr[i]);
  }
  return answer;
};

export default ReverseArray;
