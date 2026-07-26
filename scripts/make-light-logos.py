"""Make header-friendly logos: punch out near-black, optionally darken near-white."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "images" / "logos"


def punch_black(im: Image.Image, threshold: int = 40) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if r <= threshold and g <= threshold and b <= threshold:
                px[x, y] = (r, g, b, 0)
    return im


def white_to_dark(
    im: Image.Image,
    white_min: int = 200,
    dark: tuple[int, int, int] = (15, 23, 42),
) -> Image.Image:
    """Convert near-white pixels to dark navy (keep blues)."""
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 8:
                continue
            # near-white / light gray text
            if r >= white_min and g >= white_min and b >= white_min:
                px[x, y] = (*dark, a)
            # soft antialias near white → blend toward dark
            elif min(r, g, b) >= 140 and max(r, g, b) - min(r, g, b) < 30:
                t = (r + g + b) / (3 * 255)
                px[x, y] = (
                    int(dark[0] * t + r * (1 - t)),
                    int(dark[1] * t + g * (1 - t)),
                    int(dark[2] * t + b * (1 - t)),
                    a,
                )
    return im


def main() -> None:
    # Symbol + Daikin: transparent black works on light and dark surfaces
    for name in ("logo-symbol.png", "logo-daikin.png"):
        src = ROOT / name
        out = punch_black(Image.open(src))
        out.save(src)
        print(f"updated {name}")

    # Wordmark light variant for white header
    word = punch_black(Image.open(ROOT / "logo-vrcorporation.png"))
    word = white_to_dark(word)
    light = ROOT / "logo-vrcorporation-light.png"
    word.save(light)
    print(f"wrote {light.name}")


if __name__ == "__main__":
    main()
