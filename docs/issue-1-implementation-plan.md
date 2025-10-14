# Issue #1: Split Massive courses.ts File - Implementation Plan

**Date**: October 15, 2025  
**Status**: 🚀 Ready to Start  
**Priority**: 🔴 Critical  
**Estimated Effort**: 2-3 days  
**Dependencies**: ✅ Issue #8 (Zod validation) - COMPLETED

---

## Executive Summary

**Problem**: The `courses.ts` file is 673 lines long, containing 14 courses with 40-60 lines each. This creates:

- Maintainability nightmares (hard to find/edit courses)
- Merge conflict risks (multiple people editing same file)
- Cognitive overload (too much data in one place)
- Scalability issues (will only grow larger)

**Solution**: Split into individual JSON files per course with a loader utility that applies Zod validation.

**Benefits**:

- 📉 File reduction: 673 lines → ~50 lines loader
- 🎯 Clarity: One file per course (easy to find/edit)
- ✅ Validation: Leverages existing Zod schemas
- 🚀 Scalability: Adding courses = drop JSON file
- 🔒 Type safety: JSON validated against schemas

---

## Current State Analysis

### File Structure

```
src/shared/lib/data/courses.ts (673 lines)
├── Imports (17 lines)
├── coursesTaughtIUB (9 courses, ~370 lines)
│   ├── CSE 101 (40 lines)
│   ├── CSE 201 (40 lines)
│   ├── CSE 203 (42 lines)
│   ├── CSE 205 (38 lines)
│   ├── CSE 220 (39 lines)
│   ├── CSE 221 (41 lines)
│   ├── CSE 303 (42 lines)
│   ├── CSE 401 (40 lines)
│   └── CSE 423 (48 lines)
└── coursesTaughtBRACU (5 courses, ~286 lines)
    ├── CSE 110 (55 lines)
    ├── CSE 420 (58 lines)
    ├── CSE 423 (55 lines)
    ├── CSE 489 (60 lines)
    └── MAT 361 (58 lines)
```

### Current Issues

1. **Maintainability**: Need to scroll through 673 lines to find one course
2. **Merge Conflicts**: Multiple people editing = conflicts
3. **No Validation**: Data could be invalid (now fixed with Issue #8)
4. **Growth**: File will keep growing with new courses
5. **Search**: Hard to search/filter courses in one massive file

### Dependencies

✅ **Issue #8 Completed**: Zod validation infrastructure ready

- `coursesArraySchema` available in `schemas.ts`
- `validateData()` helper function ready
- All validation rules established

---

## Target State Design

### New Directory Structure

```
src/shared/lib/data/
├── courses/
│   ├── iub/
│   │   ├── cse101.json (40 lines)
│   │   ├── cse201.json (40 lines)
│   │   ├── cse203.json (42 lines)
│   │   ├── cse205.json (38 lines)
│   │   ├── cse220.json (39 lines)
│   │   ├── cse221.json (41 lines)
│   │   ├── cse303.json (42 lines)
│   │   ├── cse401.json (40 lines)
│   │   └── cse423.json (48 lines)
│   └── bracu/
│       ├── cse110.json (55 lines)
│       ├── cse420.json (58 lines)
│       ├── cse423.json (55 lines)
│       ├── cse489.json (60 lines)
│       └── mat361.json (58 lines)
├── courses.ts (~50 lines - loader only)
└── validation/
    └── schemas.ts (existing, already has courseDataSchema)
```

### New courses.ts (Loader)

```typescript
import { CourseData } from '@/shared/types';
import { coursesArraySchema, validateData } from '../validation/schemas';

// Import all course JSON files
import cse101 from './courses/iub/cse101.json';
import cse201 from './courses/iub/cse201.json';
// ... (all 14 imports)

// Validate and export IUB courses
const rawCoursesTaughtIUB: CourseData[] = [
  cse101,
  cse201,
  cse203,
  cse205,
  cse220,
  cse221,
  cse303,
  cse401,
  cse423,
] as CourseData[];

export const coursesTaughtIUB = validateData(
  rawCoursesTaughtIUB,
  coursesArraySchema,
  'IUB courses'
);

// Validate and export BRACU courses
const rawCoursesTaughtBRACU: CourseData[] = [
  cse110,
  cse420,
  cse423,
  cse489,
  mat361,
] as CourseData[];

export const coursesTaughtBRACU = validateData(
  rawCoursesTaughtBRACU,
  coursesArraySchema,
  'BRACU courses'
);

// Combined export for convenience
export const allCourses = [...coursesTaughtIUB, ...coursesTaughtBRACU];
```

### Sample JSON File (cse101.json)

```json
{
  "id": "iub-cse101",
  "code": "CSE 101",
  "title": "Introduction to Programming",
  "institution": "IUB",
  "credits": 3,
  "year": 2019,
  "semester": "Spring, Summer, Fall",
  "iconName": "Code2",
  "description": "Introduction to programming using Python. Covers basic programming concepts including variables, data types, control structures, functions, and basic data structures.",
  "objectives": [
    "Understand fundamental programming concepts",
    "Write simple programs in Python",
    "Apply problem-solving techniques"
  ],
  "outcomes": [
    "Write Python programs to solve basic problems",
    "Use functions and modules effectively",
    "Debug and test simple programs"
  ],
  "topics": [
    "Variables and data types",
    "Control structures (if/else, loops)",
    "Functions and modules",
    "Lists, tuples, dictionaries",
    "File I/O",
    "Basic algorithms"
  ],
  "assessment": {
    "assignments": 20,
    "quizzes": 15,
    "midterm": 25,
    "final": 40
  },
  "enrollment": 120,
  "rating": 4.5,
  "tags": ["Python", "Programming", "Beginner"]
}
```

---

## Implementation Steps

### Phase 1: Setup and Structure (30 minutes)

**Step 1.1**: Create directory structure

```bash
mkdir -p src/shared/lib/data/courses/iub
mkdir -p src/shared/lib/data/courses/bracu
```

**Step 1.2**: Backup current courses.ts

```bash
cp src/shared/lib/data/courses.ts src/shared/lib/data/courses.ts.backup
```

---

### Phase 2: Extract Course Data (2-3 hours)

**Step 2.1**: Extract IUB Courses
For each IUB course, create a JSON file:

1. Read course object from courses.ts
2. Convert to JSON format
3. Save to `data/courses/iub/{code}.json`
4. Remove from courses.ts

**Files to create**:

- `cse101.json` (CSE 101: Introduction to Programming)
- `cse201.json` (CSE 201: Data Structures)
- `cse203.json` (CSE 203: Discrete Mathematics)
- `cse205.json` (CSE 205: Numerical Methods)
- `cse220.json` (CSE 220: Data Communications)
- `cse221.json` (CSE 221: Algorithms)
- `cse303.json` (CSE 303: Operating Systems)
- `cse401.json` (CSE 401: Internet Security)
- `cse423.json` (CSE 423: Computer Graphics)

**Step 2.2**: Extract BRACU Courses
For each BRACU course, create a JSON file:

**Files to create**:

- `cse110.json` (CSE 110: Programming Language I)
- `cse420.json` (CSE 420: Compiler Design)
- `cse423.json` (CSE 423: Computer Graphics Lab)
- `cse489.json` (CSE 489: Computer Ethics)
- `mat361.json` (MAT 361: Probability and Statistics)

**Conversion Process**:

```typescript
// From courses.ts:
{
  id: 'iub-cse101',
  code: 'CSE 101',
  title: 'Introduction to Programming',
  // ... other properties
}

// To cse101.json:
{
  "id": "iub-cse101",
  "code": "CSE 101",
  "title": "Introduction to Programming",
  // ... other properties
}
```

**Key Considerations**:

- Keep all existing properties
- Maintain same data types
- Preserve arrays (objectives, outcomes, topics, tags)
- Keep nested objects (assessment)
- Use consistent formatting (2-space indentation)

---

### Phase 3: Create Loader (1 hour)

**Step 3.1**: Update courses.ts to import JSON files

**Before** (673 lines):

```typescript
import { CourseData } from '@/shared/types';

export const coursesTaughtIUB: CourseData[] = [
  {
    id: 'iub-cse101',
    code: 'CSE 101',
    // ... 40 lines
  },
  {
    id: 'iub-cse201',
    code: 'CSE 201',
    // ... 40 lines
  },
  // ... 7 more courses
];

export const coursesTaughtBRACU: CourseData[] = [
  // ... 5 courses
];
```

**After** (~50 lines):

```typescript
import { CourseData } from '@/shared/types';
import { coursesArraySchema, validateData } from '../validation/schemas';

// Import IUB courses
import cse101 from './courses/iub/cse101.json';
import cse201 from './courses/iub/cse201.json';
import cse203 from './courses/iub/cse203.json';
import cse205 from './courses/iub/cse205.json';
import cse220 from './courses/iub/cse220.json';
import cse221 from './courses/iub/cse221.json';
import cse303 from './courses/iub/cse303.json';
import cse401 from './courses/iub/cse401.json';
import cse423 from './courses/iub/cse423.json';

// Import BRACU courses
import cse110 from './courses/bracu/cse110.json';
import cse420 from './courses/bracu/cse420.json';
import cse423Bracu from './courses/bracu/cse423.json';
import cse489 from './courses/bracu/cse489.json';
import mat361 from './courses/bracu/mat361.json';

// Validate and export IUB courses
const rawCoursesTaughtIUB: CourseData[] = [
  cse101,
  cse201,
  cse203,
  cse205,
  cse220,
  cse221,
  cse303,
  cse401,
  cse423,
] as CourseData[];

export const coursesTaughtIUB = validateData(
  rawCoursesTaughtIUB,
  coursesArraySchema,
  'IUB courses'
);

// Validate and export BRACU courses
const rawCoursesTaughtBRACU: CourseData[] = [
  cse110,
  cse420,
  cse423Bracu,
  cse489,
  mat361,
] as CourseData[];

export const coursesTaughtBRACU = validateData(
  rawCoursesTaughtBRACU,
  coursesArraySchema,
  'BRACU courses'
);

// Combined export for convenience
export const allCourses = [...coursesTaughtIUB, ...coursesTaughtBRACU];
```

**Step 3.2**: Configure TypeScript for JSON imports

Update `tsconfig.json` to allow JSON imports:

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
    // ... other options
  }
}
```

---

### Phase 4: Verification (1 hour)

**Step 4.1**: Build verification

```bash
npm run build
```

**Expected output**:

```
✅ Validation passed for IUB courses
✅ Validation passed for BRACU courses
✓ Compiled successfully in 3.1s
● /teaching/[institution]/[courseCode]
  ├ /teaching/iub/cse101
  ├ /teaching/iub/cse201
  └ [+12 more paths]
```

**Step 4.2**: TypeScript verification

```bash
npx tsc --noEmit
```

**Expected**: 0 errors

**Step 4.3**: ESLint verification

```bash
npm run lint
```

**Expected**: 0 errors

**Step 4.4**: Manual testing

- Visit all 14 course pages
- Check institution overview pages
- Verify all data displays correctly

**Step 4.5**: Git verification

```bash
git status
git diff src/shared/lib/data/courses.ts
```

**Expected changes**:

- 14 new JSON files added
- courses.ts reduced from 673 lines to ~50 lines
- All other files unchanged

---

## Verification Checklist

### Pre-Implementation

- [x] Issue #8 (Zod validation) completed
- [x] Backup courses.ts created
- [x] Directory structure planned
- [x] Implementation plan documented

### During Implementation

- [ ] All 9 IUB courses extracted to JSON
- [ ] All 5 BRACU courses extracted to JSON
- [ ] courses.ts updated to loader pattern
- [ ] TypeScript JSON import configured
- [ ] Imports and validation working

### Post-Implementation

- [ ] Build passes (npm run build)
- [ ] TypeScript passes (npx tsc --noEmit)
- [ ] ESLint passes (npm run lint)
- [ ] All 14 course pages accessible
- [ ] Institution overview pages working
- [ ] Validation messages appearing
- [ ] No console errors
- [ ] Git changes reviewed

### Testing

- [ ] IUB course pages render correctly
- [ ] BRACU course pages render correctly
- [ ] Institution overview pages show correct counts
- [ ] SimpleCourseCard displays all data
- [ ] Dynamic route still generating 14 pages
- [ ] All course data intact (no data loss)

### Documentation

- [ ] JSON schema documented
- [ ] Loader pattern documented
- [ ] How to add new courses documented
- [ ] Completion report created

---

## Success Criteria

### Metrics

| Metric           | Before    | After        | Target                |
| ---------------- | --------- | ------------ | --------------------- |
| courses.ts size  | 673 lines | ~50 lines    | < 100 lines           |
| Files per course | N/A       | 1 JSON file  | 1 file                |
| Maintainability  | ⚠️ Poor   | ✅ Excellent | Easy to find/edit     |
| Validation       | ✅ Yes\*  | ✅ Yes       | All courses validated |
| Build time       | 3.1s      | ~3.1s        | No regression         |
| Pages generated  | 28        | 28           | All pages working     |

\*After Issue #8

### Qualitative Goals

✅ **Maintainability**: Easy to find and edit individual courses  
✅ **Scalability**: Adding new courses = drop JSON file  
✅ **Validation**: All courses validated with Zod  
✅ **Type Safety**: JSON imports type-checked  
✅ **No Breaking Changes**: All existing functionality preserved  
✅ **Documentation**: Clear process for adding courses

---

## Risk Assessment

### High Risk

❌ **None** - Issue #8 validation infrastructure already in place

### Medium Risk

⚠️ **JSON Import Configuration**

- Risk: TypeScript might not import JSON correctly
- Mitigation: Configure `resolveJsonModule: true` in tsconfig.json
- Fallback: Use `.ts` files instead of `.json`

⚠️ **Data Loss During Extraction**

- Risk: Lose data when copying to JSON
- Mitigation: Automated extraction script, validation after
- Fallback: Restore from backup

### Low Risk

🟡 **Build Performance**

- Risk: 14 JSON imports might slow build
- Mitigation: JSON is statically imported, should be fast
- Fallback: Dynamic imports with Promise.all()

---

## Rollback Plan

If something goes wrong:

**Step 1**: Restore backup

```bash
cp src/shared/lib/data/courses.ts.backup src/shared/lib/data/courses.ts
```

**Step 2**: Remove JSON files

```bash
rm -rf src/shared/lib/data/courses/
```

**Step 3**: Verify build

```bash
npm run build
```

**Step 4**: Commit restoration

```bash
git add .
git commit -m "revert: rollback Issue #1 - restore courses.ts"
```

---

## Timeline Estimate

### Optimistic (4 hours)

- Setup: 30 min
- Extraction: 1.5 hours
- Loader: 30 min
- Verification: 1 hour
- Documentation: 30 min

### Realistic (2 days)

- Setup: 1 hour
- Extraction: 3 hours (careful conversion)
- Loader: 2 hours (testing, debugging)
- Verification: 2 hours (comprehensive testing)
- Documentation: 2 hours (detailed docs)

### Pessimistic (3 days)

- Setup: 1 hour
- Extraction: 4 hours (manual conversion, errors)
- Loader: 4 hours (JSON import issues)
- Verification: 4 hours (testing, fixing)
- Documentation: 3 hours (comprehensive)

**Recommended**: Plan for 2 days (realistic estimate)

---

## Benefits Analysis

### Immediate Benefits

1. **Maintainability**: ✅ Find courses in seconds, not minutes
2. **Merge Conflicts**: ✅ Eliminated (each course = separate file)
3. **Validation**: ✅ All courses validated (already working from Issue #8)
4. **File Size**: ✅ 92% reduction in main file (673 → 50 lines)

### Long-Term Benefits

1. **Scalability**: ✅ Add courses without touching loader
2. **Clarity**: ✅ One file per course (clear ownership)
3. **Tooling**: ✅ Easy to generate courses from templates
4. **Testing**: ✅ Test individual course files
5. **CI/CD**: ✅ Validate JSON files in pipeline

### Developer Experience

1. **Onboarding**: ✅ New devs can find/edit courses easily
2. **Speed**: ✅ Faster to locate and modify courses
3. **Safety**: ✅ Validation catches errors immediately
4. **Documentation**: ✅ JSON schema documents structure

---

## Next Steps After Completion

### Immediate

1. ✅ Delete `courses.ts.backup` after verification
2. ✅ Update documentation on how to add courses
3. ✅ Commit changes with descriptive message

### Short Term

1. Consider adding course templates for easy creation
2. Add CI/CD validation for course JSON files
3. Document best practices for course data

### Long Term

1. Consider UI for course management (admin panel)
2. Add course versioning/history
3. Implement course import/export tools

---

## Questions & Answers

**Q: Why JSON instead of TypeScript?**  
A: JSON is pure data, no code execution. Easier to validate, parse, and use in tools. TypeScript files would still need validation.

**Q: Won't 14 imports slow down the build?**  
A: No, static imports are bundled at build time. No runtime penalty.

**Q: What if we need computed properties?**  
A: Keep them in the loader (e.g., `allCourses` is computed from IUB + BRACU).

**Q: How do we add a new course?**  
A: 1) Create JSON file, 2) Import in courses.ts, 3) Add to institution array. That's it!

**Q: What about course relationships/dependencies?**  
A: Can add `prerequisites: ["CSE 101"]` field in JSON, validate with Zod.

---

## Conclusion

Issue #1 is **ready to implement** with:

- ✅ Clear plan and structure
- ✅ Validation infrastructure (Issue #8)
- ✅ Low risk (well-defined, reversible)
- ✅ High impact (92% file reduction)
- ✅ Excellent developer experience

**Recommendation**: Proceed with implementation following this plan.

---

**Plan Created**: October 15, 2025  
**Author**: GitHub Copilot  
**Status**: 🚀 Ready to Execute
