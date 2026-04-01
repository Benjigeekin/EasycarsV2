import sys
import numpy as np
from PIL import Image

def process(input_path, output_path):
    print(f"Loading image from {input_path}...")
    img = Image.open(input_path).convert('RGB')
    data = np.array(img).astype(float)
    
    # 1. White-level adjustment (bleach the background to #FFFFFF)
    threshold = 237 
    data = data * (255.0 / threshold)
    data = np.clip(data, 0, 255).astype(np.uint8)
    img_level = Image.fromarray(data)

    # 2. Auto-crop: find where pixels are NOT white (e.g. < 250)
    bg_mask = np.any(data < 250, axis=-1)
    
    rows = np.any(bg_mask, axis=1)
    cols = np.any(bg_mask, axis=0)
    
    if rows.sum() == 0 or cols.sum() == 0:
        ymin, ymax = 0, data.shape[0]
        xmin, xmax = 0, data.shape[1]
    else:
        ymin, ymax = np.where(rows)[0][[0, -1]]
        xmin, xmax = np.where(cols)[0][[0, -1]]
        
    # Add a decent cushion of padding
    pad_y = 40
    pad_x = 40
    ymin = max(0, ymin - pad_y)
    ymax = min(data.shape[0], ymax + pad_y)
    xmin = max(0, xmin - pad_x)
    xmax = min(data.shape[1], xmax + pad_x)
    
    img_cropped = img_level.crop((xmin, ymin, xmax, ymax))
    
    # Render onto #FFFFFF canvas to guarantee background transparency matching
    width, height = img_cropped.size
    final = Image.new("RGB", (width, height), (255, 255, 255))
    final.paste(img_cropped)
    
    final.save(output_path, "JPEG", quality=95)
    print(f"Successfully saved to {output_path}")

if __name__ == "__main__":
    process(sys.argv[1], sys.argv[2])
