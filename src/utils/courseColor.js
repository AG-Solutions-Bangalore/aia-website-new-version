export const getCourseColor = (course) => {
  switch (course) {
    case "CAMS":
      return "#fef9e9";
    case "CFE":
      return "#fdf2ff";
    case "CIA":
      return "#eef6f9";
    default:
      return "#f3fee9";
  }
};
