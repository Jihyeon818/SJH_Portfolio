import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
     <>
      <Header />
      <section className="hero">
        <div className="container">
          <h2>프론트엔드 개발자 <span className="highlight">신지현</span> 입니다</h2>
          <p>사용자 편의에 집중하는 개발자 신지현입니다</p>
          <a href="#about" className="btn">더 알아보기</a>
        </div>
      </section>

      <section id="about" className="about">
        <div className="container">
          <h2>About me</h2>
          <p>사용자 중심의 기획과 협업을 중요하게 생각합니다. 다양한 경험과 소통 역량을 바탕으로 프로젝트를 이끌었습니다.</p>
        </div>
      </section>

      <section className="skills">
        <div className="container">
          <h2>Skills</h2>
          <div className="skill-grid">
            <div>
              <h3>Language</h3>
              <p>TypeScript, JavaScript, Python</p>
            </div>
            <div>
              <h3>Frontend</h3>
              <p>React, Next.js, Recoil, Sass, Tailwind CSS</p>
            </div>
            <div>
              <h3>Backend</h3>
              <p>Java, MySQL, Spring</p>
            </div>
            <div>
              <h3>DevOps</h3>
              <p>Docker, Ncloud</p>
            </div>
            <div>
              <h3>Tool</h3>
              <p>VSCode, GitHub, Figma, Photoshop, Illustrator</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects">
        <div className="container">
          <h2>Projects</h2>
          <div className="project-list">
            <div className="project-card">
              <img src="project1.png" alt="Project 1" />
              <h3>All’s – 스터디</h3>
              <p>2024.06 ~ 07<br />스터디 플랫폼을 기획부터 개발까지 경험하며 완성한 프로젝트입니다.</p>
            </div>
          </div>
          <div className="project-list">
            <div className="project-card">
              <img src="project1.png" alt="Project 1" />
              <h3>All’s – 스터디</h3>
              <p>2024.06 ~ 07<br />스터디 플랫폼을 기획부터 개발까지 경험하며 완성한 프로젝트입니다.</p>
            </div>
          </div>
          <div className="project-list">
            <div className="project-card">
              <img src="project1.png" alt="Project 1" />
              <h3>All’s – 스터디</h3>
              <p>2024.06 ~ 07<br />스터디 플랫폼을 기획부터 개발까지 경험하며 완성한 프로젝트입니다.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="career" className="career">
        <div className="container">
          <h2>Career & Education</h2>
          <div className="career-entry">
            <h3>주식회사 헤더스</h3>
            <p>2018.04 ~ 2024.01</p>
            <ul>
              <li>표준화 컨설팅 및 UI/UX 기획</li>
              <li>금융사이트 UXUI 국민평가 설계 및 분석</li>
            </ul>
          </div>
          <div className="career-entry">
            <h3>클라우드 기반 자바 웹 &amp; 데브옵스 개발자 과정</h3>
            <p>2024.02 ~ 2024.08</p>
            <p>풀스택 기반 웹 서비스 개발자 과정 수료</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
