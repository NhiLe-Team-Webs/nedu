// Simple script to test image availability
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public/picture');
const requiredImages = [
  'la_chinh_minh.jpg',
  'suc_manh_vo_han.jpg',
  'thuong_hieu_cua_ban.png',
  'cuoc_song_cua_ban.png',
  'ai_for_business.png',
  'ai_in_mkt.png',
  'gen_ai.png',
  'nhile.png',
  'nhile.jpg',
  'quote.svg',
  'facebook.svg',
  'linkedin-footer.svg',
  'facebook-footer.svg',
  'instagram-footer.svg',
  'familycloud.jpg',
  'XFactor_Method_Logo_-_Blue.png'
];

console.log('Checking image availability...\n');

const missingImages = [];
const existingImages = [];

requiredImages.forEach(image => {
  const imagePath = path.join(publicDir, image);
  if (fs.existsSync(imagePath)) {
    existingImages.push(image);
    console.log(`✅ ${image}`);
  } else {
    missingImages.push(image);
    console.log(`❌ ${image} - MISSING`);
  }
});

console.log(`\n=== SUMMARY ===`);
console.log(`Total required: ${requiredImages.length}`);
console.log(`Found: ${existingImages.length}`);
console.log(`Missing: ${missingImages.length}`);

if (missingImages.length > 0) {
  console.log('\nMissing images:');
  missingImages.forEach(img => console.log(`  - ${img}`));
  console.log('\nPlease add these images to public/picture/ directory');
}

if (existingImages.length > 0) {
  console.log('\nExisting images:');
  existingImages.forEach(img => console.log(`  - ${img}`));
}