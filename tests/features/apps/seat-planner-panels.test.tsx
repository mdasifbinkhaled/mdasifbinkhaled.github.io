import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/shared/components/common/data-importer', () => ({
  DataImporter: ({ open, title }: { open: boolean; title: string }) =>
    open ? <div data-testid="mock-data-importer">{title}</div> : null,
}));

import { RoomConfiguration } from '@/features/apps/components/seat-planner/room-configuration';
import { ExamDetailsForm } from '@/features/apps/components/seat-planner/exam-details-form';
import { StudentDataPanel } from '@/features/apps/components/seat-planner/student-data-panel';

describe('Seat Planner Panels', () => {
  it('shows room validation state, summary metrics, and opens bulk import', () => {
    const onAddRoom = vi.fn();
    const onRemoveRoom = vi.fn();

    render(
      <RoomConfiguration
        rooms={[{ uid: 'r1', name: 'BC6007-S', capacity: 35 }]}
        newRoomName=" bc6007-s "
        newRoomCapacity="40"
        allocationMode="cohort"
        sortOrder="section-name"
        totalCapacity={35}
        studentCount={50}
        canGenerate={true}
        onAddRoom={onAddRoom}
        onRemoveRoom={onRemoveRoom}
        onRoomNameChange={vi.fn()}
        onRoomCapacityChange={vi.fn()}
        onAllocationModeChange={vi.fn()}
        onSortOrderChange={vi.fn()}
        onGenerate={vi.fn()}
        onImportRooms={vi.fn()}
      />
    );

    expect(
      screen.getByText('A room with this name already exists.')
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
    expect(screen.getByText('Rooms')).toBeInTheDocument();
    expect(screen.getByText('Avg Capacity')).toBeInTheDocument();
    expect(screen.getByText('-15')).toBeInTheDocument();
    expect(
      screen.getByText(/students from the same section sit together/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/15\s+student\s*s\s+will be unassigned/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /bulk import/i }));
    expect(screen.getByTestId('mock-data-importer')).toHaveTextContent(
      'Import rooms'
    );

    fireEvent.click(
      screen.getByRole('button', { name: /remove room bc6007-s/i })
    );
    expect(onRemoveRoom).toHaveBeenCalledWith('r1');
  });

  it('shows mixed-mode helper text and positive capacity guidance for valid drafts', () => {
    render(
      <RoomConfiguration
        rooms={[{ uid: 'r1', name: 'BC6007-S', capacity: 40 }]}
        newRoomName="BC6008-S"
        newRoomCapacity="25"
        allocationMode="mixed"
        sortOrder="id"
        totalCapacity={40}
        studentCount={0}
        canGenerate={true}
        onAddRoom={vi.fn()}
        onRemoveRoom={vi.fn()}
        onRoomNameChange={vi.fn()}
        onRoomCapacityChange={vi.fn()}
        onAllocationModeChange={vi.fn()}
        onSortOrderChange={vi.fn()}
        onGenerate={vi.fn()}
        onImportRooms={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /add/i })).toBeEnabled();
    expect(screen.getByText(/press enter to add a room/i)).toBeInTheDocument();
    expect(screen.getByText(/new room adds 25 seats/i)).toBeInTheDocument();
    expect(
      screen.getByText(/sections are interleaved across rooms/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText('40')).not.toHaveLength(0);
    expect(screen.queryByText(/will be unassigned/i)).not.toBeInTheDocument();
  });

  it('shows the empty room setup state when nothing has been configured yet', () => {
    render(
      <RoomConfiguration
        rooms={[]}
        newRoomName=""
        newRoomCapacity=""
        allocationMode="cohort"
        sortOrder="random"
        totalCapacity={0}
        studentCount={0}
        canGenerate={false}
        onAddRoom={vi.fn()}
        onRemoveRoom={vi.fn()}
        onRoomNameChange={vi.fn()}
        onRoomCapacityChange={vi.fn()}
        onAllocationModeChange={vi.fn()}
        onSortOrderChange={vi.fn()}
        onGenerate={vi.fn()}
        onImportRooms={vi.fn()}
      />
    );

    expect(screen.getByRole('button', { name: /add/i })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /generate seat plan/i })
    ).toBeDisabled();
    expect(screen.queryByText('Rooms')).not.toBeInTheDocument();
    expect(screen.queryByText(/new room adds/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /remove room/i })
    ).not.toBeInTheDocument();
  });

  it('shows plural room totals, singular seat copy, and positive seat balance', () => {
    render(
      <RoomConfiguration
        rooms={[
          { uid: 'r1', name: 'BC6007-S', capacity: 30 },
          { uid: 'r2', name: 'BC6008-S', capacity: 31 },
        ]}
        newRoomName="BC6009-S"
        newRoomCapacity="1"
        allocationMode="cohort"
        sortOrder="section-id"
        totalCapacity={61}
        studentCount={60}
        canGenerate={false}
        onAddRoom={vi.fn()}
        onRemoveRoom={vi.fn()}
        onRoomNameChange={vi.fn()}
        onRoomCapacityChange={vi.fn()}
        onAllocationModeChange={vi.fn()}
        onSortOrderChange={vi.fn()}
        onGenerate={vi.fn()}
        onImportRooms={vi.fn()}
      />
    );

    expect(screen.getByText(/2 rooms/i)).toBeInTheDocument();
    expect(screen.getByText(/61 seats/i)).toBeInTheDocument();
    expect(screen.getByText(/new room adds 1 seat/i)).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /generate seat plan/i })
    ).toBeDisabled();
    expect(screen.queryByText(/will be unassigned/i)).not.toBeInTheDocument();
  });

  it('merges quick-pasted room lists without requiring headers', () => {
    const onImportRooms = vi.fn();

    render(
      <RoomConfiguration
        rooms={[]}
        newRoomName=""
        newRoomCapacity="40"
        allocationMode="cohort"
        sortOrder="section-name"
        totalCapacity={0}
        studentCount={0}
        canGenerate={false}
        onAddRoom={vi.fn()}
        onRemoveRoom={vi.fn()}
        onRoomNameChange={vi.fn()}
        onRoomCapacityChange={vi.fn()}
        onAllocationModeChange={vi.fn()}
        onSortOrderChange={vi.fn()}
        onGenerate={vi.fn()}
        onImportRooms={onImportRooms}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /quick paste list/i }));
    fireEvent.change(screen.getByLabelText(/quick paste room list/i), {
      target: {
        value: 'BC5012\t35\nBC5013\t35\nBC5014\t35',
      },
    });
    fireEvent.click(
      screen.getByRole('button', { name: /merge pasted rooms/i })
    );

    expect(onImportRooms).toHaveBeenCalledWith(
      [
        { name: 'BC5012', capacity: 35 },
        { name: 'BC5013', capacity: 35 },
        { name: 'BC5014', capacity: 35 },
      ],
      expect.objectContaining({
        mergeStrategy: 'merge',
        rowsSkipped: 0,
      })
    );
  });

  it('supports bulk faculty updates and apply-to-all actions', () => {
    const onSectionFacultyReplace = vi.fn();

    render(
      <ExamDetailsForm
        field={() => ({ value: '', onChange: vi.fn() })}
        sections={[1, 2, 3]}
        sectionCounts={{ 1: 14, 2: 14, 3: 14 }}
        sectionFaculty={{ 1: 'Dr. Nusrat Karim' }}
        onSectionFacultyChange={vi.fn()}
        onSectionFacultyReplace={onSectionFacultyReplace}
      />
    );

    fireEvent.change(
      screen.getByLabelText(/apply one faculty name to all active sections/i),
      { target: { value: 'Prof. Shared Name' } }
    );
    fireEvent.click(screen.getByRole('button', { name: /apply to all/i }));

    expect(onSectionFacultyReplace).toHaveBeenCalledWith({
      1: 'Prof. Shared Name',
      2: 'Prof. Shared Name',
      3: 'Prof. Shared Name',
    });

    fireEvent.change(screen.getByLabelText(/paste section mappings/i), {
      target: {
        value:
          '1\tDr. Nusrat Karim\nSection 2: Md. Imran Hossain\n3, Prof. Tania Rahman',
      },
    });
    fireEvent.click(
      screen.getByRole('button', { name: /apply faculty list/i })
    );

    expect(onSectionFacultyReplace).toHaveBeenLastCalledWith({
      1: 'Dr. Nusrat Karim',
      2: 'Md. Imran Hossain',
      3: 'Prof. Tania Rahman',
    });
  });

  it('shows student counts, extra fields, and opens the importer', () => {
    const onRemoveStudent = vi.fn();

    render(
      <StudentDataPanel
        students={[
          {
            id: '23101001',
            name: 'Alice Rahman',
            section: 1,
            extras: { Program: 'CSE' },
          },
          {
            id: '23101002',
            name: 'Bob Khan',
            section: 2,
            extras: { Shift: 'Morning' },
          },
        ]}
        sections={[1, 2]}
        onImport={vi.fn()}
        onRemoveStudent={onRemoveStudent}
      />
    );

    expect(screen.getByText(/2 students/i)).toBeInTheDocument();
    expect(screen.getByText(/2 sections/i)).toBeInTheDocument();
    expect(screen.getByText(/2 extra fields/i)).toBeInTheDocument();
    expect(screen.getByText('Program')).toBeInTheDocument();
    expect(screen.getByText('Shift')).toBeInTheDocument();
    expect(screen.getByText('CSE')).toBeInTheDocument();
    expect(screen.getByText('Morning')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /import more/i }));
    expect(screen.getByTestId('mock-data-importer')).toHaveTextContent(
      'Import students'
    );

    fireEvent.click(
      screen.getByRole('button', { name: /remove alice rahman/i })
    );
    expect(onRemoveStudent).toHaveBeenCalledWith('23101001');
  });

  it('shows the empty student state before any imports', () => {
    render(
      <StudentDataPanel
        students={[]}
        sections={[]}
        onImport={vi.fn()}
        onRemoveStudent={vi.fn()}
      />
    );

    expect(screen.getByText(/no students yet/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /import students/i })
    ).toBeInTheDocument();
    expect(screen.queryByText(/extra field/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /import students/i }));
    expect(screen.getByTestId('mock-data-importer')).toHaveTextContent(
      'Import students'
    );
  });

  it('shows singular student, section, and extra-field summaries', () => {
    render(
      <StudentDataPanel
        students={[
          {
            id: '23101003',
            name: 'Charlie Noor',
            section: 1,
            extras: { Program: 'CSE' },
          },
        ]}
        sections={[1]}
        onImport={vi.fn()}
        onRemoveStudent={vi.fn()}
      />
    );

    expect(screen.getByText(/1 student/i)).toBeInTheDocument();
    expect(screen.getByText(/1 section/i)).toBeInTheDocument();
    expect(screen.getByText(/1 extra field/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /import more/i })
    ).toBeInTheDocument();
  });

  it('omits section and extra-field summaries when a non-empty list has none', () => {
    render(
      <StudentDataPanel
        students={[
          {
            id: '23101004',
            name: 'Dana Karim',
            section: 1,
          },
        ]}
        sections={[]}
        onImport={vi.fn()}
        onRemoveStudent={vi.fn()}
      />
    );

    expect(screen.getByText(/1 student/i)).toBeInTheDocument();
    expect(screen.queryByText(/1 section/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/extra field/i)).not.toBeInTheDocument();
  });
});
