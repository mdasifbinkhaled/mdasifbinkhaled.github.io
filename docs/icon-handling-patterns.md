# Icon Handling Patterns

**Date:** October 15, 2025  
**Status:** Documented - No action needed

## Summary

Issue #13 claimed "inconsistent icon handling" but analysis shows **intentional variation** for different use cases, not problematic inconsistency.

## Three Patterns (All Valid)

### 1. Centralized Icon Component ✅

**Location:** `src/shared/components/common/icons.tsx`

**Use Case:** Data-driven icons (course cards, dynamic content)

**Pattern:**

```typescript
// Data file
{
  "iconName": "Code2"
}

// Component
<Icon name={course.iconName} className="w-5 h-5" />
```

**Benefits:**

- Type-safe (IconName type)
- Centralized icon registry
- Easy to add new icons
- Perfect for CMS/data-driven content

**Used In:**

- `SimpleCourseCard` (teaching feature)
- Any component displaying course data

### 2. Direct Lucide Imports ✅

**Use Case:** Static UI components (navigation, buttons, page layouts)

**Pattern:**

```typescript
import { Mail, Github, Home } from 'lucide-react';

<Mail className="w-4 h-4" />
```

**Benefits:**

- Tree-shakeable (only imports used icons)
- Type-safe
- Explicit and clear
- Standard React pattern
- No indirection

**Used In:**

- Navigation components
- Contact page
- Error pages
- Back-to-top button
- PDF viewer
- ~20+ components

### 3. Emoji Utility ✅

**Location:** `src/features/academic/utils/get-type-icon.ts`

**Use Case:** Academic search feature (content type indicators)

**Pattern:**

```typescript
export function getTypeIcon(type: string): string {
  switch (type) {
    case 'publication': return '📄';
    case 'course': return '📚';
    // ...
  }
}

// Usage
<span>{getTypeIcon(item.type)}</span>
```

**Benefits:**

- Universal (no font needed)
- Lightweight (just emoji)
- Domain-specific to academic feature

**Used In:**

- Academic search components
- Filter badges
- Search result cards

## Decision Matrix

| Scenario             | Use Pattern    | Reason                        |
| -------------------- | -------------- | ----------------------------- |
| Course data display  | Icon component | Data has `iconName` field     |
| Navigation items     | Direct imports | Static, known at build time   |
| Content type badges  | Emoji utility  | Feature-specific, lightweight |
| Error pages          | Direct imports | Static UI                     |
| Dynamic user content | Icon component | User-configurable             |
| Button decorations   | Direct imports | Fixed UI elements             |

## Why This Is NOT Inconsistent

**Different patterns serve different purposes:**

1. **Icon component** = Data-driven, centralized registry
2. **Direct imports** = Static UI, tree-shakeable
3. **Emoji utility** = Feature-specific, no dependencies

**This is good architecture**, not a problem to fix.

## Recommendation

✅ **Keep all three patterns**

**Guidelines for developers:**

- **Adding new data-driven content?** → Add icon to `icons.tsx`, use `<Icon name="..." />`
- **Building static UI?** → Import directly from `lucide-react`
- **Need simple indicators?** → Consider emojis for lightweight solution

**Do NOT:**

- Force all icons through Icon component (adds unnecessary indirection)
- Use Icon component for static UI (loses tree-shaking benefit)
- Remove emoji utility (it serves its purpose well)

## Conclusion

Issue #13 status: **Not Applicable**

The "inconsistency" is actually **intentional architectural variation** with clear use cases for each pattern. No changes needed.

---

**Related Issues:**

- Issue #2: ✅ Fixed (removed UI imports from data layer)
- Issue #13: ❌ Not applicable (patterns are intentional)
