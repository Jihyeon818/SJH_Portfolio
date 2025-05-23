import React, { useState, useEffect } from 'react';
import '../assets/styles/main.css';
import ProjectDetailPopup from '../components/Project';
import projectData from "../data/projects.json";
import tablet from '../assets/images/tablet.png';
import labtop from '../assets/images/labtop.png';
import phone from '../assets/images/phone.png';

const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openPopup = (id: number) => {
    setSelectedProjectId(id);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProjectId(null);
  };

  return (
    <>
      <section className="flex flex-col items-center text-center px-6 pt-20 pb-5 relative overflow-hidden max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight">프론트 엔드 개발자 <span className="text-yellow-400">신지현</span> 입니다</h2>
        <p className="text-sm md:text-base mt-5">사용자 편의에 집중하는 개발자 신지현 입니다</p>

        <div className={`absolute inset-0 transition-all duration-1000 ease-out pointer-events-none ${scrolled ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
          <img src={tablet} alt="bg1" className="absolute top-13 left-60 w-40 opacity-10" />
          <img src={labtop} alt="bg2" className="absolute bottom-5 right-60 w-80 opacity-10" />
          <img src={phone} alt="bg3" className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 opacity-10" />
        </div>

        <p className="mt-20 text-xs animate-pulse text-gray-400">^ 더 알아보기</p>
      </section>

      <div id="main" className="bg-white py-10 rounded-t-3xl">
        {/* About Me */}
        <section id="about-me" className="text-black px-6 py-5 rounded-t-3xl max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">About me</h3>
          <div className="space-y-4 text-sm">
            <p>[기획에서 구현까지, 사용자 중심 UI 개발]<br />웹사이트는 단순한 정보 전달 도구가 아니라, 사용자와 브랜드가 만나는 경험이자 접점입니다. 저는 웹 접근성 컨설턴트로서의 5년간의 경험과 프론트엔드 개발자로서의 기술력을 바탕으로, 정보 전달 그 이상의 사용자 경험을 만드는 것에 집중합니다.</p>
            <p>[전문 지식과 다양한 직군과의 협업 경험] 웹 접근성 컨설턴트로 근무하며 기획자, 디자이너, 개발자 등 다양한 직군과 협업하여, 프로젝트의 흐름을 이해하고 조율하는 능력을 길렀습니다. 이는 개발자로서 원활한 커뮤니케이션과 효율적인 개발에 큰 강점이 됩니다.</p>
            <p>[사람들을 이끄는 힘] 프로젝트를 진행하며 팀의 방향을 설정하고 목표를 향해 나아가도록 돕는 역할을 자주 맡았습니다. 이러한 경험은 단순한 개발을 넘어, 팀 전체의 성과를 이끌어내는 프론트엔드 개발자로 성장하는 기반이 되었습니다.</p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="text-black px-6 py-6 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Skills</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Language</strong> - TypeScript, JavaScript, Python</div>
            <div><strong>Frontend</strong> - Next.js, React, Tailwind CSS</div>
            <div><strong>Backend</strong> - Java, MySQL, Spring</div>
            <div><strong>DevOps</strong> - Ncloud, Docker</div>
            <div><strong>Cooperation</strong> - GitHub, Notion, Figma</div>
            <div><strong>Tool</strong> - VSCode, IntelliJ, Photoshop</div>
          </div>
        </section>

        {/* Projects */}
        <div className="bg-gray-100">
          <section id="projects" className="bg-gray-100 text-black px-6 py-8 max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projectData.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-md p-4 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
                  onClick={() => openPopup(project.id)}
                >
                  {/* <img src={project.thumbnail} alt={`${project.title} thumbnail`} className="rounded-lg mb-2 w-full h-32 object-cover" /> */}
                  <h4 className="text-xl font-semibold mb-1">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{project.duration}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {project.tech && project.tech.map((skill: string, index: number) => (
                      <span key={index} className="bg-blue-100 px-2 py-1 rounded">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {isPopupOpen && selectedProjectId !== null && (
              <ProjectDetailPopup onClose={closePopup} projectId={selectedProjectId} />
            )}
          </section>
        </div>

        {/* Career & Education */}
        <section id="contact" className="bg-white text-black px-6 py-8 max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold mb-4 border-b border-gray-300 pb-2">Career & Education</h3>
          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div>
                <h4 className="font-bold">주식회사 헤더스</h4>
                <p className="text-xs">2018.04 ~ 2024.01 / 웹 접근성 컨설턴트</p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  <span className="bg-blue-100 px-2 py-1 rounded">웹 접근성</span>
                  <span className="bg-blue-100 px-2 py-1 rounded">UIUX</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div>
                <h4 className="font-bold">클라우드 기반 자바 웹 & 데브옵스 개발자 과정</h4>
                <p className="text-xs">2024.02 ~ 2024.08</p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  <span className="bg-blue-100 px-2 py-1 rounded">Full-stack</span>
                  <span className="bg-blue-100 px-2 py-1 rounded">Frontend</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-[#004879] text-white text-center py-6">
        <p className="text-sm">©2025. Shin Ji Hyeon. All rights reserved</p>
      </footer>
    </>
  );
};

export default Main;
