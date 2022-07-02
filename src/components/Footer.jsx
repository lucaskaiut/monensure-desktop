import { TableHeader } from "./TableHeader";

export function Footer ({ 
    startDueDateFilter, 
    endDueDateFilter, 
    sortOrder, 
    isPaidFilter, 
    selectedBills, 
    setStartDueDateFilter, 
    setEndDueDateFilter, 
    setSortOrder, 
    setIsPaidFilter,
    fetchData
}) { 
    return (
        <div className="absolute bottom-0 left-0 w-full h-10 bg-black">
            <TableHeader 
                fetchData={() => fetchData()} 
                startDueDateFilter={startDueDateFilter}
                endDueDateFilter={endDueDateFilter}
                sortOrder={sortOrder}
                isPaidFilter={isPaidFilter}
                setStartDueDateFilter={setStartDueDateFilter}
                setEndDueDateFilter={setEndDueDateFilter}
                setSortOrder={setSortOrder}
                setIsPaidFilter={setIsPaidFilter}
                selectedBills={selectedBills}
            />
        </div>
    );
}