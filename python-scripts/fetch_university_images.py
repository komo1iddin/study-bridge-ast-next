#!/usr/bin/env python3
import os
import re
import yaml
import requests
import argparse
from pathlib import Path
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
import frontmatter
import time
import random
from PIL import Image
from io import BytesIO

# Configuration
BASE_DIR = Path(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONTENT_DIR = BASE_DIR / "content" / "universities"
PUBLIC_DIR = BASE_DIR / "public" / "universities"
LANGUAGE_DIRS = ["en", "ru", "uz"]
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"

# Ensure public directory exists
PUBLIC_DIR.mkdir(exist_ok=True, parents=True)

def get_university_data():
    """Extract university data from markdown files"""
    universities = []
    
    for lang_dir in LANGUAGE_DIRS:
        lang_path = CONTENT_DIR / lang_dir
        if not lang_path.exists():
            continue
            
        for md_file in lang_path.glob("*.md"):
            # Skip temporary files or those with special characters
            if md_file.name.startswith(".") or md_file.name.startswith("~"):
                continue
                
            try:
                with open(md_file, "r", encoding="utf-8") as f:
                    post = frontmatter.load(f)
                    
                name = post.get("name", "")
                if not name:
                    print(f"Warning: No name found in {md_file}")
                    continue
                    
                image_path = post.get("image", "")
                city = post.get("city", "")
                    
                universities.append({
                    "name": name,
                    "file_path": md_file,
                    "current_image": image_path,
                    "city": city,
                    "lang": lang_dir
                })
            except Exception as e:
                print(f"Error processing {md_file}: {e}")
    
    return universities

def search_university_image_google(university_name, city=None):
    """Search for university campus/building image using Google"""
    location = f" {city}" if city else ""
    search_query = f"{university_name} university campus building{location} filetype:jpg"
    search_url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}&tbm=isch&tbs=isz:l"  # Use larger image size filter
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    try:
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Find image URLs
        # Modern Google image search often uses JSON data in the page
        # Try to extract the image URLs from the page's script content
        img_urls = []
        
        # First try to get from standard img tags
        for img in soup.find_all("img"):
            if "google" in img.get("src", ""):
                continue
            if img.get("src") and not img.get("src").startswith("data:"):
                src = img.get("src", "")
                if "icon" not in src.lower() and "logo" not in src.lower():
                    img_urls.append(src)
        
        # If that doesn't work well, try to extract from JSON in script tags
        if not img_urls or all(len(url) < 100 for url in img_urls):  # URLs too short are likely thumbnails
            for script in soup.find_all("script"):
                script_content = script.string
                if script_content and "AF_initDataCallback" in script_content:
                    urls = re.findall(r'(https://[^"\']+\.(?:jpg|jpeg|png))', script_content)
                    if urls:
                        # Filter out small thumbnails and Google assets
                        filtered_urls = [url for url in urls 
                                         if "google" not in url.lower() 
                                         and "icon" not in url.lower() 
                                         and "logo" not in url.lower()
                                         and "thumb" not in url.lower()]
                        img_urls.extend(filtered_urls)
        
        # Sort by URL length - longer URLs often contain more parameters and are higher quality
        # This is a heuristic that often works for Google Images
        img_urls.sort(key=len, reverse=True)
        
        # Return first good result
        for url in img_urls:
            if len(url) > 100:  # Likely a full image URL, not a thumbnail
                return url
                
        # Fall back to any result if available
        if img_urls:
            return img_urls[0]
            
        return None
    except Exception as e:
        print(f"Error searching for {university_name} image on Google: {e}")
        return None

def search_university_image_wikipedia(university_name):
    """Search for university image on Wikipedia"""
    search_query = f"{university_name} university"
    wiki_search_url = f"https://en.wikipedia.org/wiki/Special:Search?search={search_query.replace(' ', '+')}"
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    try:
        # Search Wikipedia
        response = requests.get(wiki_search_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Find first search result
        search_results = soup.select(".mw-search-result-heading a") or soup.select(".searchresult a")
        
        if not search_results:
            # Check if we're already on the university page (direct hit)
            title = soup.select_one("h1#firstHeading")
            if title and university_name.lower() in title.text.lower():
                wiki_url = wiki_search_url
            else:
                return None
        else:
            # Get first result URL
            first_result = search_results[0]
            wiki_url = urljoin("https://en.wikipedia.org", first_result["href"])
        
        # Visit the university page
        response = requests.get(wiki_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # First try to get an image from the main content
        content_images = []
        for img in soup.select(".mw-parser-output img"):
            if img.get("width") and img.get("height"):
                # Skip small images and logos
                width = int(img.get("width", 0))
                height = int(img.get("height", 0))
                src = img.get("src", "").lower()
                
                if (width > 200 and height > 150 and 
                    "logo" not in src and 
                    "icon" not in src and 
                    "seal" not in src):
                    content_images.append(img)
        
        if content_images:
            largest_img = max(content_images, key=lambda x: int(x.get("width", 0)) * int(x.get("height", 0)))
            if largest_img.get("src"):
                return urljoin("https:", largest_img["src"])
        
        # If no suitable images in content, try infobox images
        infobox = soup.select_one(".infobox")
        if infobox:
            for img in infobox.select("img"):
                if img.get("width") and img.get("height"):
                    # Skip small images and logos
                    width = int(img.get("width", 0))
                    height = int(img.get("height", 0))
                    src = img.get("src", "").lower()
                    
                    if (width > 200 and height > 150 and 
                        "logo" not in src and 
                        "icon" not in src and 
                        "seal" not in src):
                        return urljoin("https:", img["src"])
        
        return None
    except Exception as e:
        print(f"Error searching for {university_name} image on Wikipedia: {e}")
        return None

def search_university_image_unsplash(university_name, city=None):
    """Search for university image on Unsplash"""
    location = f" {city}" if city else ""
    search_query = f"{university_name} university campus{location}"
    search_url = f"https://unsplash.com/s/photos/{search_query.replace(' ', '-')}"
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    try:
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Find photo links on search results page
        photo_links = soup.select("a[itemprop='contentUrl']")
        if not photo_links:
            return None
            
        # Get the first photo's page URL
        photo_url = urljoin("https://unsplash.com", photo_links[0]['href'])
        
        # Visit the photo page to get the full-sized image
        response = requests.get(photo_url, headers=headers)
        response.raise_for_status()
        
        photo_soup = BeautifulSoup(response.text, "html.parser")
        
        # Look for the download link which has the full image URL
        download_button = photo_soup.select_one("a[title='Download photo']")
        if download_button and download_button.get('href'):
            return download_button['href']
            
        # Alternative: find the main image
        main_img = photo_soup.select_one("img[data-test='photo-grid-main-photo']")
        if main_img and main_img.get('src'):
            src = main_img.get('src')
            # Replace any size parameters to get the original size
            return re.sub(r'&w=\d+', '&w=1920', src)
        
        # Fallback: check for og:image meta tag
        og_image = photo_soup.select_one("meta[property='og:image']")
        if og_image and og_image.get('content'):
            return og_image['content']
            
        return None
    except Exception as e:
        print(f"Error searching for {university_name} image on Unsplash: {e}")
        return None

def download_image(url, university_name):
    """Download image from URL and save to public directory"""
    try:
        headers = {
            "User-Agent": USER_AGENT,
            "Referer": "https://www.google.com/"
        }
        
        response = requests.get(url, headers=headers, stream=True, timeout=30)
        response.raise_for_status()
        
        # Generate a filename from university name
        slug = university_name.lower().replace(" ", "-")
        # Remove special characters
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        
        # Determine file extension from content type or URL
        content_type = response.headers.get("content-type", "").lower()
        if "jpeg" in content_type or "jpg" in content_type:
            ext = "jpg"
        elif "png" in content_type:
            ext = "png"
        else:
            # Try to get extension from URL
            parsed_url = urlparse(url)
            path = parsed_url.path.lower()
            if path.endswith(".jpg") or path.endswith(".jpeg"):
                ext = "jpg"
            elif path.endswith(".png"):
                ext = "png"
            elif "jpg" in path or "jpeg" in path:
                ext = "jpg"
            else:
                # Default to JPG for campus images
                ext = "jpg"
        
        filename = f"{slug}.{ext}"
        filepath = PUBLIC_DIR / filename
        
        # Save the image to a temporary file first
        temp_filepath = PUBLIC_DIR / f"temp_{filename}"
        with open(temp_filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        # Validate and optimize the image
        try:
            img = Image.open(temp_filepath)
            
            # Check image quality
            width, height = img.size
            print(f"Image dimensions for {university_name}: {width}x{height}")
            
            if width < 500 or height < 350:
                print(f"Image for {university_name} is too small: {width}x{height}")
                os.remove(temp_filepath)
                return None
            
            # Convert PNG to JPG if needed (for consistency and smaller file size)
            if ext == "png" and img.mode != "P":  # Skip conversion for indexed PNGs
                ext = "jpg"
                filename = f"{slug}.{ext}"
                filepath = PUBLIC_DIR / filename
                img = img.convert('RGB')
                
            # Resize very large images while maintaining aspect ratio
            if width > 1920 or height > 1080:
                ratio = min(1920 / width, 1080 / height)
                new_size = (int(width * ratio), int(height * ratio))
                img = img.resize(new_size, Image.LANCZOS)
            
            # Optimize and save to final location
            if ext == "jpg":
                img.save(filepath, format="JPEG", quality=85, optimize=True)
            else:
                img.save(filepath, optimize=True)
            
            # Clean up temp file
            os.remove(temp_filepath)
            
            print(f"Downloaded image for {university_name} to {filename}")
            return f"/universities/{filename}"
        except Exception as e:
            print(f"Downloaded file is not a valid image: {e}")
            if temp_filepath.exists():
                os.remove(temp_filepath)
            return None
            
    except Exception as e:
        print(f"Error downloading image for {university_name}: {e}")
        return None

def update_markdown_file(file_path, image_path):
    """Update the image path in the markdown file"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            post = frontmatter.load(f)
        
        # Update the image path
        post["image"] = image_path
        
        # Write the updated content back to file
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(frontmatter.dumps(post))
            
        print(f"Updated {file_path} with image path: {image_path}")
        return True
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def search_direct_photo_apis(university_name, city=None):
    """Search for university images using direct photo APIs (Pexels, Pixabay, etc.)"""
    # Use city information to improve search
    location = f" {city}" if city else ""
    
    # Try Pexels API (doesn't require authentication for basic searches)
    pexels_url = f"https://www.pexels.com/search/{university_name.replace(' ', '%20')}%20university%20campus{location.replace(' ', '%20')}/"
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    try:
        response = requests.get(pexels_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Find image elements
        img_elements = soup.select("article a img")
        img_urls = []
        
        for img in img_elements:
            src = img.get("src", "")
            data_src = img.get("data-src", "")
            if src and "pexels" in src:
                # Try to get the highest quality version
                src = re.sub(r'/\w+/\d+/pexels-', '/photos/', src)
                img_urls.append(src)
            elif data_src and "pexels" in data_src:
                # Try to get the highest quality version
                data_src = re.sub(r'/\w+/\d+/pexels-', '/photos/', data_src)
                img_urls.append(data_src)
        
        if img_urls:
            return img_urls[0]
        
        # Could add more photo APIs here if needed
        
        return None
    except Exception as e:
        print(f"Error searching direct photo APIs for {university_name}: {e}")
        return None

def search_last_resort(university_name, city=None):
    """Last resort for finding any usable image when other methods fail"""
    location = f" {city}" if city else ""
    
    # Try a more general search
    search_query = f"{university_name} university{location}"
    search_url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}"
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    try:
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Look for any image in the knowledge panel
        knowledge_panel = soup.select_one(".kp-header")
        if knowledge_panel:
            img = knowledge_panel.select_one("img")
            if img and img.get("src"):
                return img.get("src")
        
        # Look for images in the search results
        for img in soup.select("img"):
            src = img.get("src", "")
            if src and not src.startswith("data:") and len(src) > 100:
                if "icon" not in src.lower() and "logo" not in src.lower():
                    return src
        
        return None
    except Exception as e:
        print(f"Error in last resort search for {university_name}: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description="Fetch university images and update markdown files")
    parser.add_argument("--force", action="store_true", help="Force update even if image already exists")
    parser.add_argument("--method", choices=["google", "wikipedia", "unsplash", "pexels", "all"], default="all", 
                        help="Method to use for fetching images")
    parser.add_argument("--university", type=str, help="Process only the specified university")
    parser.add_argument("--min-width", type=int, default=500, help="Minimum image width")
    parser.add_argument("--min-height", type=int, default=350, help="Minimum image height")
    parser.add_argument("--retry-failures", action="store_true", help="Try harder to find images for universities that failed")
    args = parser.parse_args()
    
    # Get university data
    universities = get_university_data()
    print(f"Found {len(universities)} universities")
    
    # Filter by university name if specified
    if args.university:
        universities = [uni for uni in universities if args.university.lower() in uni["name"].lower()]
        print(f"Filtered to {len(universities)} universities matching '{args.university}'")
    
    # Keep track of failures for retry
    failed_universities = []
    
    for uni in universities:
        name = uni["name"]
        file_path = uni["file_path"]
        current_image = uni["current_image"]
        city = uni["city"]
        
        # Skip if already has an image and the file exists and not force mode
        if not args.force and current_image and (PUBLIC_DIR.parent / current_image.lstrip("/")).exists():
            print(f"Skipping {name} - already has image at {current_image}")
            continue
            
        print(f"Processing {name}...")
        
        image_url = None
        # Try different methods based on user preference
        if args.method in ["all", "unsplash"]:
            image_url = search_university_image_unsplash(name, city)
            if image_url:
                print(f"Found image via Unsplash for {name}")
                
        if not image_url and args.method in ["all", "pexels"]:
            image_url = search_direct_photo_apis(name, city)
            if image_url:
                print(f"Found image via Pexels for {name}")
                
        if not image_url and args.method in ["all", "wikipedia"]:
            image_url = search_university_image_wikipedia(name)
            if image_url:
                print(f"Found image via Wikipedia for {name}")
                
        if not image_url and args.method in ["all", "google"]:
            image_url = search_university_image_google(name, city)
            if image_url:
                print(f"Found image via Google for {name}")
                
        if not image_url:
            print(f"No image found for {name} using the specified method(s)")
            failed_universities.append(uni)
            continue
            
        # Download image
        image_path = download_image(image_url, name)
        if not image_path:
            print(f"Failed to download image for {name}")
            failed_universities.append(uni)
            continue
            
        # Update markdown file
        success = update_markdown_file(file_path, image_path)
        if not success:
            print(f"Failed to update markdown for {name}")
            
        # Sleep to avoid overloading servers
        time.sleep(random.uniform(2.0, 4.0))
    
    # Try last resort method for failures if requested
    if args.retry_failures and failed_universities:
        print(f"\nRetrying {len(failed_universities)} failed universities with last resort method...")
        
        for uni in failed_universities:
            name = uni["name"]
            file_path = uni["file_path"]
            city = uni["city"]
            
            print(f"Last resort search for {name}...")
            
            # Try last resort method
            image_url = search_last_resort(name, city)
            if not image_url:
                print(f"Still could not find image for {name}")
                continue
                
            print(f"Found potential image for {name}")
            
            # Download image
            image_path = download_image(image_url, name)
            if not image_path:
                print(f"Failed to download last resort image for {name}")
                continue
                
            # Update markdown file
            success = update_markdown_file(file_path, image_path)
            if not success:
                print(f"Failed to update markdown for {name}")
                
            # Sleep to avoid overloading servers
            time.sleep(random.uniform(2.0, 4.0))

if __name__ == "__main__":
    main() 