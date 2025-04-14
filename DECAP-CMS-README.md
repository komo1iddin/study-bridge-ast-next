# Decap CMS Integration Guide

This project has been integrated with Decap CMS, a Git-based content management system that allows you to edit content through a user-friendly interface.

## Accessing the CMS

The CMS is available at `/admin` on your site. You can access it with:

- Local development: http://localhost:3000/admin/
- Production: https://your-domain.com/admin/

## Authentication

The CMS uses Netlify Identity for authentication. To set up users:

1. Deploy your site to Netlify
2. Go to your Netlify site dashboard
3. Navigate to "Site settings" > "Identity"
4. Enable Identity service
5. Under "Registration preferences", choose "Invite only"
6. Invite team members via email

## Adding Content

The CMS has been configured with the following content types:

### Universities

- Add and manage university profiles
- Upload logos and campus images
- Manage education types, grants availability, and other university details

### Grants

- Create scholarship and grant opportunities
- Define requirements and amounts
- Mark featured grants

### Blog Posts

- Write and publish blog articles
- Add featured images
- Tag and categorize content

## File Structure

Content is stored in markdown files under the `/content` directory:

- `/content/universities/` - University profiles
- `/content/grants/` - Grant information
- `/content/blogs/` - Blog posts

## Localization

The CMS supports multiple languages:

- English (en)
- Chinese (zh)
- Russian (ru)

When creating content, you can switch between languages using the language selector in the CMS.

## Media Files

Media uploads are stored in `/public/uploads` and served from `/uploads` on the website.

## Technical Details

The integration uses:

- `gray-matter` for parsing frontmatter
- Custom utility functions in `/lib/decap-cms.ts`
- Type definitions in `/types/content.ts`

## Development

When developing locally, you can use local Git Gateway by following these steps:

1. Run `npx netlify-cms-proxy-server` in a separate terminal
2. Update the `backend` config in `public/admin/config.yml` to:

```yaml
backend:
  name: git-gateway
  local_backend: true
```

This allows you to test the CMS without pushing changes to your repository. 