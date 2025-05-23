import React from "react";
import projectData from "../data/projects.json";


type Contribution = {
  role: string;
  percent: number;
};

type Project = {
  id: number;
  title: string;
  duration: string;
  contributions: Contribution[];
  features: string[];
  tech: string[];
  tools: string[];
  design: string[];
  images: string[];
};

type Props = {
  onClose: () => void;
  projectId: number;
};

const ProjectDetailPopup: React.FC<Props> = ({ onClose, projectId }) => {
  const project: Project | undefined = projectData.find((p) => p.id === projectId);

  if (!project) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-5xl max-h-[90%] overflow-y-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="mb-2 text-gray-600">진행일정: {project.duration}</p>

        <div className="mb-4">
          <strong>기여도</strong>
          <ul className="list-disc ml-6">
            {project.contributions.map((item, index) => (
              <li key={index}>{item.role}: {item.percent}%</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <strong>주요 역할</strong>
          <ul className="list-disc ml-6">
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <strong>사용 기술:</strong> {project.tech.join(", ")}<br />
          <strong>협업 툴:</strong> {project.tools.join(", ")}<br />
          <strong>디자인:</strong> {project.design.join(", ")}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.images.map((src, index) => (
            <img key={index} src={src} alt={`screenshot-${index}`} className="rounded border" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPopup;
