import React, { useState, useEffect, useRef } from 'react';
import ProjectDetailPopup from '../components/Project';
import projectData from "../data/projects.json";
import { p1_thumbnail, headers, ncloud, developBG, p2_thumbnail, p3_thumbnail } from "../images/index";
import { skillIcons } from "../components/skillIcons";
import { IoIosArrowUp, IoIosArrowBack , IoIosArrowForward  } from "react-icons/io";
import { FaRegFilePdf } from "react-icons/fa6";
import PdfModal from "../components/PdfModal";

const Main = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const categories = ["Front-end", "Back-end", "DevOps", "Cooperation", "tool"] as const;
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPopup = (id: number) => {
    setSelectedProjectId(id);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProjectId(null);
  };

  const imageMap: { [key: string]: string } = {
    p1_thumbnail, p2_thumbnail, p3_thumbnail
  };

  const getSkillList = (skillsObj: {
    techStack: string[];
    tools: string[];
    designTools: string[];
  }) => {
    return [...skillsObj.techStack, ...skillsObj.tools, ...skillsObj.designTools];
  };

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scroll = (category: string, direction: "left" | "right") => {
    const container = scrollRefs.current[category];
    if (!container) return;
    
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // 버튼 표시 여부를 위한 상태 추가
  const [showButtons, setShowButtons] = useState<{ [key: string]: boolean }>({});

  const handleTouch = (cat: string) => {
    setShowButtons((prev) => ({ ...prev, [cat]: true }));
    // 일정 시간 후 버튼 사라지도록 (선택 사항)
    setTimeout(() => {
      setShowButtons((prev) => ({ ...prev, [cat]: false }));
    }, 3000);
  };

  return (
    <>
      <section
        className={`flex flex-col items-center text-center pt-60 pb-5 relative overflow-hidden mx-auto`}
        style={{ position: 'sticky', top: 0 }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">
            프론트 엔드 개발자 <span className="text-yellow-400 whitespace-nowrap">신지현</span> 입니다
          </h2>
          <p className="text-sm md:text-base mt-5">
            사용자와 <b className="text-yellow-400">소통</b>하는 UI를 만들고, <br/>
            팀과 함께 <b className="text-yellow-400">성장</b>하는 프론트엔드 개발자입니다.
          </p>
        </div>

        <div className="absolute inset-0 w-full h-[600px] overflow-hidden z-0">
          <img src={developBG} alt="" className="w-full h-full object-cover opacity-10" />
        </div>

        <p className="mt-5 text-xs animate-pulse text-white z-20 relative cursor-pointer flex gap-1 items-center" onClick={() => scrollTo("about-me")}>
          <IoIosArrowUp /> 더 알아보기
        </p>
      </section>

      <div id="main" className="relative z-5 bg-white py-10 rounded-t-3xl shadow-md" style={{ boxShadow: '1px -5px 5px -2px rgba(0, 0, 0, 0.1)' }}>
        {/* About me */}
        <section id="about-me" className="text-black px-6 py-5 rounded-t-3xl max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold whitespace-nowrap">About me</h2>
            <div className="flex-1 border-t border-black"></div>
          </div>
          <section id="about" className="bg-white px-6 py-3 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl shadow-md animate-slide-down">
                <h3 className="text-xl font-semibold text-blue-700 mb-3">🧩 사용자 중심 UI 개발</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  웹사이트는 단순한 정보 전달 도구가 아니라, 사용자와 브랜드가 만나는 경험이자 접점입니다.
                  저는 웹 접근성 컨설턴트로서의 5년간의 경험과 프론트엔드 개발자로서의 기술력을 바탕으로,
                  정보 전달 그 이상의 사용자 경험을 만드는 것에 집중합니다.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-xl shadow-md animate-slide-up delay-200">
                <h3 className="text-xl font-semibold text-green-700 mb-3">🤝 협업과 커뮤니케이션</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  웹 접근성 컨설턴트로 근무하며 기획자, 디자이너, 개발자 등 다양한 직군과 협업하여,
                  프로젝트의 흐름을 이해하고 조율하는 능력을 길렀습니다.
                  이는 개발자로서 원활한 커뮤니케이션과 효율적인 개발에 큰 강점이 됩니다.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl shadow-md animate-slide-down delay-400">
                <h3 className="text-xl font-semibold text-yellow-700 mb-3">🌟 팀을 이끄는 힘</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  프로젝트를 진행하며 팀의 방향을 설정하고 목표를 향해 나아가도록 돕는 역할을 자주 맡았습니다.
                  이러한 경험은 단순한 개발을 넘어, 팀 전체의 성과를 이끌어내는 프론트엔드 개발자로 성장하는 기반이 되었습니다.
                </p>
              </div>
            </div>
          </section>
        </section>

        {/* Skills */}
        <section id="skills" className="text-black px-6 py-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 border-t border-black"></div>
            <h2 className="text-3xl font-bold whitespace-nowrap">Skills</h2>
          </div>

          {/* 모바일: 아이콘만, hover 시 툴팁 */}
          <div className="sm:hidden flex flex-col gap-6">
            {categories.map((category) => {
              const skillsInCategory = skillIcons.filter((skill) => skill.category === category);
              return (
                <div
                  key={category}
                  className="relative flex items-center gap-3 px-2"
                  onTouchStart={() => handleTouch(category)}
                  onMouseEnter={() => handleTouch(category)} // PC 대응
                >
                  <span className="font-bold min-w-[100px] shrink-0">{category}</span>

                  <div
                    ref={(el) => {
                      if (el) scrollRefs.current[category] = el;
                    }}
                    className="flex gap-3 overflow-x-auto hide-scrollbar"
                  >
                    {skillsInCategory.map(({ name, icon: Icon, color, font }) => (
                      <div
                        key={name}
                        className="flex-shrink-0 relative group rounded-full p-2"
                        style={{ backgroundColor: color, cursor: "default" }}
                        onTouchStart={() => setTooltip(name)}
                        onMouseEnter={() => setTooltip(name)}
                        onMouseLeave={() => setTooltip(null)}
                      >
                        <Icon size={24} color={font} />
                        {(tooltip === name) && (
                          <span
                            className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2
                              whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1
                              transition-opacity"
                            style={{ zIndex: 10 }}
                          >
                            {name}
                          </span>
                        )}
                      </div>

                    ))}
                  </div>

                  {showButtons[category] && (
                    <>
                      <button
                        onClick={() => scroll(category, "left")}
                        className="absolute left-24 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow p-1 rounded-full"
                      >
                        <IoIosArrowBack className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => scroll(category, "right")}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow p-1 rounded-full"
                      >
                        <IoIosArrowForward className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>


          {/* 태블릿 이상: 카테고리명 + 스킬 카드 (텍스트 길이에 따라 카드 너비 자동) */}
          <div className="hidden sm:flex flex-col gap-4">
            {categories.map((category) => {
              const skillsInCategory = skillIcons.filter((skill) => skill.category === category);
              return (
                <div key={category} className="relative flex items-center gap-4 group" style={{ whiteSpace: "nowrap" }}>
                  <span className="font-bold min-w-[100px]">{category} </span>
                  <div ref={(el) => (scrollRefs.current[category] = el)} className="flex gap-2 overflow-x-auto px-8 hide-scrollbar">
                    {skillsInCategory.map(({ name, icon: Icon, color, font }) => (
                      <div
                        key={name}
                        className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold"
                        style={{ backgroundColor: color, color: font, minWidth: "auto" }}
                      >
                        <Icon size={20} />
                        <span>{name}</span>
                      </div>
                    ))}
                    {/* 좌우 버튼 */}
                    <button
                      onClick={() => scroll(category, "left")}
                      className="absolute left-28 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-white shadow p-2 rounded-full"
                    >
                      <IoIosArrowBack  className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => scroll(category, "right")}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 bg-white/80 hover:bg-white shadow p-2 rounded-full"
                    >
                      <IoIosArrowForward  className="w-5 h-5" />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        {/* Projects */}
        <div className="bg-gray-100">
          <section id="projects" className="bg-gray-100 text-black px-6 py-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl font-bold whitespace-nowrap">Projects</h2>
            <div className="flex-1 border-t border-black"></div>
          </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projectData.map((project) => {
                const projectSkills = getSkillList(project.skills).slice(0, 5); // 각 프로젝트별 상위 5개 추출
                return(
                <div key={project.id} className="bg-white rounded-2xl shadow-md p-4 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl" onClick={() => openPopup(project.id)}>
                  <img src={imageMap[project.thumbnail]} alt={`${project.title} thumbnail`} className="rounded-lg mb-2 w-full h-32 object-cover object-top" />
                  <h4 className="text-xl font-semibold mb-1">{project.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">{project.duration}</p>
                  <ul className="text-gray-600 text-xs mb-3 list-disc list-inside">
                    {project.part.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                  <div className="grid grid-cols-5 gap-2 w-full max-w-4xl mx-auto">
                    {projectSkills.map((skill) => {
                      const skillInfo = skillIcons.find((item) => item.name === skill);
                      return (
                        <div
                          key={skill}
                          className="aspect-square flex flex-col justify-center items-center text-center rounded-lg shadow-sm"
                          style={{
                            backgroundColor: skillInfo?.color || "#ccc",
                            color: skillInfo?.font || "#fff",
                          }}
                        >
                          {skillInfo?.icon && <skillInfo.icon size={24} />}
                          <span
                            className="text-xs break-words w-full text-center mt-1 hidden md:block"
                            style={{ fontSize: "clamp(10px, 2.5vw, 10px)" }}
                          >
                            {skill}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                )
              })}
            </div>

            {isPopupOpen && selectedProjectId !== null && (
              <ProjectDetailPopup onClose={closePopup} projectId={selectedProjectId} />
            )}
          </section>
        </div>

        {/* Career & Education */}
        <section id="Career" className="bg-white text-black px-6 py-8 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 border-t border-black"></div>
            <h2 className="text-3xl font-bold whitespace-nowrap">Career & Education</h2>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              {/* 이미지 영역 */}
              <div className="w-20 h-20 min-w-[5rem] min-h-[5rem] rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0">
                <img src={headers} alt="headers Logo" className="w-12 h-12 object-contain" />
              </div>

              {/* 텍스트 영역 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold">주식회사 헤더스</h4>
                  <button
                    onClick={() => setIsPdfOpen(true)}
                    className="flex gap-1 items-center text-xs px-2 py-1 border-2 border-yellow-300 rounded-md animate-pulse hover:animate-none"
                    >
                  more <FaRegFilePdf /> 
                  </button>

                  <PdfModal
                    isOpen={isPdfOpen}
                    onClose={() => setIsPdfOpen(false)}
                    pdfUrl="/companyExperience.pdf"
                  />
                </div>
                <p className="text-sm mt-2">
                  2018.04 ~ 2024.01 <span className="text-[#0f2d41]">| IT컨설팅팀 · 선임 6년차· 웹표준·웹접근성</span>
                </p>
                <div className="flex flex-wrap gap-1 mt-2 text-xs">
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">웹 접근성</span>
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">웹 품질관리 컨설턴트</span>
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">UIUX</span>
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">사용자평가</span>
                </div>
                <div className="text-sm ml-2 mt-3">
                  <div className="mb-2 pb-4 border-b border-b-[#ccc]">
                    <p className="pl-2 mb-2 pb-1 border-l-4 border-[#1d5b39]">
                    웹 표준·웹 접근성 진단 및 컨설팅
                    <span className="text-xs text-[#4e4e4e]"> 2018.04. ~ 2024. 01.</span> 
                    </p>
                    <p className="text-xs ml-3">
                      변화하는 기술 환경에 맞는 웹 접근성 최신 기술(기기 및 브라우저 환경별 렌더링 차이, WAI-ARIA 등) 및 에러 사항에 대한 웹 접근성 가이드 개선 참여
                    </p>
                  </div>
                  <div className="mb-2 pb-4 border-b border-b-[#ccc]">
                    <p className="pl-2 mb-2 pb-1 border-l-4 border-[#1d5b39]">
                    공공 웹사이트 UI/UX 국민평가 설계 및 분석 담당
                    <span className="text-xs text-[#4e4e4e]"> 2023.07 ~ 2023. 12.</span> 
                    </p>
                    <p className="text-xs ml-3">
                    2023년 국내 웹사이트 사용자 경험 설문지 제작(평가문항 및 60개 웹사이트별 사용자 시나리오 및 TASK 선정) 및 통계·분석
                    </p>
                  </div>
                  <div className="mb-2 pb-4 border-b border-b-[#ccc]">
                    <p className="pl-2 mb-2 pb-1 border-l-4 border-[#1d5b39]">
                    방송 3사 웹 접근성 인증마크 획득
                    <span className="text-xs text-[#4e4e4e]"> 2019. 05 ~ 2020. 01. | 2022. 02 ~ 2022. 05.</span> 
                    </p>
                    <p className="text-xs ml-3">
                    웹, 앱 접근성 개선을 통한 소개 서비스 인증마크 획득<br/>
                    기획자, 디자이너, 퍼블리셔, 개발자를 위한 웹 접근성 교육 자료 제작
                    </p>
                  </div>
                </div>
              </div>
            </div>            
            <div className="flex gap-4">
                <div className="w-20 h-20 min-w-[5rem] min-h-[5rem] rounded-full bg-white flex items-center justify-center shadow-md flex-shrink-0">
                <img src={ncloud} alt="DevOps Ncloud platform Logo" className="w-12 h-12 object-contain"/>
              </div>
              <div>
                <h4 className="font-bold">클라우드 기반 자바 웹 & 데브옵스 개발자 과정</h4>
                <p className="text-sm mt-2">2024.02. ~ 2024.08. <span className="text-[#0f2d41]">| 클라우드 기반 자바 웹 & 데브옵스 개발자 과정 이수</span></p>
                <div className="flex flex-wrap gap-1 mt-2 text-xs">
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">Frontend</span>
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">Backend</span>
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">웹 기획</span>
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">웹 디자인</span>
                  <span className="bg-[#1d5b39] text-white px-2 py-1 rounded">DevOps</span>
                </div>
                <div className="text-sm ml-2 mt-3">
                  <div className="mb-2 pb-4 border-b border-b-[#ccc]">
                    <p className="pl-2 mb-2 pb-1 border-l-4 border-[#1d5b39]">
                    JSP 팀 프로젝트
                    <span className="text-xs text-[#4e4e4e]"> 2024.06. ~ 2024. 0.7</span> 
                    </p>
                    <p className="text-xs ml-3">
                      JSP, Spring MVC를 이용한 5인 팀 프로젝트 중 UI 디자인인 및 프론트엔드 담당
                    </p>
                  </div>
                  <div className="mb-2 pb-4 border-b border-b-[#ccc]">
                    <p className="pl-2 mb-2 pb-1 border-l-4 border-[#1d5b39]">
                    React, Spring Boot 팀 프로젝트
                    <span className="text-xs text-[#4e4e4e]"> 2024.07 ~ 2024. 08.</span> 
                    </p>
                    <p className="text-xs ml-3">
                      React, Spring Boot를 이용한 6인 팀 프로젝트 중 UI 디자인인 및 프론트엔드 담당
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#1d5b39] text-white text-center py-6">
        <p className="text-sm">©2025. Shin Ji Hyeon. All rights reserved</p>
      </footer>
    </>
  );
};

export default Main;
