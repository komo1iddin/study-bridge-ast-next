# University Media Utilities

This repository contains scripts for automatically fetching university media assets and updating the corresponding markdown files with the correct paths.

## Available Scripts

### 1. University Logo Fetcher (`fetch_university_logos.py`)

This script automatically fetches university logos from various sources and updates markdown files with the correct logo paths.

#### Features

- Fetches university logos from multiple sources:
  - Google image search
  - Wikipedia
  - Direct university website access
- Automatically resizes logos to appropriate dimensions
- Updates markdown files with the correct logo paths
- Skips universities that already have logos
- Provides flexible command-line options

#### Usage

Basic usage:

```bash
python fetch_university_logos.py
```

Available options:

```
--force          Force update even if logo already exists
--method METHOD  Method to use for fetching logos (google, wikipedia, direct, or all)
--university UNI Process only universities matching the specified name
```

### 2. University Image Fetcher (`fetch_university_images.py`)

This script automatically fetches high-quality campus/building images for universities and updates the corresponding markdown files.

#### Features

- Fetches university campus images from multiple sources:
  - Unsplash (high-quality free images)
  - Pexels (professional stock photos)
  - Wikipedia
  - Google image search (with enhanced resolution filters)
- Automatically optimizes and resizes images
- Ensures minimum quality standards (resolution)
- Updates markdown files with the correct image paths
- Incorporates city information for better search results
- Can retry failed downloads with a last-resort method

#### Usage

Basic usage:

```bash
python fetch_university_images.py
```

Available options:

```
--force          Force update even if image already exists
--method METHOD  Method to use for fetching images (google, wikipedia, unsplash, pexels, or all)
--university UNI Process only universities matching the specified name
--min-width N    Minimum acceptable image width (default: 500px)
--min-height N   Minimum acceptable image height (default: 350px)
--retry-failures Try harder to find images for universities that failed with main methods
```

## Requirements

Both scripts share the same dependencies. Install them with:

```bash
pip install -r requirements.txt
```

## How It Works

1. The scripts read all markdown files in the `content/universities/{lang}/` directories
2. For each university without the required media (or with `--force`), they attempt to find appropriate images from the specified sources
3. When media is found, it's downloaded, processed (resized, optimized), and saved to `public/universities/`
4. The scripts then update the markdown file's frontmatter to include the path to the new media

## Examples

### Logo Fetcher

1. Update all universities without existing logos:
   ```bash
   python fetch_university_logos.py
   ```

2. Force update for all universities, even those with existing logos:
   ```bash
   python fetch_university_logos.py --force
   ```

3. Process only Fudan University:
   ```bash
   python fetch_university_logos.py --university "Fudan"
   ```

4. Only use Wikipedia as a source:
   ```bash
   python fetch_university_logos.py --method wikipedia
   ```

### Image Fetcher

1. Update all universities without existing images:
   ```bash
   python fetch_university_images.py
   ```

2. Force update university images with stricter quality requirements:
   ```bash
   python fetch_university_images.py --force --min-width 1200 --min-height 800
   ```

3. Use only Unsplash for high-quality images:
   ```bash
   python fetch_university_images.py --method unsplash
   ```

4. Try all methods and also make extra attempts for failures:
   ```bash
   python fetch_university_images.py --retry-failures
   ```

## Tips and Notes

- The scripts use delays between requests to avoid overloading servers
- Images are optimized for web use (compression, size constraints)
- Logos and campus images use different filename patterns for easy identification
- For Chinese universities, the scripts are optimized to handle both English and Chinese university names 