import moment from "moment";
import { BUCKET_URL } from "./config";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function getCurrentUrl(location) {
  if (location.pathname.split(/[?#]/)[0].split("/")[3]) {
    return location.pathname.split(/[?#]/)[0].split("/")[3];
  } else if (location.pathname.split(/[?#]/)[0].split("/")[2]) {
    return location.pathname.split(/[?#]/)[0].split("/")[2];
  } else {
    return location.pathname.split(/[?#]/)[0].split("/")[1];
  }
}
export function checkIsActive(location, url) {
  const current = getCurrentUrl(location);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(url) > -1) {
    return true;
  }

  return false;
}
export function calcTotalPages(total, pageSize) {
  if (total === 0) {
    return 1;
  } else {
    return Math.ceil(Number(total) / Number(pageSize));
  }
}
export const isServer = () => {
  return typeof window === "undefined";
};
export function checkPermission(permissions, permissionsToCheck) {
  const data = permissions.filter(function (itemOne) {
    return permissionsToCheck.some(function (itemTwo) {
      return itemOne.name === itemTwo;
    });
  });

  return data?.length > 0 ? true : false;
}

//根据priceTickSize 0.00001 返回保留几位小数
export function getDecimalsNum(priceTickSize) {
  let m = priceTickSize.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
  let price = priceTickSize.toFixed(Math.max(0, (m[1] || "").length - m[2]));
  if (price.lastIndexOf(".") === -1) {
    return 0;
  } else {
    return price.toString().split(".")[1].length;
  }
}

//只能输入 数字小数点 限定小数点位数  第一位不能是小数点
export function onlyInputNumAndPoint(data, pointLong) {
  var regExp = new RegExp("^(\\-)*(\\d+)\\.(\\d{" + pointLong + "}).*$");
  data = data.replace(/[^\d.]/g, ""); //只能输入数字和小数
  data = data.replace(/^\./g, ""); //第一位不能输入.
  data = data.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  data = data.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  data = data.replace(regExp, "$1$2.$3"); //只能输入X个小数
  return data;
}

export function FormatNumberByDecimals(number, decimals) {
  let Newnumber = 0;
  if (!number) {
    return 0;
  }

  if (decimals) {
    const numberString = number.toString();
    const arr = numberString.split(".");
    const cerrentLength = arr[0].length;
    const newString = arr.join("");
    let result = "";
    const diffLenght = cerrentLength - decimals;
    if (diffLenght > 0) {
      let newNum = newString.slice(0, diffLenght);
      while (newNum.length > 3) {
        result = "," + newNum.slice(-3) + result;
        newNum = newNum.slice(0, newNum.length - 3);
      }
      if (newNum) {
        result = newNum + result;
      }
      Newnumber = result + "." + newString.slice(diffLenght);
    } else {
      let dudo = "";
      for (let i = 0; i < Math.abs(diffLenght); i++) {
        dudo += "0";
      }
      Newnumber = "0." + dudo + newString;
    }
    Newnumber = Newnumber.replace(/(\.0+|0+)$/, "");
  } else {
    Newnumber = number;
  }
  return Newnumber;
}

export function FormatNumberByDecimalsBalance(number, decimals) {
  let Newnumber = 0;
  if (!number) {
    return 0;
  }
  let curDecimals = Number(decimals);
  if (curDecimals) {
    const numberString = number.toString();
    const arr = numberString.split(".");
    const cerrentLength = arr[0].length;
    const newString = arr.join("");

    const diffLenght = cerrentLength - decimals;
    if (diffLenght > 0) {
      Newnumber =
        newString.slice(0, diffLenght) + "." + newString.slice(diffLenght);
    } else {
      let dudo = "";
      for (let i = 0; i < Math.abs(diffLenght); i++) {
        dudo += "0";
      }
      Newnumber = "0." + dudo + newString;
    }
    Newnumber = Newnumber.replace(/(\.0+|0+)$/, "");
  } else {
    Newnumber = number;
  }
  return Newnumber;
}

export function toThousands(num) {
  let NUM = (num || 0).toString();
  let arr = NUM.split(".");
  let number = (arr[0] || 0).toString(),
    result = "";
  while (number.length > 3) {
    result = "," + number.slice(-3) + result;
    number = number.slice(0, number.length - 3);
  }
  if (number) {
    if (arr[1]) {
      result = number + result + "." + arr[1];
    } else {
      result = number + result;
    }
  }
  return result;
}

export function toNumber(value) {
  const regNum = /^[1-9][0-9]*$/;
  if (!Number.isNaN(value) && regNum.test(value)) {
    if (parseInt(value) === 0) {
      return 1;
    } else {
      return parseInt(value);
    }
  } else {
    return "";
  }
}
export const getDayDiff = (timestamp) => {
  let a = moment();
  let b = moment(timestamp);
  let diff = a.diff(b, "year");
  if (diff === 0) {
    diff = a.diff(b, "month");
    if (diff === 0) {
      diff = a.diff(b, "days");
      if (diff === 0) {
        diff = a.diff(b, "hour");
        if (diff === 0) {
          diff = a.diff(b, "minute");
          if (diff === 0) {
            diff = a.diff(b, "second");
            return `${diff} second(s) before`;
          } else {
            return `${diff} minute(s) before`;
          }
        } else {
          return `${diff} hour(s) before`;
        }
      } else {
        return `${diff} days(s) before`;
      }
    } else {
      return `${diff} month(s) before`;
    }
  } else {
    return `${diff} year(s) before`;
  }
};

export const getWhen = (timestamp) => {
  let when = `${moment(timestamp).format("L")} ${moment(timestamp).format(
    "LTS"
  )}`;
  return when;
};
export const CryptoIcon = (name) => {
  const nameSplited = name.split("_");
  if (nameSplited.length === 2) {
    return (
      "https://cryptoicon-api.vercel.app/api/icon/" +
      nameSplited[0].toLowerCase()
    );
  } else {
    return "https://cryptoicon-api.vercel.app/api/icon/" + name.toLowerCase();
  }
};
const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} imageSrc - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(file);
    }, "image/jpeg");
  });
}

export function Utc2BeijingDateTime(utc_datetime) {
  const T_pos = utc_datetime.indexOf("T");
  const Z_pos = utc_datetime.indexOf("Z");
  const year_month_day = utc_datetime.substr(0, T_pos);
  const hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);

  // eslint-disable-next-line
  const new_datetime =
    year_month_day.replace(/\-/g, "/") + " - " + hour_minute_second;

  return new_datetime;
}

export function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var math = Math.floor(Math.log(bytes) / Math.log(1024));
  var i = parseInt(math.toString());
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}

export function dateFormatter(dateutc) {
  const val =
    new Date(dateutc ? dateutc : null).toISOString().split(".")[0] + "Z";
  const valueSplited = Utc2BeijingDateTime(val);
  return valueSplited;
}
export function roundNumber(num) {
  if (num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  } else {
    return 0;
  }
}

export const getImageUrl = (image, defaultFallback = "/media/no-image.png") => {
  if (image?.[0] && image?.[0]?.key) {
    return BUCKET_URL + image?.[0]?.key;
    // return image?.[0]?.location;
  } else if (image?.key) {
    return BUCKET_URL + image?.key;
  } else if (typeof image === "string") {
    return BUCKET_URL + image;
  } else {
    return toAbsoluteUrl(defaultFallback);
  }
};

export const abbreviateText = (text, size = 5) => {
  return (
    text?.slice(0, size) +
    "..." +
    text?.slice(text?.length - size, text?.length)
  );
};

export const sortAsc = (arr = []) => {
  if (!arr?.length) return [];

  const newArr = [...arr];

  newArr?.sort?.((a, b) => a - b);
  return newArr;
};

export const toAbsoluteUrl = (pathname) => process.env.PUBLIC_URL + pathname;
