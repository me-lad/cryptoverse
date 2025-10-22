export const buildSearchSource = (sourcesParam?: string) => {
  return (sourcesParam || '5').split(',').slice(-1)[0];
};
