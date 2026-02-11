# Dashboard Image Setup

The dashboard modal currently references an external URL for the 3270Connect dashboard screenshot.

## Current Configuration

The image URL is defined in `/src/lib/dashboard-image.ts` and currently points to:
```
https://raw.githubusercontent.com/3270io/3270Connect/main/docs/dashboard-screenshot.png
```

## To Use a Local Image Instead

If you'd prefer to use a local image file:

1. Place your dashboard screenshot image in `/src/assets/images/` 
   - Recommended filename: `dashboard-screenshot.png`

2. Update `/src/lib/dashboard-image.ts`:
   ```typescript
   import dashboardImg from '@/assets/images/dashboard-screenshot.png'
   export const dashboardImageUrl = dashboardImg
   ```

3. The image will be automatically optimized and bundled by Vite

## Image Recommendations

- Format: PNG or WebP for best quality
- Resolution: 1920x1080 or higher for clarity in the modal
- File size: Optimize to < 500KB if possible for faster loading
