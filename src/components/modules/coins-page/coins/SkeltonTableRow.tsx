// 📌 Directives

// 📦 Third-Party imports
import { Skeleton } from '~core/ui/shadcn/skeleton';
import { TableCell } from '~core/ui/shadcn/table';

// 📦 Internal imports

// ⚙️ Functional component
const SkeltonTableRow = () => {
  return (
    <>
      {/* Index */}
      <TableCell>
        <div className="flex h-full items-center">
          <Skeleton className="h-10 w-2" />
        </div>
      </TableCell>

      {/* Favorite button */}
      <TableCell>
        <div className="flex h-full items-center">
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>
      </TableCell>

      {/* Pair */}
      <TableCell>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="mt-2 h-3 w-28" />
          </div>
        </div>
      </TableCell>

      {/* Price */}
      <TableCell>
        <div className="flex h-full items-center">
          <Skeleton className="h-3 w-24" />
        </div>
      </TableCell>

      {/* Changes */}
      {Array.from({ length: 5 }).map((_, index) => (
        <TableCell key={index}>
          <div className="flex h-full items-center">
            <Skeleton className="h-3 w-28" />
          </div>
        </TableCell>
      ))}

      {/* Spark chart */}
      <TableCell>
        <Skeleton className="h-8 w-28" />
      </TableCell>

      <TableCell></TableCell>
    </>
  );
};
export default SkeltonTableRow;
