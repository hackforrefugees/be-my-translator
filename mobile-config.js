App.accessRule('*');

App.info({
  name: 'Be my translator',
  description: 'How can we help refugees with new languages in a good way?',
  author: 'Be-my-translator@hackForRefugees',
  website: 'https://github.com/hackforrefugees/be-my-translator',
  version: '0.0.1'
});

App.icons({
  // iOS
 // 'iphone': 'resources/icons/icon-60x60.png',
  // Android
  'android_ldpi': 'public/images/bmt-logo_36x36.png',
  'android_mdpi': 'public/images/bmt-logo_48x48.png',
  'android_hdpi': 'public/images/bmt-logo_72x72.png',
  'android_xhdpi': 'public/images/bmt-logo_96x96.png'
});
/*
App.launchScreens({
  // iOS
  //'iphone': 'resources/splash/splash-320x480.png',

  // Android
 // 'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
});*/

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
