export const formatApproverName = (approverNames: string) => {
  const charsToRemove = /\{|\}|"/g;
  const formattedApproversName = approverNames.replace(charsToRemove, '');

  return formattedApproversName;
};
