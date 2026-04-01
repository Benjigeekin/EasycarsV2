const Jimp = require('jimp');
const fs = require('fs');

async function processCars() {
  const imgPath = 'C:\\Users\\bitel\\.gemini\\antigravity\\brain\\b3e88b11-ea96-48d9-acaa-4ca673da94e2\\media__1774825963239.png';
  if(!fs.existsSync(imgPath)) {
    console.error('Image not found:', imgPath);
    return;
  }
  const image = await Jimp.read(imgPath);
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  // Make sure public/images directory exists
  if (!fs.existsSync('public/images')) {
    fs.mkdirSync('public/images', { recursive: true });
  }

  const w2 = Math.floor(w / 2);
  const h2 = Math.floor(h / 2);

  // Card 3: Skoda Kodiaq AWD (Top Left)
  const car3 = image.clone().crop(0, 0, w2, h2).autocrop();
  await car3.writeAsync('public/images/car3.png');
  console.log('Saved car3.png (Kodiaq)');

  // Card 2: Porsche Cayenne Coupe (Top Right)
  const car2 = image.clone().crop(w2, 0, w - w2, h2).autocrop();
  await car2.writeAsync('public/images/car2.png');
  console.log('Saved car2.png (Cayenne)');

  // Card 1: Range Rover Sport (Bottom Center)
  const car1 = image.clone().crop(0, h2, w, h - h2).autocrop();
  await car1.writeAsync('public/images/car1.png');
  console.log('Saved car1.png (Range Rover)');
}

processCars().catch(console.error);
