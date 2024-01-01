import "../../styles/tables.css";

export default function ColumnFilter({ column }) {
  const { filterValue, setFilter } = column;

  return (
    <span>
      <input
        placeholder="Search..."
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="th-input"
      />
    </span>
  );
}
