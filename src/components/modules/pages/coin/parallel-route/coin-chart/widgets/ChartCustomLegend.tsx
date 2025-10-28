// ⚙️ Functional component
const CustomLegend = ({ title }: { title: string }) => {
  const formattedTitle = title
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="text-muted-foreground mt-2 flex items-center justify-center gap-2 text-sm font-medium">
      <div className="bg-primary h-2 w-2 rounded-full" />
      <span className="tracking-wide">{formattedTitle}</span>
    </div>
  );
};
export default CustomLegend;
