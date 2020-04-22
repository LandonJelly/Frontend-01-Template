/*
 * @Description: This file is made for
 * @Date: 2020-04-22 18:59:48
 * @LastEditTime: 2020-04-22 19:05:11
 * @Author: LeongD
 * @LastEditors: LeongD
 */

//  UTF-8 Encoding

function UTF8_Encoding(text) {
  return text.replace(/[^\u0000-\u00FF]/g, function (item) {
    return escape(item).replace(/(%u)(\w{4})/gi, "0x$2;");
  });
}
console.log(UTF8_Encoding("严"));
