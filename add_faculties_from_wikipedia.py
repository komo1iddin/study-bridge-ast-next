import yaml
import re

def get_faculties_from_fudan():
    # Hardcoded list of faculties from Fudan University
    faculties = [
        "School of Philosophy",
        "School of Economics",
        "School of Management",
        "School of Law",
        "School of Social Development and Public Policy",
        "School of International Relations & Public Affairs",
        "School of Journalism",
        "School of Arts and Humanities",
        "School of Foreign Languages and Literature",
        "School of Life Sciences",
        "School of Information Science and Engineering",
        "School of Computer Science",
        "School of Software",
        "School of Microelectronics",
        "School of Physics",
        "School of Chemistry",
        "School of Mathematics",
        "Shanghai Medical College",
        "School of Pharmacy",
        "School of Nursing",
        "School of Public Health",
        "College of Foreign Languages and Literatures"
    ]
    return faculties, "Hardcoded list"

def update_markdown_with_faculties(md_path, faculties):
    with open(md_path, "r", encoding="utf-8") as f:
        content = f.read()
    # Extract frontmatter
    match = re.match(r"^---\n(.*?)\n---\n", content, re.DOTALL)
    if not match:
        print(f"No frontmatter found in {md_path}")
        return
    frontmatter = yaml.safe_load(match.group(1))
    # Update faculties
    frontmatter["faculties"] = faculties
    # Rebuild markdown
    new_frontmatter = yaml.dump(frontmatter, allow_unicode=True, sort_keys=False)
    new_content = f"---\n{new_frontmatter}---\n" + content[match.end():]
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(new_content)

# Example usage:
md_path = "content/universities/en/fudan-university.md"
faculties, source = get_faculties_from_fudan()
print(f"Faculties for Fudan University (from {source}):\n", faculties)
update_markdown_with_faculties(md_path, faculties)
print(f"Updated {md_path} with {len(faculties)} faculties")

# Update Russian and Uzbek versions as well
ru_md_path = "content/universities/ru/fudan-university.md"
uz_md_path = "content/universities/uz/fudan-university.md"

try:
    update_markdown_with_faculties(ru_md_path, faculties)
    print(f"Updated {ru_md_path} with {len(faculties)} faculties")
except Exception as e:
    print(f"Error updating {ru_md_path}: {e}")

try:
    update_markdown_with_faculties(uz_md_path, faculties)
    print(f"Updated {uz_md_path} with {len(faculties)} faculties")
except Exception as e:
    print(f"Error updating {uz_md_path}: {e}")