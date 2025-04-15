import yaml
import re
import os
import time
import requests
from bs4 import BeautifulSoup

# Dictionary of university names to their Wikipedia URLs
UNIVERSITY_WIKI_URLS = {
    "fudan-university": "https://en.wikipedia.org/wiki/Fudan_University",
    "peking-university": "https://en.wikipedia.org/wiki/Peking_University",
    "tsinghua-university": "https://en.wikipedia.org/wiki/Tsinghua_University",
    "zhejiang-university": "https://en.wikipedia.org/wiki/Zhejiang_University",
    "shanghai-jiao-tong-university": "https://en.wikipedia.org/wiki/Shanghai_Jiao_Tong_University",
    "nanjing-university": "https://en.wikipedia.org/wiki/Nanjing_University",
    "tongji-university": "https://en.wikipedia.org/wiki/Tongji_University",
    "wuhan-university": "https://en.wikipedia.org/wiki/Wuhan_University",
    "shanghai-university": "https://en.wikipedia.org/wiki/Shanghai_University",
    "beijing-normal-university": "https://en.wikipedia.org/wiki/Beijing_Normal_University",
    "ustc": "https://en.wikipedia.org/wiki/University_of_Science_and_Technology_of_China",
}

# Default faculties for universities where we can't extract from Wikipedia
DEFAULT_FACULTIES = {
    "fudan-university": [
        "School of Philosophy", "School of Economics", "School of Management", 
        "School of Law", "School of Social Development and Public Policy",
        "School of International Relations & Public Affairs", "School of Journalism",
        "School of Arts and Humanities", "School of Foreign Languages and Literature",
        "School of Life Sciences", "School of Information Science and Engineering",
        "School of Computer Science", "School of Software", "School of Microelectronics",
        "School of Physics", "School of Chemistry", "School of Mathematics",
        "Shanghai Medical College", "School of Pharmacy", "School of Nursing",
        "School of Public Health", "College of Foreign Languages and Literatures"
    ],
    "shanghai-jiao-tong-university": [
        "School of Medicine", 
        "School of Electronic, Information and Electrical Engineering",
        "School of Mechanical Engineering",
        "School of Naval Architecture, Ocean and Civil Engineering",
        "School of Chemistry and Chemical Engineering",
        "School of Materials Science and Engineering",
        "School of Biomedical Engineering",
        "School of Aeronautics and Astronautics",
        "School of Physics and Astronomy",
        "School of Mathematics",
        "School of Economics and Management",
        "School of Humanities",
        "School of Foreign Languages",
        "School of Media and Design",
        "School of Law",
        "School of International and Public Affairs",
        "School of Agriculture and Biology",
        "School of Environmental Science and Engineering",
        "School of Pharmacy",
        "School of Life Sciences and Biotechnology",
        "School of Computer Science and Engineering"
    ]
}

def get_faculties_from_wikipedia(university_slug):
    """Attempt to get faculties from Wikipedia for a university"""
    url = UNIVERSITY_WIKI_URLS.get(university_slug)
    if not url:
        print(f"No Wikipedia URL found for {university_slug}")
        return DEFAULT_FACULTIES.get(university_slug, []), "Default list"
    
    try:
        print(f"Fetching data from {url}...")
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        faculties = []
        
        # Special case for Shanghai Jiao Tong University
        if university_slug == "shanghai-jiao-tong-university":
            print("Using specialized parsing for Shanghai Jiao Tong University")
            # Look for paragraphs that might contain faculty information
            for p in soup.find_all("p"):
                p_text = p.get_text().lower()
                if "schools" in p_text or "colleges" in p_text or "faculties" in p_text:
                    # Look for list items in the next sibling
                    next_el = p.find_next_sibling()
                    if next_el and next_el.name == "ul":
                        for li in next_el.find_all("li"):
                            faculty_text = li.get_text(strip=True)
                            if faculty_text and 3 < len(faculty_text) < 100:
                                faculties.append(faculty_text)
            
            # If we still couldn't find anything, try finding divs with faculty names
            if not faculties:
                for div in soup.find_all("div", class_="div-col"):
                    for ul in div.find_all("ul"):
                        for li in ul.find_all("li"):
                            faculty_text = li.get_text(strip=True)
                            if faculty_text and 3 < len(faculty_text) < 100:
                                faculties.append(faculty_text)
            
            # If we still couldn't find anything, use the default list
            if not faculties and university_slug in DEFAULT_FACULTIES:
                print(f"Using default list for {university_slug}")
                return DEFAULT_FACULTIES[university_slug], "Default list (after specialized parsing)"
        
        # Try different strategies to find faculties
        
        # Strategy 1: Look for "Faculties", "Schools", "Colleges", "Departments" headers
        headers_to_try = ["faculties", "schools", "colleges", "departments", "academic units", "academic divisions"]
        found_header = False
        
        for header_text in headers_to_try:
            if found_header:
                break
                
            for h in soup.find_all(['h2', 'h3', 'h4']):
                header_content = h.text.lower()
                if header_text in header_content and "references" not in header_content:
                    found_header = True
                    # Look for list items after this header
                    nextEl = h.find_next_sibling()
                    while nextEl and not (nextEl.name in ['h2', 'h3', 'h4']):
                        if nextEl.name == 'ul':
                            for li in nextEl.find_all('li'):
                                faculty_text = li.get_text(strip=True)
                                if faculty_text and len(faculty_text) > 3 and len(faculty_text) < 100:
                                    faculties.append(faculty_text)
                        
                        # Check for tables
                        elif nextEl.name == 'table':
                            for row in nextEl.find_all('tr'):
                                cells = row.find_all('td')
                                if cells:
                                    faculty_text = cells[0].get_text(strip=True)
                                    if faculty_text and len(faculty_text) > 3 and len(faculty_text) < 100:
                                        faculties.append(faculty_text)
                        
                        nextEl = nextEl.find_next_sibling()
                    break

        # Strategy 2: If no faculties found, look for lists in wikitables
        if not faculties:
            tables = soup.find_all("table", class_="wikitable")
            for table in tables:
                table_header = table.find('caption') or table.find('th')
                if table_header:
                    header_text = table_header.get_text(strip=True).lower()
                    if any(keyword in header_text for keyword in ["faculty", "school", "college", "department"]):
                        for row in table.find_all('tr')[1:]:  # skip header row
                            cells = row.find_all('td')
                            if cells:
                                faculty_text = cells[0].get_text(strip=True)
                                if faculty_text and len(faculty_text) > 3 and len(faculty_text) < 100:
                                    faculties.append(faculty_text)
        
        # Clean up faculties
        faculties = [re.sub(r'\[\d+\]', '', f) for f in faculties]  # Remove citation marks [1], [2], etc.
        faculties = [f.strip() for f in faculties if 3 < len(f.strip()) < 100]  # Remove too short or too long entries
        faculties = list(dict.fromkeys(faculties))  # Remove duplicates while preserving order
        
        if faculties:
            return faculties, url
        
        # If no faculties found, use default if available
        if university_slug in DEFAULT_FACULTIES:
            return DEFAULT_FACULTIES[university_slug], "Default list"
        
        # Generic fallback faculties for universities where we couldn't find details
        generic_faculties = [
            "School of Science", "School of Engineering", "School of Medicine",
            "School of Humanities", "School of Social Sciences", "School of Economics",
            "School of Management", "School of Law", "School of Arts",
            "School of Foreign Languages", "School of Computer Science"
        ]
        return generic_faculties, "Generic list"
        
    except Exception as e:
        print(f"Error fetching data from Wikipedia for {university_slug}: {e}")
        # Return default faculties if available
        if university_slug in DEFAULT_FACULTIES:
            return DEFAULT_FACULTIES[university_slug], "Default list (after error)"
        return [], "Error"

def update_markdown_with_faculties(md_path, faculties):
    """Update markdown file with faculties"""
    print(f"Reading file: {md_path}")
    try:
        with open(md_path, "r", encoding="utf-8") as f:
            content = f.read()
            print(f"File read successfully: {len(content)} bytes")
    except Exception as e:
        print(f"ERROR reading file {md_path}: {e}")
        raise
    
    # Extract frontmatter
    match = re.match(r"^---\n(.*?)\n---\n", content, re.DOTALL)
    if not match:
        print(f"No frontmatter found in {md_path}")
        return
    
    print("Frontmatter found, parsing YAML...")
    frontmatter = yaml.safe_load(match.group(1))
    
    # Update faculties
    print("Updating faculties in frontmatter...")
    frontmatter["faculties"] = faculties
    
    # Rebuild markdown
    print("Rebuilding markdown content...")
    new_frontmatter = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
    new_content = f"---\n{new_frontmatter}---\n" + content[match.end():]
    
    print(f"Writing updated content to {md_path}...")
    try:
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"File written successfully")
    except Exception as e:
        print(f"ERROR writing file {md_path}: {e}")
        raise

def find_university_files():
    """Find all university markdown files in the content folder"""
    base_dir = "content/universities/en"
    files = []
    
    try:
        for filename in os.listdir(base_dir):
            if filename.endswith(".md") and not filename.startswith("."):
                full_path = os.path.join(base_dir, filename)
                files.append(full_path)
                print(f"Found file: {filename}")
    except Exception as e:
        print(f"Error listing directory {base_dir}: {e}")
    
    # Check if we found Shanghai Jiao Tong University
    sjtu_found = False
    for file_path in files:
        if "shanghai-jiao-tong" in file_path.lower():
            sjtu_found = True
            print(f"Found Shanghai Jiao Tong University at: {file_path}")
            break
    
    if not sjtu_found:
        print("WARNING: Could not find Shanghai Jiao Tong University file!")
        # Try alternative filenames
        possible_names = [
            "shanghai-jiao-tong-university.md",
            "shanghai-jiaotong-university.md",
            "shanghai-jiao-tong.md",
            "sjtu.md"
        ]
        for name in possible_names:
            full_path = os.path.join(base_dir, name)
            if os.path.exists(full_path):
                print(f"Found SJTU with alternative name: {name}")
                files.append(full_path)
                break
    
    return files

def get_university_slug(file_path):
    """Extract university slug from file path"""
    return os.path.basename(file_path).replace(".md", "")

def process_all_universities():
    """Process all universities in the content folder"""
    university_files = find_university_files()
    total = len(university_files)
    print(f"Found {total} university files")
    
    # Process specific university first for testing
    specific_slug = "shanghai-jiao-tong-university"
    specific_path = None
    
    for file_path in university_files:
        if specific_slug in file_path:
            specific_path = file_path
            break
    
    if specific_path:
        print(f"\nPROCESSING PRIORITY: {specific_slug} at {specific_path}")
        process_university(specific_path)
    
    # Process all other universities
    count = 0
    for file_path in university_files:
        university_slug = get_university_slug(file_path)
        if university_slug == specific_slug:
            continue  # Skip, already processed
        
        count += 1
        print(f"\nProcessing {count}/{total-1}: {university_slug}")
        process_university(file_path)
        
        # Add a small delay to avoid hitting rate limits
        if count < total-1:
            print("Waiting 2 seconds before next request...")
            time.sleep(2)

def process_university(file_path):
    """Process a single university file"""
    university_slug = get_university_slug(file_path)
    
    # Get faculties
    faculties, source = get_faculties_from_wikipedia(university_slug)
    if not faculties:
        print(f"No faculties found for {university_slug}")
        return
        
    print(f"Found {len(faculties)} faculties for {university_slug} (from {source})")
    print(f"First few faculties: {faculties[:3]}")
    
    # Update English version
    en_path = file_path
    try:
        print(f"Updating English file: {en_path}")
        update_markdown_with_faculties(en_path, faculties)
        print(f"Updated {en_path}")
    except Exception as e:
        print(f"ERROR updating {en_path}: {e}")
    
    # Update Russian and Uzbek versions
    ru_path = en_path.replace("/en/", "/ru/")
    uz_path = en_path.replace("/en/", "/uz/")
    
    try:
        if os.path.exists(ru_path):
            print(f"Updating Russian file: {ru_path}")
            update_markdown_with_faculties(ru_path, faculties)
            print(f"Updated {ru_path}")
        else:
            print(f"Russian file not found: {ru_path}")
    except Exception as e:
        print(f"ERROR updating {ru_path}: {e}")
        
    try:
        if os.path.exists(uz_path):
            print(f"Updating Uzbek file: {uz_path}")
            update_markdown_with_faculties(uz_path, faculties)
            print(f"Updated {uz_path}")
        else:
            print(f"Uzbek file not found: {uz_path}")
    except Exception as e:
        print(f"ERROR updating {uz_path}: {e}")

if __name__ == "__main__":
    process_all_universities()
    
    # As a final fallback, directly try to update Shanghai Jiao Tong University
    print("\n\n==== FINAL FALLBACK FOR SHANGHAI JIAO TONG UNIVERSITY ====")
    try:
        # Try all possible filenames
        possible_paths = [
            "content/universities/en/shanghai-jiao-tong-university.md",
            "content/universities/en/shanghai-jiaotong-university.md", 
            "content/universities/en/shanghai-jiao-tong.md",
            "content/universities/en/sjtu.md"
        ]
        
        sjtu_faculties = DEFAULT_FACULTIES["shanghai-jiao-tong-university"]
        
        # Try to find and update the file
        file_found = False
        for path in possible_paths:
            if os.path.exists(path):
                print(f"Found SJTU file at: {path}")
                try:
                    update_markdown_with_faculties(path, sjtu_faculties)
                    print(f"Successfully updated SJTU faculties in {path}")
                    file_found = True
                    
                    # Update translations
                    ru_path = path.replace("/en/", "/ru/")
                    uz_path = path.replace("/en/", "/uz/")
                    
                    if os.path.exists(ru_path):
                        update_markdown_with_faculties(ru_path, sjtu_faculties)
                        print(f"Updated Russian version: {ru_path}")
                        
                    if os.path.exists(uz_path):
                        update_markdown_with_faculties(uz_path, sjtu_faculties)
                        print(f"Updated Uzbek version: {uz_path}")
                        
                    break
                except Exception as e:
                    print(f"Error updating {path}: {e}")
        
        if not file_found:
            print("ERROR: Could not find any SJTU file to update!")
    except Exception as e:
        print(f"Error in SJTU fallback: {e}")