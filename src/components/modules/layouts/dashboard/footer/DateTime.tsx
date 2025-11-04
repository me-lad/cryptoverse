// ⚙️ Functional component
const DateTime = () => {
  const formatter = () => {
    return new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: 'long',
      weekday: 'long',
    });
  };

  return <div className="text-sm opacity-70">{formatter()}</div>;
};
export default DateTime;
