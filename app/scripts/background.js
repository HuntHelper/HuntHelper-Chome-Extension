// Enable chromereload by uncommenting this line:
// import 'chromereload/devonly';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: ''});

// from https://developer.chrome.com/extensions/app_identity
chrome.identity.launchWebAuthFlow(
  {'url': '__HOST__/oauth/authorize', 'interactive': true},
  function(redirect_url) {
    /* Extract token from redirect_url */
  })

// from https://stackoverflow.com/a/25046173/5661887
// chrome.identity.getAuthToken({
//   interactive: true
// }, function(token) {
//   if (chrome.runtime.lastError) {
//     alert(chrome.runtime.lastError.message)
//     return
//   }
//   const x = new XMLHttpRequest()
//   x.open('GET', 'https://localhost.ssl/oauth/userinfo?alt=json&access_token=' + token)
//   x.onload = function() {
//     alert(x.response)
//   }
//   x.send()
// })
