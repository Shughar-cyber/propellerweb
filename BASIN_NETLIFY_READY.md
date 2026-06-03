# Basin + Netlify Deployment Checklist

## ✅ Code Status

### Basin Integration
- [x] Basin endpoint configured: `https://usebasin.com/f/e1e8d78ad55b`
- [x] Form submission handler added
- [x] File upload support (Resume)
- [x] Form validation
- [x] Error/success messaging
- [x] Console logging for debugging

### Form Fields (Sending to Basin)
- [x] Full Name
- [x] Address
- [x] Age
- [x] Gender
- [x] Phone Number
- [x] Email
- [x] Resume (File)

### File Structure (Netlify Ready)
- [x] `index.html` - Entry point ✓
- [x] `props.css` - Styles
- [x] `props.js` - JavaScript
- [x] `netlify.toml` - Deployment config
- [x] `.gitignore` - Git config

### External Resources
- [x] All CDN links use HTTPS
- [x] NO localhost references
- [x] NO hardcoded IP addresses

---

## 🧪 Testing Steps (Before Deploying)

1. **Local Test:**
   - Fill out all form fields
   - Upload a test resume (PDF/DOC/DOCX)
   - Click Submit
   - Open browser console (F12)
   - Share console output to verify

2. **Check Basin Dashboard:**
   - Go to your Basin form
   - Verify submission appears there
   - Check email notifications

3. **Test Edge Cases:**
   - Try submitting with missing fields (should error)
   - Try uploading invalid file type (should reject)
   - Try file > 5MB (should show error)

---

## 📦 Deployment to Netlify

### Prerequisites
- [ ] Git initialized: `git init`
- [ ] GitHub repository created
- [ ] Local testing completed and working
- [ ] Basin submissions verified

### Deploy Steps
1. Push code to GitHub
2. Go to https://netlify.com
3. Click "Add new site" → "Import existing project"
4. Select your GitHub repo
5. Netlify auto-detects `netlify.toml`
6. Deploy completes automatically

### Post-Deploy
- [ ] Test form on deployed URL
- [ ] Verify Basin receives submissions
- [ ] Check error messages display
- [ ] Test resume upload
- [ ] Test on mobile

---

## 🔍 Debugging Guide

If submissions fail after deploying:

1. **Check Console (F12)**
   - Look for errors
   - Verify `✓ Validation passed`
   - Check `📤 Sending to Basin...`

2. **Network Tab (F12)**
   - Look for request to Basin endpoint
   - Check response status (should be 200)

3. **Basin Dashboard**
   - Verify form exists and is active
   - Check endpoint URL is correct

---

## Ready to Deploy? ✨

**Current Status: READY FOR NETLIFY**

Next steps:
1. ✅ Test form locally (submit test data)
2. ✅ Verify in Basin dashboard
3. ✅ Push to GitHub
4. ✅ Deploy to Netlify
5. ✅ Test live submissions

All code and configuration is Netlify-ready!
