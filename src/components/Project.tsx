// src/components/ProjectDetailPopup.tsx
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import projectData from '../data/projects.json';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-typescript.min';
import { skillIcons } from "../components/skillIcons";
import { p1_Devices, p1_UI, p1_timer_detail, p1_grid, p1_design_guide, p1_file_folder, p1_timer, p1_timer_DB, p1_slide, p1_chart } from "../images/index";
import { FaGithub } from "react-icons/fa";

type ProjectDetailPopupProps = {
  onClose: () => void;
  projectId: number;
};

const ProjectDetailPopup = ({ onClose, projectId }: ProjectDetailPopupProps) => {
  const [loaded, setLoaded] = useState(false);
  
  const project = projectData.find((p) => p.id === projectId);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 팝업 바깥쪽(암막)이 눌렸는지 확인
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const imageMap: { [key: string]: string } = {
    p1_Devices,
    p1_UI,
    p1_timer_detail,
    p1_grid,
    p1_design_guide,
    p1_file_folder,
    p1_timer,
    p1_timer_DB,
    p1_slide,
    p1_chart
  };

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  
  useEffect(() => {
    Prism.highlightAll();
  }, [projectId]); // projectId가 바뀔 때마다 하이라이팅

    useEffect(() => {
      const timer = setTimeout(() => setLoaded(true), 100); // 짧은 지연 후 width transition 발동
      return () => clearTimeout(timer);
    }, []);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto" aria-modal="true" onClick={handleOverlayClick}>
      {/* 팝업 박스 */}
      <div className="relative bg-white w-full max-w-5xl mx-auto mt-20 mb-10 p-10 rounded-xl shadow-lg z-20">
        {/* 닫기 버튼
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button> */}

        {/* 상단 소개 (이미지 + 설명) */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10" data-aos="fade-up">
          <div className="flex-1">
            <div className="mb-3">
              <h3 className="text-xl font-bold mb-1">{project.subtitle}</h3>
              <h2 className="text-4xl font-bold mb-2">{project.title}</h2>
              <div className="flex justify-between">
                <p className="text-xs max-w-80">{project.summary}</p>
                <a href={project.git} target='blank' className="text-xs flex items-center"><FaGithub/><span className="ml-1">{project.gitname}</span></a>
              </div>
            </div>
            <img
              src={imageMap[project.image]}
              alt={`${project.alt} main`}
              className="rounded-lg w-full"
            />
          </div>

          <div className="flex-1 space-y-4 text-sm mt-8">

            {/* 진행기간 및 팀원 */}
            <div className="flex">
              <span className="w-20 font-semibold">진행일정</span>
              <span>{project.duration} | {project.teamSize}</span>
            </div>

            {/* 기여도 */}
            <div className="flex">
              <div className="w-24 font-semibold self-start">기여도</div>
              <div className="flex flex-col space-y-2 w-full">
                {project.contributions.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="w-24">{item.role}</span>
                    {/* 그래프 영역 */}
                    <div className="flex-1 bg-gray-200 rounded h-3 overflow-hidden relative">
                      <div
                        className="bg-[#336A6A] h-full rounded transition-all duration-1000 ease-out"
                        style={{ width: loaded ? item.percentage : "0%" }}
                      />
                    </div>
                    <span className="w-10 text-right">{item.percentage}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 주요 역할 */}
            <div className="flex">
              <span className="w-20 font-semibold">주요역할</span>
                <ul className="space-y-2">
                  {project.part.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
            </div>

            {/* 사용 기술 */}
            <div>
              <div className="flex">
                <span className="w-20 font-semibold">사용기술</span>
                <div className="flex flex-wrap gap-2">
                  {project.skills.techStack.map((skill) => {
                    const info = skillIcons.find((item) => item.name === skill);
                    return (
                      <div
                        key={skill}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: info?.color || "#ccc",
                          color: info?.font || "#fff",
                        }}
                      >
                        {info?.icon && <info.icon size={14} />}
                        <span>{skill}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 협업툴 */}
            <div>
              <div className="flex">
                <span className="w-20 font-semibold">협업툴</span>
                <div className="flex flex-wrap gap-2">
                  {project.skills.tools.map((tool) => {
                    const info = skillIcons.find((item) => item.name === tool);
                    return (
                      <div
                        key={tool}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: info?.color || "#ccc",
                          color: info?.font || "#fff",
                        }}
                      >
                        {info?.icon && <info.icon size={14} />}
                        <span>{tool}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 디자인 툴 */}
            <div>
              <div className="flex">
                <span className="w-20 font-semibold">디자인</span>
                <div className="flex flex-wrap gap-2">
                  {project.skills.designTools.map((tool) => {
                    const info = skillIcons.find((item) => item.name === tool);
                    return (
                      <div
                        key={tool}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                        style={{
                          backgroundColor: info?.color || "#ccc",
                          color: info?.font || "#fff",
                        }}
                      >
                        {info?.icon && <info.icon size={14} />}
                        <span>{tool}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold whitespace-nowrap">담당업무 및 기여 상세</h2>
          {/* <div className="flex-1 border-t border-[#B1C8E2]"></div> */}
        </div>


        {/* 상세 섹션들 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {project.details.map((section, sectionIdx) => (
            <div key={sectionIdx} className="space-y-2" data-aos="fade-up">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <div className="flex-1 border-t border-[#97b4a5]"></div>
              </div>

              {section.blocks?.map((block: any, i: number) => {
                if (block.type === "text") {
                  return <p key={i} className="text-sm">{block.content}</p>;
                } else if (block.type === "image") {
                  return (
                    <img
                      key={i}
                      src={imageMap[block.src]}
                      alt={block.alt}
                      className="rounded shadow-md"
                    />
                  );
                } else if (block.type === "image-group") {
                  return (
                    <div key={i} className="flex gap-2">
                      {block.images.map((img: any, j: number) => (
                        <img
                          key={j}
                          src={imageMap[img.src]}
                          alt={img.alt}
                          className="rounded shadow-md w-1/3"
                        />
                      ))}
                    </div>
                  );
                } else if (block.type === "code") {
                  return (
                    <pre key={i}   className="bg-gray-900 text-white font-mono rounded p-4 overflow-x-auto whitespace-pre" style={{ fontSize: "0.5em", lineHeight: "1.4" }}>
                      <code className={`language-${block.language}`}>
                        {block.content}
                      </code>
                    </pre>
                  );
                }
                return null;
              })}
              
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
