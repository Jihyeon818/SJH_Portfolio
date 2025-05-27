// src/components/ProjectDetailPopup.tsx
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import projectData from '../data/projects.json';
import { skillIcons } from "../components/skillIcons";
import { p1_Devices, p1_UI, p1_timer_detail } from "../images/index";

type ProjectDetailPopupProps = {
  onClose: () => void;
  projectId: number;
};

const ProjectDetailPopup = ({ onClose, projectId }: ProjectDetailPopupProps) => {
  const project = projectData.find((p) => p.id === projectId);

  const imageMap: { [key: string]: string } = {
    p1_Devices,
    p1_UI,
    p1_timer_detail
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center overflow-y-auto px-4 py-10">
      <div className="bg-white w-full max-w-6xl rounded-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        {/* 상단 소개 (이미지 + 설명) */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10" data-aos="fade-up">
          <div className="flex-1">
            <img
              src={imageMap[project.image]}
              alt={`${project.title} main`}
              className="rounded-lg w-full shadow"
            />
          </div>
          <div className="flex-1 space-y-2 text-sm">
            <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
            <p><strong>진행기간:</strong> {project.duration}</p>
            <p><strong>기여도:</strong> {project.contribution}</p>
            <p><strong>설명:</strong> {project.description}</p>
            <div className="flex flex-col gap-2 mt-2">

              {Object.entries(project.skills).map(([category, skills]) => (
                <div key={category} className="flex flex-row gap-3 items-start mb-4">
                  <h4 className="w-24 font-semibold">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => {
                      const skillInfo = skillIcons.find((item) => item.name === skill);
                      return (
                        <div
                          key={skill}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            backgroundColor: skillInfo?.color || "#ccc",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            color: skillInfo?.font || "white",
                            fontSize: "14px",
                          }}
                        >
                          {skillInfo?.icon && <skillInfo.icon size={16} />}
                          <span>{skill}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>

        {/* 상세 섹션들 (2열 구조) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {project.details?.map((section: any, index: number) => (
            <div key={index} className="space-y-2" data-aos="fade-up" data-aos-delay={index * 100}>
              <h3 className="text-xl font-semibold border-b pb-1">{section.title}</h3>
              <img
                src={imageMap[section.image]}
                alt={section.title}
                className="rounded shadow-md"
              />
              <p className="text-sm">{section.content}</p>
            </div>
          ))}
        </div>

        {/* 하단 버튼 */}
        <div className="mt-10 text-center">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPopup;
