# Home FAQs Content

This directory contains FAQ content for the home page, organized by locale.

## Structure

```
content/
  home-faqs/
    en/
      faq-visa.md
      faq-documents.md
      ...
    ru/
      faq-visa.md
      faq-documents.md
      ...
    uz/
      faq-visa.md
      faq-documents.md
      ...
```

## FAQ Item Schema

Each FAQ Markdown file should have the following structure:

```md
---
id: "unique-id"
category: "application" # One of: application, financial, academic, life
question: "Question text?"
answer: "Answer text goes here."
order: 1 # Optional: used to sort FAQs within a category
---
```

## Categories

- `application`: Questions about application process, documents, visas, etc.
- `financial`: Questions about costs, scholarships, funding, etc.
- `academic`: Questions about programs, courses, language requirements, etc.
- `life`: Questions about accommodation, campus life, work opportunities, etc.

## Adding New FAQs

1. Create a new `.md` file in the appropriate locale directory
2. Use a descriptive filename (e.g., `faq-visa-process.md`)
3. Fill in the frontmatter with the required fields
4. The `id` field should be unique across all FAQs
5. The content below the frontmatter is currently not used 