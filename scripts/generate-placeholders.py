"""Generiše privremene slike (bez pravih fotografija). Pokretanje: python3 scripts/generate-placeholders.py <folder-sa-fontovima>"""
import math, random, sys, os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

FONTS = sys.argv[1]
serif = lambda s: ImageFont.truetype(os.path.join(FONTS, "Fraunces.ttf"), s)
sans = lambda s: ImageFont.truetype(os.path.join(FONTS, "Manrope.ttf"), s)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def warm(w, h, c1, c2, seed, arches=True):
    random.seed(seed)
    img = Image.new("RGB", (w, h))
    d = ImageDraw.Draw(img)
    for y in range(h):
        d.line([(0, y), (w, y)], fill=lerp(c1, c2, y / h))
    glow = Image.new("RGB", (w, h), (0, 0, 0))
    g = ImageDraw.Draw(glow)
    for _ in range(7):
        r = random.randint(int(h * .2), int(h * .6))
        x, y = random.randint(0, w), random.randint(0, h)
        g.ellipse([x - r, y - r, x + r, y + r], fill=(random.randint(40, 70),) * 3)
    glow = glow.filter(ImageFilter.GaussianBlur(h // 6))
    img = Image.blend(img, Image.eval(Image.merge("RGB", [glow.split()[0]] * 3), lambda v: v), 0).copy()
    base = img.load()
    gp = glow.load()
    for y in range(0, h):
        for x in range(0, w):
            r, gg, b = base[x, y]
            k = gp[x, y][0]
            base[x, y] = (min(255, r + k), min(255, gg + int(k * .85)), min(255, b + int(k * .6)))
    if arches:
        ov = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        o = ImageDraw.Draw(ov)
        n = 4
        aw = w / (n * 1.6)
        for i in range(n):
            x0 = w * .12 + i * aw * 1.55
            o.rounded_rectangle([x0, h * .28, x0 + aw, h * 1.1], radius=int(aw / 2), outline=(255, 255, 255, 60), width=max(2, w // 400))
        img = Image.alpha_composite(img.convert("RGBA"), ov).convert("RGB")
    return img

def label(img, text):
    d = ImageDraw.Draw(img)
    f = sans(max(16, img.width // 45))
    tw = d.textlength(text, font=f)
    pad = img.width // 60
    x, y = img.width - tw - pad * 3, img.height - f.size - pad * 3
    d.rounded_rectangle([x - pad, y - pad // 1.5, x + tw + pad, y + f.size + pad], radius=f.size, fill=(255, 255, 255))
    d.text((x, y - 2), text, font=f, fill=(110, 80, 50))
    return img

PALS = [((214, 186, 152), (138, 100, 64)), ((235, 214, 190), (166, 128, 92)), ((200, 168, 130), (110, 82, 58)), ((228, 205, 178), (150, 112, 78)), ((240, 225, 205), (188, 150, 110))]

def vendor(slug, n):
    out = f"public/vendors/{slug}"
    os.makedirs(out, exist_ok=True)
    for i in range(n):
        c1, c2 = PALS[(i + len(slug)) % len(PALS)]
        img = warm(800, 600, c1, c2, seed=f"{slug}{i}", arches=i % 2 == 0)
        label(img, "Primer fotografije").save(f"{out}/{i + 1}.jpg", quality=82, optimize=True)

vendor("sala-primer", 5)
vendor("demo-sala-lipa", 5)

hero = warm(1200, 600, (226, 200, 168), (120, 88, 58), seed="hero")
hero = hero.resize((2400, 1200), Image.LANCZOS)
hero.save("public/hero.jpg", quality=80, optimize=True)

# Open Graph slika (1200x630)
og = warm(600, 315, (236, 218, 196), (160, 120, 84), seed="og", arches=False).resize((1200, 630), Image.LANCZOS)
ov = Image.new("RGBA", og.size, (38, 30, 24, 120))
og = Image.alpha_composite(og.convert("RGBA"), ov).convert("RGB")
d = ImageDraw.Draw(og)
site = sys.argv[2] if len(sys.argv) > 2 else "Svadbeni vodič"
d.text((80, 120), site.upper(), font=sans(30), fill=(245, 235, 222))
d.text((80, 190), "Sve za venčanje", font=serif(88), fill=(255, 255, 255))
d.text((80, 295), "na jednom mestu", font=serif(88), fill=(255, 255, 255))
d.text((80, 450), "Sale, muzika, fotografi i ostalo · Beograd i Novi Sad", font=sans(32), fill=(245, 235, 222))
og.save("app/opengraph-image.jpg", quality=85, optimize=True)
print("ok")
