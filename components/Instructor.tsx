import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

interface InstructorProps {
  name: string;
  profession: string[];
  bio: string;
  education: string | string[];
  career: string;
  achievements: { date: string; description: string }[];
  projects: { title: string; description: string }[];
  image: string;
}

const Instructor: React.FC<{ instructors: InstructorProps[] }> = ({
  instructors,
}) => {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [selected, setSelected] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      try {
        api.scrollNext();
      } catch (e) {
        // ignore
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api]);

  React.useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-[68px] font-black text-center text-amber-400 uppercase mb-8 sm:mb-10 lg:mb-12">
          Người Dẫn Đường
        </h2>
        <Carousel
          setApi={setApi}
          opts={{ loop: true }}
          className="max-w-4xl sm:max-w-5xl lg:max-w-6xl mx-auto overflow-hidden"
        >
          <CarouselContent>
            {instructors.map((instructor, index) => (
              <CarouselItem key={index}>
                <div className="bg-gray-50 p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md">
                  <h2 className="text-center text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-700">
                    {instructor.name}
                  </h2>
                  <div className="bg-amber-400 aspect-square w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center mb-3 sm:mb-4 rounded-md mx-auto">
                    <img
                      src={instructor.image}
                      alt={`${instructor.name} avatar`}
                      loading="lazy"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                  <table className="w-full mt-3 sm:mt-4 text-sm">
                    <tbody>
                      <tr className="border-t border-gray-300">
                        <th className="py-1 sm:py-2 pr-2 sm:pr-4 text-left font-semibold align-top">
                          Nghề nghiệp
                        </th>
                        <td className="py-1 sm:py-2">
                          {instructor.profession.map((job, index) => (
                            <span key={index} className="block text-xs sm:text-sm">
                              {job}
                            </span>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 sm:mt-6">
                  <p className="mb-4 sm:mb-6 text-gray-600 leading-relaxed text-sm sm:text-base">
                    {instructor.bio}
                  </p>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-700">
                    Học vấn
                  </h3>
                  {Array.isArray(instructor.education) ? (
                    instructor.education.map((edu, index) => {
                      return (
                        <p
                          key={index}
                          className="mb-2 text-gray-600 leading-relaxed text-sm sm:text-base"
                        >
                          {edu}
                        </p>
                      );
                    })
                  ) : (
                    <p className="mb-2 text-gray-600 leading-relaxed text-sm sm:text-base">
                      {instructor.education}
                    </p>
                  )}

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-700">
                    Sự nghiệp và các dự án nổi bật
                  </h3>
                  <p className="mb-3 sm:mb-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                    {instructor.career}
                  </p>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-gray-600 text-sm sm:text-base">
                    {instructor.projects.map((project, index) => (
                      <li key={index}>
                        <strong>{project.title}:</strong> {project.description}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-700">
                    Thành tích và giải thưởng
                  </h3>
                  <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-gray-600 text-sm sm:text-base">
                    {instructor.achievements.map((achievement, index) => (
                      <li key={index}>
                        <strong>{achievement.date}</strong>{" "}
                        {achievement.description}
                      </li>
                    ))}
                  </ul>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Instructor;
