/**
 * Returns background color theme based on certification course acronym.
 */
export const getCourseColor = (course: string): string => {
  switch (course) {
    case 'CAMS':
      return '#fef9e9';
    case 'CFE':
      return '#fdf2ff';
    case 'CIA':
      return '#eef6f9';
    default:
      return '#f3fee9';
  }
};
