#!/usr/bin/env python3
"""Folha de sprites dos desenhos em canvas da home (src/game/atlas.ts).

Tudo sai dos arquivos REAIS do cliente oficial (bombcrypto-client-v2), do jeito
que o Treasure Hunt V2 ("Amazon") desenha o mapa:

  - chão / pedra / bloco comum: Textures/TileMaps/Amazon/tileset{1,2,3}.png,
    nos ids do MapHelper.ConvertTileTypeToID (chão 8|11, pedra 9|12 sorteados,
    bloco 19), um conjunto por tema (grama, terra, areia);
  - moldura do mapa: Textures/TileMaps/borderBG/Amazon/BorderBG{1,2,3};
  - baús e a quebra deles: Textures/Others/Bricks/Amazon/<tipo>/brick_0..7
    (e Normal/map{0,1,2} para o bloco comum de cada tema);
  - bomba: Textures/Fire/bom_0..2 (BombFrame.anim);
  - fogo: Textures/Fire/fire{1,2,3}_0..3 (centro, meio, ponta);
  - brilho de raridade atrás do herói: Scenes/TreasureModeScene/Textures/Pack/
    RarityBacklights/<Raridade>.png (as 10, de Common a Super Mystic);
  - heróis: Data/CharactersSprites/<Herói>/<Cor>/{Front,Back,Right}/*_0N.png
    (Common = cor White; Rare..Super Legend = Skin/<Raridade>).

As moedas (BCOIN e SEN) são as do próprio site (src/assests/images).

Uso:
  python3 scripts/build-map-atlas.py <caminho do bombcrypto-client-v2>

Saída: src/assests/game/treasure-atlas.webp (sem perda) + treasure-atlas.json
  { "w", "h", "frames": { chave: [x, y, w, h] } }
"""
import json
import os
import sys

from PIL import Image

PAD = 1
ATLAS_W = 1024

# Heróis da vitrine: pasta do cliente → nome curto.
HEROES = {
    "BomberMan": "frog",
    "Knight": "knight",
    "Ninja": "ninja",
    "Witch": "witch",
    "Pepe": "pepe",
    "Doge": "doge",
    "Vampire": "vampire",
    "King": "king",
    "Man": "cowboy",
}
RARITIES = {
    "common": "White",
    "rare": "Skin/Rare",
    "superrare": "Skin/SuperRare",
    "epic": "Skin/Epic",
    "legend": "Skin/Legend",
    "superlegend": "Skin/SuperLegend",
}
# Direção → (pasta, prefixo dos quadros) no CharactersSprites.
HERO_DIRS = {"front": ("Front", "player_front"), "back": ("Back", "player_back"), "right": ("Right", "player")}
# Brilho por raridade (AnimationResource.BACKLIGHT_IMAGES_RARE).
GLOWS = {
    "common": "Common",
    "rare": "Rare",
    "superrare": "SuperRare",
    "epic": "Epic",
    "legend": "Legend",
    "superlegend": "SuperLegend",
    "mega": "Mega",
    "supermega": "SuperMega",
    "mystic": "Mystic",
    "supermystic": "SuperMystic",
}
CHESTS = {
    "jail": "jailHouse",
    "wooden": "woodenChest",
    "silver": "silverChest",
    "gold": "goldenChest",
    "diamond": "diamondChest",
    "legend": "legendChest",
    "key": "keyChest",
}
# ids do tileset (8 colunas de 16 px) — MapHelper.ConvertTileTypeToID
TILE_IDS = {"floor_a": 8, "floor_b": 11, "wall_a": 9, "wall_b": 12, "brick": 19}


def tile(img, tid):
    x, y = (tid % 8) * 16, (tid // 8) * 16
    return img.crop((x, y, x + 16, y + 16))


def load(path):
    return Image.open(path).convert("RGBA")


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    assets = os.path.join(sys.argv[1], "Assets")
    tex = os.path.join(assets, "Textures")
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out_dir = os.path.join(root, "src", "assests", "game")

    parts = []  # (chave, imagem)

    for t in range(3):
        ts = load(os.path.join(tex, "TileMaps", "Amazon", f"tileset{t + 1}.png"))
        for name, tid in TILE_IDS.items():
            parts.append((f"t{t}_{name}", tile(ts, tid)))
        bdir = os.path.join(tex, "TileMaps", "borderBG", "Amazon", f"BorderBG{t + 1}")
        for side in ("top", "bottom", "left", "right"):
            parts.append((f"t{t}_border_{side}", load(os.path.join(bdir, f"boderBG{t + 1}_{side}.png"))))
        for n in range(8):
            parts.append((f"t{t}_break_{n}", load(os.path.join(tex, "Others", "Bricks", "Amazon", "Normal", f"map{t}", f"brick_0{n}.png"))))

    for key, folder in CHESTS.items():
        for n in range(8):
            parts.append((f"chest_{key}_{n}", load(os.path.join(tex, "Others", "Bricks", "Amazon", folder, f"brick_0{n}.png"))))

    for n in range(3):
        parts.append((f"bomb_{n}", load(os.path.join(tex, "Fire", f"bom_0{n}.png"))))
    for src, name in (("fire1", "center"), ("fire2", "middle"), ("fire3", "end")):
        for n in range(4):
            parts.append((f"{name}_{n}", load(os.path.join(tex, "Fire", f"{src}_0{n}.png"))))

    sprites = os.path.join(assets, "Data", "CharactersSprites")
    for folder, short in HEROES.items():
        for rar, color in RARITIES.items():
            for d, (sub, prefix) in HERO_DIRS.items():
                for n in range(3):
                    p = os.path.join(sprites, folder, color, sub, f"{prefix}_{n:02d}.png")
                    if not os.path.exists(p):
                        raise SystemExit(f"faltou {p}")
                    parts.append((f"h_{short}_{rar}_{d}_{n}", load(p)))

    glow_dir = os.path.join(assets, "Scenes", "TreasureModeScene", "Textures", "Pack", "RarityBacklights")
    for key, name in GLOWS.items():
        parts.append((f"glow_{key}", load(os.path.join(glow_dir, f"{name}.png"))))

    for coin, file in (("bcoin", "bcoin_token.png"), ("sen", "sen_token.png")):
        parts.append((coin, load(os.path.join(root, "src", "assests", "images", file))))

    # empacota em prateleiras, maiores primeiro
    parts.sort(key=lambda p: (-p[1].height, -p[1].width))
    frames, x, y, shelf = {}, 0, 0, 0
    for key, img in parts:
        if x + img.width > ATLAS_W:
            x, y, shelf = 0, y + shelf + PAD, 0
        frames[key] = [x, y, img.width, img.height]
        x += img.width + PAD
        shelf = max(shelf, img.height)
    height = y + shelf
    atlas = Image.new("RGBA", (ATLAS_W, height), (0, 0, 0, 0))
    for key, img in parts:
        fx, fy, _, _ = frames[key]
        atlas.paste(img, (fx, fy))

    os.makedirs(out_dir, exist_ok=True)
    atlas.save(os.path.join(out_dir, "treasure-atlas.webp"), "WEBP", lossless=True, method=6)
    with open(os.path.join(out_dir, "treasure-atlas.json"), "w") as f:
        json.dump({"w": ATLAS_W, "h": height, "frames": frames}, f, separators=(",", ":"))
    print(f"{len(frames)} quadros, {ATLAS_W}x{height}")


if __name__ == "__main__":
    main()
