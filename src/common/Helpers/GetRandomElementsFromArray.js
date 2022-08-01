// Returns an array
function GetRandomElementsFromArray(arr, count) {
  if (count >= arr.length) {
    return arr;
  }
  // let final = [];
  //
  // for (let i=0;i<count;i++) {
  //   let randomIndex = Math.floor((Math.random() * arr.length));
  //   final.push(arr[randomIndex]);
  //   arr.splice(randomIndex, 1);
  // }

  var result = new Array(count),
    len = arr.length,
    taken = new Array(len);
  while (count--) {
    var x = Math.floor(Math.random() * len);
    result[count] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;

}


export default GetRandomElementsFromArray;
