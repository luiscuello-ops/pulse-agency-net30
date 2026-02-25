from PIL import Image

def remove_black_background(input_path, output_png_path, output_ico_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    
    newData = []
    # threshold for considering a pixel "black"
    threshold = 30
    for item in datas:
        # item is (R, G, B, A)
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_png_path, "PNG")
    
    # Save favicon
    img.thumbnail((256, 256))
    img.save(output_ico_path, "ICO")

remove_black_background("/Users/pulseagencyusa666/.gemini/antigravity/scratch/pulse-credit-portal/logo", "public/logo.png", "app/favicon.ico")
