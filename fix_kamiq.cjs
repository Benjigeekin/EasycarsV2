const Jimp = require('jimp');
const fs = require('fs');

async function processCar() {
  const imgPath = 'C:\\Users\\bitel\\.gemini\\antigravity\\brain\\b3e88b11-ea96-48d9-acaa-4ca673da94e2\\media__1775084271273.jpg';
  const outPath = 'public/images/skoda_kamiq_perfect.jpg';

  if(!fs.existsSync(imgPath)) {
    console.error('Image not found:', imgPath);
    return;
  }
  const image = await Jimp.read(imgPath);
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  
  // Create a visited mask
  const visited = new Uint8Array(w * h);
  
  // BFS queue
  const queue = [];
  
  // Push all border pixels to queue
  for (let x = 0; x < w; x++) {
    queue.push({x, y: 0});
    queue.push({x, y: h - 1});
  }
  for (let y = 0; y < h; y++) {
    queue.push({x: 0, y});
    queue.push({x: w - 1, y});
  }
  
  const getIdx = (x, y) => (y * w + x) * 4;
  
  // Flood fill target: any pixel that is "not obviously dark car or dark shadow"
  // Since the car is a dark metallic grey and the shadows are black,
  // we can safely erase anything that is brighter than ~130.
  // We'll use brightness: (R+G+B)/3
  
  let head = 0;
  while (head < queue.length) {
    const {x, y} = queue[head++];
    
    if (x < 0 || x >= w || y < 0 || y >= h) continue;
    
    const vIdx = y * w + x;
    if (visited[vIdx]) continue;
    visited[vIdx] = 1;
    
    const i = getIdx(x, y);
    const r = image.bitmap.data[i];
    const g = image.bitmap.data[i+1];
    const b = image.bitmap.data[i+2];
    
    // Is it background?
    // Background is generally gray and bright. The shadows are dark. The car is dark.
    // Let's use a simple brightness gate:
    const brightness = (r + g + b) / 3;
    
    // If it's a dark color (like the car chassis, tires, or deep shadow), stop the fill!
    // 130 is roughly 50% gray.
    if (brightness < 120) {
      continue;
    }
    
    // If we reach here, it's background! Set to white!
    image.bitmap.data[i] = 255;
    image.bitmap.data[i+1] = 255;
    image.bitmap.data[i+2] = 255;
    
    // Add neighbors
    queue.push({x: x+1, y});
    queue.push({x: x-1, y});
    queue.push({x, y: y+1});
    queue.push({x, y: y-1});
  }

  // 2. Autocrop now that the background is perfectly #FFFFFF
  image.autocrop(false); 
  
  // 3. Add uniform border padding
  const paddedImage = new Jimp(image.bitmap.width + 120, image.bitmap.height + 80, '#FFFFFF');
  paddedImage.composite(image, 60, 40);
  
  await paddedImage.writeAsync(outPath);
  console.log('Saved perfect flood-fill crop:', outPath);
}

processCar().catch(console.error);
