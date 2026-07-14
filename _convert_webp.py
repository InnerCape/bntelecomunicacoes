from pathlib import Path

from PIL import Image


def main() -> None:
	root = Path(r"C:\Users\Manuel\OneDrive - IS Kidz Africa\bntelecomunicacoes\imagens")
	converted = 0
	saved_bytes = 0

	for img_path in root.iterdir():
		if img_path.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
			continue
		if img_path.stat().st_size < 120 * 1024:
			continue

		out_path = img_path.with_suffix(".webp")

		try:
			img = Image.open(img_path)
			if img.mode in {"RGBA", "LA", "P"}:
				img = img.convert("RGBA")
			else:
				img = img.convert("RGB")

			img.save(out_path, "WEBP", quality=82, method=6)
			converted += 1
			saved_bytes += max(0, img_path.stat().st_size - out_path.stat().st_size)
		except Exception as exc:
			print(f"FAIL {img_path.name}: {exc}")

	print(f"CONVERTED {converted}")
	print(f"SAVED_KB {round(saved_bytes / 1024, 1)}")


if __name__ == "__main__":
	main()
