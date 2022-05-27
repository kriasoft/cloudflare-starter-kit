/* SPDX-FileCopyrightText: 2020-present Kriasoft */
/* SPDX-License-Identifier: MIT */

/**
 * Converts a string into an ArrayBuffer with support of non UTF-8 characters.
 * https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
 */
function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export { str2ab };
