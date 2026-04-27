import { IMAGE_PATH } from "@/api/base-url";

const CourseHero = ({ path }) => {
  return (
    <div>
      <img
        src={`${IMAGE_PATH}/${path}`}
        alt="CAMS Hero Banner"
        className=" inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default CourseHero;
