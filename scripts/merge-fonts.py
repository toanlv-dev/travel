"""Gộp các file font đã cắt thành một woff2 (latin + vietnamese chung một request).

Font biến thiên (Lora) không gộp được → cố định trục wght về 400 trước khi gộp;
trang chỉ dùng Lora italic ở một độ đậm.
"""
import sys
from fontTools.merge import Merger
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

out, *parts = sys.argv[1:]

fixed = []
for i, p in enumerate(parts):
    f = TTFont(p)
    if "fvar" in f:
        f = instantiateVariableFont(f, {"wght": 400}, updateFontNames=False)
        p = p + ".static.ttf"
        f.save(p)
    fixed.append(p)

font = TTFont(fixed[0]) if len(fixed) == 1 else Merger().merge(fixed)
font.flavor = "woff2"
font.save(out)
