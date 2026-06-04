'use client';

import { useCoursePlanner } from './use-course-planner';
import { CoursePlanStats } from './course-plan-stats';
import { CoursePlannerActions } from './course-planner-actions';
import { CourseAddForm } from './course-add-form';
import { CoursePlanGrid } from './course-plan-grid';

export function CoursePlanner() {
  const cp = useCoursePlanner();

  if (!cp.mounted) return null;

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <CoursePlanStats
        courseCount={cp.courses.length}
        completedCredits={cp.completedCredits}
        totalCredits={cp.totalCredits}
        unlockedCount={cp.unlocked.length}
      />

      {/* Actions */}
      <CoursePlannerActions
        hasCourses={cp.courses.length > 0}
        importOpen={cp.importOpen}
        onToggleAdd={() => cp.setShowAdd(!cp.showAdd)}
        onResetProgress={cp.resetProgress}
        onExportJSON={cp.handleExportJSON}
        onOpenImport={() => cp.setImportOpen(true)}
        onImportOpenChange={cp.setImportOpen}
        onLoadPreset={cp.loadPreset}
        onImportCourses={cp.handleImportCourses}
        onResetAll={() => cp.setCourses([])}
      />

      {/* Add Course Form */}
      {cp.showAdd && (
        <CourseAddForm
          newCode={cp.newCode}
          newTitle={cp.newTitle}
          newCredits={cp.newCredits}
          newPrereqs={cp.newPrereqs}
          onCodeChange={cp.setNewCode}
          onTitleChange={cp.setNewTitle}
          onCreditsChange={cp.setNewCredits}
          onPrereqsChange={cp.setNewPrereqs}
          onAdd={cp.addCourse}
        />
      )}

      {/* Topological Levels / Grouped Courses */}
      <CoursePlanGrid
        groupedCourses={cp.groupedCourses}
        completedIds={cp.completedIds}
        unlockedIds={cp.unlockedIds}
        codeById={cp.codeById}
        onToggleComplete={cp.toggleComplete}
        onRemoveCourse={cp.removeCourse}
      />
    </div>
  );
}
