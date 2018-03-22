function convertToStarArray(starsString) {
  //starsString中：十位代表几颗满星，个位代表是否有半星；如35中3代表有三个满星，5代表有半星（个位为0则没有半星）
  var starNum = Number(starsString.toString().substr(0, 1));
  var hasHarfStar = starsString.toString().substr(1, 1) == "0" ? false : true;
  var array = [];//每个位置的1，0.5，0分别代表是满星、版型和白星
  for (var i = 0; i < 5; i++) {
    if (i < starNum) {
      array.push(1);
    } else if (i == starNum) {
      if (hasHarfStar) {
        array.push(0.5);
      } else {
        array.push(0);
      }
    } else {
      array.push(0);
    }
  };
  return array;
}

module.exports = {
  convertToStarArray: convertToStarArray
}
