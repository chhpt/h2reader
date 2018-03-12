import HmacMD5 from 'crypto-js/hmac-md5';
import MD5 from 'crypto-js/md5';

export const formatTime = time => {
  let passTime = time;
  if (!passTime) return 0;
  // 时间为 2017-02-13 样式
  if (passTime.toString().indexOf('-') > -1) {
    const copyTime = Date.parse(passTime);
    // 转换失败
    if (copyTime !== copyTime) return passTime;
  } else if (Number(passTime) !== Number(passTime)) {
    // 时间无法转化成数字
    return passTime;
  }

  // 将时间单位转化为 s
  const parseTime =
    parseInt(passTime, 10) < Date.now() / 1000
      ? parseInt(passTime, 10)
      : Math.floor(parseInt(passTime, 10) / 1000);

  if (parseTime !== parseTime) {
    return passTime;
  }

  const now = Date.now();
  // 计算过去的时间
  const past = Math.floor(now / 1000 - parseTime);

  switch (true) {
    case past < 3600: {
      const t = Math.floor(past / 60, 10);
      return `${t !== 0 ? t : t + 1} 分钟前`;
    }
    case past < 86400: {
      const t = Math.floor(past / 3600, 10);
      return `${t !== 0 ? t : t + 1} 小时前`;
    }
    default: {
      const t = Math.floor(past / 86400, 10);
      return `${t !== 0 ? t : t + 1} 天前`;
    }
  }
};

export const validateEmail = email => {
  if (!email) return false;
  // 邮箱格式校验
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = reg.test(email);
  return valid;
};

/**
 * 对密码进行加密
 * @param password
 * @param key
 * @returns {String}
 */
export const passwordEncrypt = (password, key = '1234') => {
  // 将密码用 MD5 加密
  const cryptPassword = MD5(password).toString();
  // 使用 HmacMD5 进行再次加密
  return HmacMD5(cryptPassword, key);
};
