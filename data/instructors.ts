export interface InstructorProps {
  id: string;
  name: string;
  profession: string[];
  bio: string;
  education: string | string[];
  career: string;
  achievements: { date: string; description: string }[];
  projects: { title: string; description: string }[];
  image: string;
}

export const instructors: InstructorProps[] = [
  {
    id: "nhi-le",
    name: "NhiLe",
    profession: ["program_detail.instructors.nhi_le.profession.0"],
    bio: "program_detail.instructors.nhi_le.bio",
    education: [
      "program_detail.instructors.nhi_le.education.0"
    ],
    career: "program_detail.instructors.nhi_le.career",
    achievements: [
      {
        date: "2025-04",
        description: "program_detail.instructors.nhi_le.achievements.0.description",
      },
      {
        date: "2025-08",
        description: "program_detail.instructors.nhi_le.achievements.1.description",
      },
    ],
    projects: [
      {
        title: "program_detail.instructors.nhi_le.projects.youtube.title",
        description: "program_detail.instructors.nhi_le.projects.youtube.description",
      },
      {
        title: "program_detail.instructors.nhi_le.projects.community.title",
        description: "program_detail.instructors.nhi_le.projects.community.description",
      },
      {
        title: "program_detail.instructors.nhi_le.projects.foundation.title",
        description: "program_detail.instructors.nhi_le.projects.foundation.description",
      },
      {
        title: "program_detail.instructors.nhi_le.projects.podcast.title",
        description: "program_detail.instructors.nhi_le.projects.podcast.description",
      },
    ],
    image: "/picture/nhile_new.jpg",
  },
  {
    id: "mel",
    name: "Mel",
    profession: ["program_detail.instructors.mel.profession.0"],
    bio: "program_detail.instructors.mel.bio",
    image: "/picture/mel.jpg",
    achievements: [],
    projects: [],
    education: "program_detail.instructors.mel.education",
    career: "program_detail.instructors.mel.career",
  },
  {
    id: "linda-hui-isaac",
    name: "Linda Hui-Isaac",
    profession: ["program_detail.instructors.linda_hui_isaac.profession.0"],
    bio: "program_detail.instructors.linda_hui_isaac.bio",
    image: "/picture/linda.jpg",
    education: [
      "program_detail.instructors.linda_hui_isaac.education.0",
      "program_detail.instructors.linda_hui_isaac.education.1",
    ],
    career: "program_detail.instructors.linda_hui_isaac.career",
    achievements: [
      {
        date: "2025",
        description: "program_detail.instructors.linda_hui_isaac.achievements.0.description",
      },
      {
        date: "2025",
        description: "program_detail.instructors.linda_hui_isaac.achievements.1.description",
      },
      {
        date: "2025",
        description: "program_detail.instructors.linda_hui_isaac.achievements.2.description",
      },
      {
        date: "2025",
        description: "program_detail.instructors.linda_hui_isaac.achievements.3.description",
      },
      {
        date: "2025",
        description: "program_detail.instructors.linda_hui_isaac.achievements.4.description",
      },
      {
        date: "2025",
        description: "program_detail.instructors.linda_hui_isaac.achievements.5.description",
      },
      {
        date: "2025",
        description: "program_detail.instructors.linda_hui_isaac.achievements.6.description",
      },
    ],
    projects: [
      {
        title: "program_detail.instructors.linda_hui_isaac.projects.founder.title",
        description: "program_detail.instructors.linda_hui_isaac.projects.founder.description",
      },
      {
        title: "program_detail.instructors.linda_hui_isaac.projects.trainer.title",
        description: "program_detail.instructors.linda_hui_isaac.projects.trainer.description",
      },
      {
        title: "program_detail.instructors.linda_hui_isaac.projects.ai_strategy.title",
        description: "program_detail.instructors.linda_hui_isaac.projects.ai_strategy.description",
      },
      {
        title: "program_detail.instructors.linda_hui_isaac.projects.inbound.title",
        description: "program_detail.instructors.linda_hui_isaac.projects.inbound.description",
      },
      {
        title: "program_detail.instructors.linda_hui_isaac.projects.content.title",
        description: "program_detail.instructors.linda_hui_isaac.projects.content.description",
      },
      {
        title: "program_detail.instructors.linda_hui_isaac.projects.training.title",
        description: "program_detail.instructors.linda_hui_isaac.projects.training.description",
      },
    ],
  },
];

// Helper function to get instructor by id
export const getInstructorById = (id: string): InstructorProps | undefined => {
  return instructors.find(instructor => instructor.id === id);
};

// Helper function to get instructors by ids
export const getInstructorsByIds = (ids: string[]): InstructorProps[] => {
  return instructors.filter(instructor => ids.includes(instructor.id));
};

// Helper function to get all instructors
export const getAllInstructors = (): InstructorProps[] => {
  return instructors;
};
