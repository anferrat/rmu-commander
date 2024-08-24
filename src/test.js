

const er = {
  "request": {
    "DONE": 4,
    "HEADERS_RECEIVED": 2,
    "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": false, "_headers": { "accept": "application/json, text/plain, */*", "user-agent": "Mozilla/5.0 (Linux; Android 14; sdk_gphone64_arm64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Mobile Safari/537.36" }, "_incrementalEvents": true, "_lowerCaseResponseHeaders": { "accept-ranges": "bytes", "age": "37330", "content-length": "7831", "content-security-policy": "default-src 'none'; script-src 'self' maps.googleapis.com https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js https://www.googletagmanager.com 'unsafe-hashes' 'unsafe-inline'; style-src 'self' 'unsafe-inline' *.googleapis.com; object-src 'none'; base-uri 'self'; connect-src 'self' *.corview.cloud maps.googleapis.com https://www.google-analytics.com; font-src 'self' data: fonts.gstatic.com; frame-src 'self' *.corview.cloud; frame-ancestors 'self'; img-src 'self' data: maps.gstatic.com *.googleapis.com *.ggpht.com; manifest-src 'self'; media-src 'self'; worker-src 'none'; form-action 'self';", "content-type": "text/html", "date": "Mon, 29 Jul 2024 19:12:44 GMT", "etag": "\"41a9c7896a13c62b2d2a7376a7c9f120\"", "last-modified": "Thu, 11 Jul 2024 16:56:40 GMT", "referrer-policy": "strict-origin-when-cross-origin", "server": "AmazonS3", "strict-transport-security": "max-age=63072000; includeSubDomains", "vary": "Origin", "via": "1.1 21caa6ddeea167501523139c019e1448.cloudfront.net (CloudFront)", "x-amz-cf-id": "tT8NiRn9P9qHDw2PFy1nuk9mkNs5lRjTT2UcKULuVCs2_lRXVGymCQ==", "x-amz-cf-pop": "YVR52-P1", "x-amz-server-side-encryption": "AES256", "x-cache": "Error from cloudfront", "x-content-type-options": "nosniff", "x-frame-options": "SAMEORIGIN", "x-xss-protection": "1; mode=block" }, "_method": "GET", "_perfKey": "network_XMLHttpRequest_1003", "_performanceLogger": { "_closed": false, "_extras": [Object], "_pointExtras": [Object], "_points": [Object], "_timespans": [Object] }, "_requestId": null,
    "_response": `<!DOCTYPE html><html lang=\"en\"><head>
</body></html>`,
    "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": 1003, "_url": "https://account.corview.cloud/connect/authorize?client_id=corViewSpa&redirect_uri=https%3A%2F%2Fwww.corview.cloud%2Fauth-return&response_type=code&scope=openid%20profile%20corview.api%20corview.web&nonce=314dedd2321e01a91f2660bc58f6061db7dgoP5Z8&state=0f6b18f6ca22f495fcb8fa6eda2e1411a14UGB360&code_challenge=7X0ckvDCDnNt3mmWgXEb97JxuS8sYvD%2FHiBehemPvFA&code_challenge_method=S256&prompt=none", "readyState": 4, "responseHeaders": { "accept-ranges": "bytes", "age": "37330", "content-length": "7831", "content-security-policy": "default-src 'none'; script-src 'self' maps.googleapis.com https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js https://www.googletagmanager.com 'unsafe-hashes' 'unsafe-inline'; style-src 'self' 'unsafe-inline' *.googleapis.com; object-src 'none'; base-uri 'self'; connect-src 'self' *.corview.cloud maps.googleapis.com https://www.google-analytics.com; font-src 'self' data: fonts.gstatic.com; frame-src 'self' *.corview.cloud; frame-ancestors 'self'; img-src 'self' data: maps.gstatic.com *.googleapis.com *.ggpht.com; manifest-src 'self'; media-src 'self'; worker-src 'none'; form-action 'self';", "content-type": "text/html", "date": "Mon, 29 Jul 2024 19:12:44 GMT", "etag": "\"41a9c7896a13c62b2d2a7376a7c9f120\"", "last-modified": "Thu, 11 Jul 2024 16:56:40 GMT", "referrer-policy": "strict-origin-when-cross-origin", "server": "AmazonS3", "strict-transport-security": "max-age=63072000; includeSubDomains", "vary": "Origin", "via": "1.1 21caa6ddeea167501523139c019e1448.cloudfront.net (CloudFront)", "x-amz-cf-id": "tT8NiRn9P9qHDw2PFy1nuk9mkNs5lRjTT2UcKULuVCs2_lRXVGymCQ==", "x-amz-cf-pop": "YVR52-P1", "x-amz-server-side-encryption": "AES256", "x-cache": "Error from cloudfront", "x-content-type-options": "nosniff", "x-frame-options": "SAMEORIGIN", "x-xss-protection": "1; mode=block" }, "responseURL": "https://www.corview.cloud/auth-return?code=BD9E36B6854A5C149F256DB933E30377978BEC25837211DE4F12766B3ED35738&scope=openid%20profile%20corview.api%20corview.web&state=0f6b18f6ca22f495fcb8fa6eda2e1411a14UGB360&session_state=BanE0zWxmOq8YYMbTqTM3lf1Lzq3LX45W_GyUGTpUo4.A7C17539D4807436C991F8A46D50370B", "status": 200, "timeout": 10000, "upload": {}, "withCredentials": true
  },
  "status": 200,
  "statusText": undefined
}

function parseVerificationToken(html) {
  try {
    const PARAMETER = '<input name="__RequestVerificationToken" type="hidden" value="'
    const position = html.search(PARAMETER)
    if (~position) {
      const start = position + PARAMETER.length
      const cutOff = html.substring(start)
      return html.substring(start, start + cutOff.search('"'))
    }
    return ""
  }
  catch (er) {
    return ""
  }
}
