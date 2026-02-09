"use client";
import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: "Not Started" | "In Progress" | "Completed";
  priority: "High" | "Medium" | "Low";
};

const data: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create the layout and design for the homepage.",
    dueDate: "15th décembre 2023",
    status: "Completed",
    priority: "High",
  },
  {
    id: "2",
    title: "Develop API Endpoints",
    description: "Build RESTful API endpoints for the backend.",
    dueDate: "15th décembre 2023",
    status: "Not Started",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Write Unit Tests",
    description: "Write unit tests for the core functionality.",
    dueDate: "18th décembre 2023",
    status: "In Progress",
    priority: "High",
  },
  {
    id: "4",
    title: "Deploy to Production",
    description: "Deploy the application to the production server.",
    dueDate: "22nd décembre 2023",
    status: "Not Started",
    priority: "Medium",
  },
];

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="max-w-md">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => <div>{row.getValue("dueDate")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        "Completed": "text-green-600 bg-green-50",
        "In Progress": "text-blue-600 bg-blue-50",
        "Not Started": "text-gray-600 bg-gray-50",
      };
      return (
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors]}`}>
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      const priorityColors = {
        "High": "text-red-600",
        "Medium": "text-orange-600",
        "Low": "text-green-600",
      };
      return (
        <div className={`font-medium ${priorityColors[priority as keyof typeof priorityColors]}`}>
          {priority}
        </div>
      );
    },
  },
];

const ProjectSelectionForm = () => {
  const { setValue } = useFormContext();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [selectedTasks, setSelectedTasks] = React.useState<Task[]>([]);
  const [open, setOpen] = React.useState(false);

  // Sync selectedTasks with React Hook Form
  React.useEffect(() => {
    setValue("selectedProjects", selectedTasks);
  }, [selectedTasks, setValue]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleUpdateTasks = () => {
    const selected = table.getFilteredSelectedRowModel().rows.map(row => row.original);
    setSelectedTasks(selected);
    setOpen(false);
  };

  const removeTask = (taskId: string) => {
    setSelectedTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Break down the project into tasks and milestones
        </h2>
        <p className="text-gray-600 text-sm">
          Create a detailed task list with deadlines and priorities to keep your project on track. Add milestones to mark key achievements.
        </p>
      </div>

      {/* Tasks Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Tasks</h3>
        <p className="text-sm text-gray-500 mb-4">Choose the tasks to add in the project</p>

        {/* Selected Tasks Display */}
        {selectedTasks.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-4">
            {selectedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {task.title.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-500">{task.priority}</p>
                </div>
                <button
                  onClick={() => removeTask(task.id)}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Select Task Button & Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-auto">
              Select Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Manage Tasks</DialogTitle>
              <DialogDescription>
                Create and manage tasks for your project. Select the tasks to add to your project
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-auto py-4">
              {/* Table Controls */}
              <div className="flex items-center gap-4 mb-4">
                <Input
                  placeholder="Search a task..."
                  value={
                    (table.getColumn("title")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                    table.getColumn("title")?.setFilterValue(event.target.value)
                  }
                  className="max-w-sm"
                />
              </div>

              {/* Data Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Table Footer */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <Button onClick={handleUpdateTasks}>
                Update Task(s)
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectSelectionForm;
