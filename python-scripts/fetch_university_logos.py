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
                    
                logo_path = post.get("logo", "")
                    
                universities.append({
                    "name": name,
                    "file_path": md_file,
                    "current_logo": logo_path,
                    "lang": lang_dir
                })
            except Exception as e:
                print(f"Error processing {md_file}: {e}")
    
    return universities

def search_university_logo_google(university_name):
    """Search for university logo using Google"""
    search_query = f"{university_name} university logo filetype:png OR filetype:jpg"
    search_url = f"https://www.google.com/search?q={search_query.replace(' ', '+')}&tbm=isch"
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    try:
        response = requests.get(search_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Find image URLs
        img_tags = soup.find_all("img")
        img_urls = []
        
        for img in img_tags:
            # Skip Google's own images
            if "google" in img.get("src", ""):
                continue
            if img.get("src") and not img.get("src").startswith("data:"):
                img_urls.append(img.get("src"))
        
        # Return first result if any
        if img_urls:
            return img_urls[0]
        return None
    except Exception as e:
        print(f"Error searching for {university_name} logo on Google: {e}")
        return None

def search_university_logo_wikipedia(university_name):
    """Search for university logo on Wikipedia"""
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
        
        # Look for logo in infobox
        infobox = soup.select_one(".infobox")
        if infobox:
            logo_img = infobox.select_one("img")
            if logo_img and logo_img.get("src"):
                return urljoin("https:", logo_img["src"])
        
        return None
    except Exception as e:
        print(f"Error searching for {university_name} logo on Wikipedia: {e}")
        return None

def search_university_logo_direct(university_name):
    """Search for university logo by directly visiting the university website"""
    # This is a simplified approach and might not work for all universities
    # A more sophisticated version would use a search engine to first find the official website
    
    # Try to construct a likely domain name
    name_parts = university_name.lower().replace("university", "").replace("of", "").strip().split()
    possible_domains = []
    
    # Try different domain patterns
    if len(name_parts) > 1:
        possible_domains.append(f"www.{name_parts[0][0]}{name_parts[1][0]}u.edu")  # Like www.psu.edu
        possible_domains.append(f"www.{'-'.join(name_parts)}.edu")  # Like www.penn-state.edu
    
    possible_domains.append(f"www.{name_parts[0]}.edu")  # Like www.harvard.edu
    possible_domains.append(f"www.{name_parts[0]}.ac.cn")  # For Chinese universities
    possible_domains.append(f"www.{name_parts[0]}.edu.cn")  # Another format for Chinese universities
    
    headers = {
        "User-Agent": USER_AGENT
    }
    
    for domain in possible_domains:
        try:
            url = f"https://{domain}"
            response = requests.get(url, headers=headers, timeout=5)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                
                # Look for logo - this is simplistic and depends on common patterns
                # Many universities have their logo in a header with specific classes or IDs
                potential_logos = []
                
                # Look in common logo locations
                for selector in [".logo img", "#logo img", ".header img", "#header img", ".brand img"]:
                    logos = soup.select(selector)
                    potential_logos.extend(logos)
                
                # If nothing found, try all images in the top portion of the page
                if not potential_logos:
                    all_imgs = soup.select("img")
                    # Filter for images that might be logos (usually not too large, not too small)
                    for img in all_imgs:
                        # Look for keywords in alt text or src
                        alt = img.get("alt", "").lower()
                        src = img.get("src", "").lower()
                        if "logo" in alt or "logo" in src or university_name.lower() in alt:
                            potential_logos.append(img)
                
                for img in potential_logos:
                    if img.get("src"):
                        img_url = urljoin(url, img["src"])
                        return img_url
            
        except Exception as e:
            print(f"Error accessing {domain}: {e}")
            continue
    
    return None

def download_image(url, university_name):
    """Download image from URL and save to public directory"""
    try:
        headers = {
            "User-Agent": USER_AGENT,
            "Referer": "https://www.google.com/"
        }
        
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()
        
        # Generate a filename from university name
        slug = university_name.lower().replace(" ", "-")
        # Remove special characters
        slug = re.sub(r'[^a-z0-9-]', '', slug)
        
        # Determine file extension from content type or URL
        content_type = response.headers.get("content-type", "").lower()
        if "png" in content_type:
            ext = "png"
        elif "jpeg" in content_type or "jpg" in content_type:
            ext = "jpg"
        else:
            # Try to get extension from URL
            parsed_url = urlparse(url)
            path = parsed_url.path.lower()
            if path.endswith(".png"):
                ext = "png"
            elif path.endswith(".jpg") or path.endswith(".jpeg"):
                ext = "jpg"
            else:
                # Default to PNG
                ext = "png"
        
        filename = f"{slug}-logo.{ext}"
        filepath = PUBLIC_DIR / filename
        
        # Save the image
        with open(filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        # Validate the image and resize if needed
        try:
            img = Image.open(filepath)
            
            # Check if image needs resizing
            if max(img.size) > 500:
                # Calculate new dimensions while maintaining aspect ratio
                ratio = min(500 / img.size[0], 500 / img.size[1])
                new_size = (int(img.size[0] * ratio), int(img.size[1] * ratio))
                img = img.resize(new_size, Image.LANCZOS)
                img.save(filepath)
            
            print(f"Downloaded logo for {university_name} to {filename}")
            return f"/universities/{filename}"
        except Exception as e:
            print(f"Downloaded file is not a valid image: {e}")
            if filepath.exists():
                os.remove(filepath)
            return None
            
    except Exception as e:
        print(f"Error downloading logo for {university_name}: {e}")
        return None

def update_markdown_file(file_path, logo_path):
    """Update the logo path in the markdown file"""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            post = frontmatter.load(f)
        
        # Update the logo path
        post["logo"] = logo_path
        
        # Write the updated content back to file
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(frontmatter.dumps(post))
            
        print(f"Updated {file_path} with logo path: {logo_path}")
        return True
    except Exception as e:
        print(f"Error updating {file_path}: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="Fetch university logos and update markdown files")
    parser.add_argument("--force", action="store_true", help="Force update even if logo already exists")
    parser.add_argument("--method", choices=["google", "wikipedia", "direct", "all"], default="all", 
                        help="Method to use for fetching logos")
    parser.add_argument("--university", type=str, help="Process only the specified university")
    args = parser.parse_args()
    
    # Get university data
    universities = get_university_data()
    print(f"Found {len(universities)} universities")
    
    # Filter by university name if specified
    if args.university:
        universities = [uni for uni in universities if args.university.lower() in uni["name"].lower()]
        print(f"Filtered to {len(universities)} universities matching '{args.university}'")
    
    for uni in universities:
        name = uni["name"]
        file_path = uni["file_path"]
        current_logo = uni["current_logo"]
        
        # Skip if already has a logo and the file exists and not force mode
        if not args.force and current_logo and (PUBLIC_DIR.parent / current_logo.lstrip("/")).exists():
            print(f"Skipping {name} - already has logo at {current_logo}")
            continue
            
        print(f"Processing {name}...")
        
        logo_url = None
        # Try different methods based on user preference
        if args.method in ["all", "google"]:
            logo_url = search_university_logo_google(name)
            if logo_url:
                print(f"Found logo via Google for {name}")
                
        if not logo_url and args.method in ["all", "wikipedia"]:
            logo_url = search_university_logo_wikipedia(name)
            if logo_url:
                print(f"Found logo via Wikipedia for {name}")
                
        if not logo_url and args.method in ["all", "direct"]:
            logo_url = search_university_logo_direct(name)
            if logo_url:
                print(f"Found logo via direct website access for {name}")
                
        if not logo_url:
            print(f"No logo found for {name} using the specified method(s)")
            continue
            
        # Download logo
        logo_path = download_image(logo_url, name)
        if not logo_path:
            print(f"Failed to download logo for {name}")
            continue
            
        # Update markdown file
        success = update_markdown_file(file_path, logo_path)
        if not success:
            print(f"Failed to update markdown for {name}")
            
        # Sleep to avoid overloading servers
        time.sleep(random.uniform(1.0, 3.0))

if __name__ == "__main__":
    main() 