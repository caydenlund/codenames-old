App.info({
    id: "com.herokuapp.codenames-digital",
    version: "1.0.0",
    name: "Codenames",
    description: "Digital Codenames",
    author: "Cayden Lund"
});

icon = "public/icon-001.png";

App.icons({
    iphone_2x: icon,
    iphone_3x: icon,
    ipad: icon,
    ipad_2x: icon,
    ipad_pro: icon,
    ios_settings: icon,
    ios_settings_2x: icon,
    ios_settings_3x: icon,
    ios_spotlight: icon,
    ios_spotlight_2x: icon,
    android_mdpi: icon,
    android_hdpi: icon,
    android_xhdpi: icon,
    android_xxhdpi: icon,
    android_xxxhdpi: icon
});

App.setPreference("Fullscreen", "true");
App.setPreference("DisallowOverscroll", "true");
App.setPreference("Orientation", "landscape");
