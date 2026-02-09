
table={
     // Sorting state

functions:getState().sorting // Current sorting state
function:getIsSorted() // Check if any column is sorted
function:getSortedRowModel() // Get sorted rows

// Filtering state  
function:getState().columnFilters // Current filters
function:getColumn("email")?.getFilterValue() // Get specific column filter

// Column visibility
function:getState().columnVisibility // Which columns are visible
function:getColumn("status")?.getIsVisible() // Check if specific column is visible

// Row selection
function:getState().rowSelection // Selected row IDs
function:getIsAllRowsSelected() // Check if all rows selected
function:getIsSomeRowsSelected() // Check if some rows selected

// Get rows
function:getRowModel().rows // All rows =====================================================================
function:getFilteredRowModel().rows // Filtered rows
function:getSortedRowModel().rows // Sorted rows
function:getSelectedRowModel().rows // Selected rows

// Row counts
function:getRowCount() // Total rows
function:getFilteredRowModel().rows.length // Filtered row count
function:getSelectedRowModel().rows.length // Selected row count


headerGroup 
// Column access
table.getAllColumns() // All columns  ===========================================================================
table.getVisibleFlatColumns() // Visible columns
table.getColumn("email") // Get specific column

// Column manipulation
table.getColumn("email")?.toggleSorting() // Toggle sorting on email
table.getColumn("status")?.toggleVisibility(false) // Hide status column




// Pagination state
table.getState().pagination // Current page info
table.getPageCount() // Total number of pages
table.getCanPreviousPage() // Can go to previous page?
table.getCanNextPage() // Can go to next page?

// Pagination actions
table.nextPage() // Go to next page
table.previousPage() // Go to previous page
table.setPageIndex(2) // Go to specific page
table.setPageSize(10) // Change page size
}






headerGroup=[
  {
    id: "header-group-root", // Unique ID
    depth: 0, // Always 0 for single-level headers
    headers: [/* Array of 5 Header objects */],
    
    // For your specific table, headers array contains:
    headers: [
      Header { id: "select", column: Column{id: "select", ...}, ... },
      Header { id: "status", column: Column{id: "status", ...}, ... },
      Header { id: "email", column: Column{id: "email", ...}, ... },
      Header { id: "amount", column: Column{id: "amount", ...}, ... },
      Header { id: "actions", column: Column{id: "actions", ...}, ... }
    ]
  }
]

header={
  id: "header-email", // or similar unique ID
  column: {
    // This is the column object for "email"
    id: "email",
    columnDef: {
      accessorKey: "email",
      header: ({ column }) => {
        // Your header component function
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>
    },
    getIsVisible: () => true,
    getCanSort: () => true,
    getIsSorted: () => "asc" || "desc" || false,
    toggleSorting: function() { ... },
    // ... other column methods
  },
  colSpan: 1, // Spans 1 column
  rowSpan: 1, // Spans 1 row
  isPlaceholder: false, // Not a placeholder
  depth: 0, // Top level
  index: 2, // Third header (0-based)
  
  // Context passed to flexRender
  context: {
    table: table, // The table instance
    column: column, // The column object above
    header: this, // This header object itself
  },
  
  // Position info (for virtualized/scrolling)
  getSize: () => 200, // Width in pixels
  getStart: () => 300, // Starting position
  getEnd: () => 500, // Ending position
  
  // For grouped columns (not used in your example)
  subHeaders: [], // Empty array in your case
  parent: undefined, // No parent header
  placeholderId: undefined // No placeholder ID
}


// Each row in table.getRowModel().rows
const row = {
  id: "m5gr84i9", // Row ID (based on your data's id field)
  original: {
    // Your original data object
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com"
  },
  index: 0, // Row index (0-based)
  depth: 0, // Nesting depth (for grouped/expanded rows)
  
  // Selection state
  getIsSelected: () => boolean,
  getIsSomeSelected: () => boolean, // For nested rows
  getToggleSelectedHandler: () => () => void,
  toggleSelected: (value?: boolean) => void,
  
  // Expansion state (for expandable rows)
  getIsExpanded: () => boolean,
  getCanExpand: () => boolean,
  getToggleExpandedHandler: () => () => void,
  toggleExpanded: (value?: boolean) => void,
  
  // Data access methods
  getValue: (columnId: string) => any, // Get value for a column
  getVisibleCells: () => Cell[], // Get visible cells in this row
  
  // Parent/child relationships (for nested rows)
  subRows: [], // Empty array in your case
  parentId: undefined, // No parent row
  getParentRow: () => Row | undefined,
  getLeafRows: () => Row[],
  
  // Unique IDs
  originalSubRows: [], // Original nested data
  getAllCells: () => Cell[], // All cells (including hidden)
  
  // Position and styling
  getIsPinned: () => boolean,
  getCenterVisibleCells: () => Cell[],
  getLeftVisibleCells: () => Cell[],
  getRightVisibleCells: () => Cell[],
}



display seelcted members dislay tema leder member items