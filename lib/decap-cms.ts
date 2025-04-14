import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Function to read markdown files from a directory
export function getContentItems<T>(
  contentType: string,
  locale: string = 'en'
): T[] {
  try {
    const contentDir = path.join(process.cwd(), 'content', contentType);
    // Check if directory exists
    if (!fs.existsSync(contentDir)) {
      console.warn(`Content directory not found: ${contentDir}`);
      return [];
    }

    // Get all markdown files from the content directory
    const files = fs.readdirSync(contentDir);
    
    // Parse each file and extract frontmatter
    return files
      .filter(file => file.endsWith('.md') || file.endsWith('.mdx'))
      .map(file => {
        // Read file content
        const filePath = path.join(contentDir, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        // Parse frontmatter and content
        const { data, content } = matter(fileContents);
        
        // Return parsed data with slug
        return {
          ...data,
          slug: file.replace(/\.mdx?$/, ''),
          content
        } as T;
      });
  } catch (error) {
    console.error(`Error reading ${contentType}:`, error);
    return [];
  }
}

// Function to get a single item by slug
export function getContentItem<T>(
  contentType: string,
  slug: string,
  locale: string = 'en'
): T | null {
  try {
    const contentDir = path.join(process.cwd(), 'content', contentType);
    const filePath = path.join(contentDir, `${slug}.md`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      const mdxPath = path.join(contentDir, `${slug}.mdx`);
      // Try mdx extension
      if (!fs.existsSync(mdxPath)) {
        return null;
      }
      // Use mdx path if exists
      const fileContents = fs.readFileSync(mdxPath, 'utf8');
      const { data, content } = matter(fileContents);
      return { ...data, slug, content } as T;
    }
    
    // Read and parse the file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return { ...data, slug, content } as T;
  } catch (error) {
    console.error(`Error reading ${contentType} item:`, error);
    return null;
  }
} 