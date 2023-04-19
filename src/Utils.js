/**
 * @desc 공통 유틸리티 함수
 * @auth hy
 * @since 2022.08.26
 * */

// 숫자에 콤마 추가
const addComma = (nStr) => {
  nStr += "";
  let x = nStr.split(".");
  let x1 = x[0];
  let x2 = x.length > 1 ? "." + x[1] : "";
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  return x1 + x2;
};

export default addComma;
