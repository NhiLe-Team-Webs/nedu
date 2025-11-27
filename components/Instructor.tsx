import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { InstructorProps } from "@/data/instructors";


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
                <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
                  <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)] items-start">
                    <div>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                        {instructor.bio}
                      </p>

                      <div className="space-y-6 sm:space-y-8">
                        <section>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                            Học vấn
                          </h3>
                          <div className="space-y-3 text-sm sm:text-base text-gray-600 leading-relaxed">
                            {Array.isArray(instructor.education) ? (
                              instructor.education.map((edu, index) => (
                                <p key={index}>{edu}</p>
                              ))
                            ) : (
                              <p>{instructor.education}</p>
                            )}
                          </div>
                        </section>

                        <section>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                            Sự nghiệp và các dự án nổi bật
                          </h3>
                          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                            {instructor.career}
                          </p>
                          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                            {instructor.projects.map((project, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-amber-400 font-semibold">
                                  •
                                </span>
                                <span>
                                  <strong>{project.title}:</strong>{" "}
                                  {project.description}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </section>

                        <section>
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                            Thành tích và giải thưởng
                          </h3>
                          <ul className="space-y-2 text-sm sm:text-base text-gray-700">
                            {instructor.achievements.map((achievement, index) => (
                              <li key={index} className="flex gap-2">
                                <span className="text-amber-400 font-semibold whitespace-nowrap">
                                  {achievement.date}
                                </span>
                                <span>{achievement.description}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      </div>
                    </div>

                    <aside className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-lg">
                      <div className="text-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                          {instructor.name}
                        </h3>
                        <div className="bg-amber-400 rounded-xl aspect-square max-w-[220px] mx-auto flex items-center justify-center mb-6">
                          <img
                            src={instructor.image}
                            alt={`${instructor.name} avatar`}
                            loading="lazy"
                            className="object-cover w-full h-full rounded-xl"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                          Nghề nghiệp
                        </h4>
                        <div className="space-y-1 text-base text-gray-800">
                          {instructor.profession.map((job, index) => (
                            <p key={index}>{job}</p>
                          ))}
                        </div>
                      </div>
                    </aside>
                  </div>
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
