// components/Header.tsx
import React, { useEffect, useState } from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const sections = ["About me", "Skills", "Projects", "Career"];

const Header = () => {
  const [activeSection, setActiveSection] = useState("About me");
  const [scrolled, setScrolled] = useState(false);
  const email = "jihyeons.dev@gmail.com";
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipText, setTooltipText] = useState("이메일 주소 복사");
  const [tooltipVisibleForGithub, setTooltipVisibleForGithub] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 200);

      const offsetData = sections.map((section) => {
        const id = section.toLowerCase().replace(/ /g, "-");
        const el = document.getElementById(id);
        return { section, offsetTop: el?.offsetTop ?? Number.MAX_SAFE_INTEGER };
      });

      const current = offsetData
        .filter((data) => y >= data.offsetTop - 50)
        .sort((a, b) => b.offsetTop - a.offsetTop)[0];

      if (current) {
        setActiveSection(current.section);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const handleClick = (section: string) => {
    const el = document.getElementById(section.toLowerCase().replace(/ /g, "-"));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    const email = 'jihyeons.dev@gmail.com';

    // HTTPS 환경이면 Clipboard API 사용
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(() => alert('이메일이 복사되었습니다.'))
        .catch((err) => alert('이메일 복사 실패: ' + err));
    } else {
      // 비보안 환경에서는 execCommand 사용
      const textArea = document.createElement('textarea');
      textArea.value = email;
      textArea.style.position = 'fixed';  // 화면 스크롤로부터 안전하게 고정
      textArea.style.left = '-9999px';   // 화면 밖으로 이동
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const success = document.execCommand('copy');
        alert(success ? '이메일이 복사되었습니다.' : '이메일 복사 실패');
      } catch (err) {
        alert('이메일 복사 실패: ' + err);
      }

      document.body.removeChild(textArea);
    }
  };


  return (
    <header className={`fixed top-0 left-0 right-0 z-10 w-full transition-colors duration-300 ${scrolled ? "bg-gray-100" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className={`text-left ${scrolled ? "text-[#12415e]" : "text-white"}`}>
          <h1 className="lg:text-2xl md:text-xl sm:text-xl font-bold leading-tight">
            <p>Jihyeon</p>
            <p className="pl-4 -mt-2">Portfolio</p>
          </h1>
        </div>

        <div className="bg-black rounded-full px-8 py-3 flex items-center space-x-4">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              className={`text-sm transition-colors duration-200 ${
                activeSection === sec ? "text-white font-semibold" : "text-white/50"
              }`}
              onClick={() => handleClick(sec)}
            >
              {activeSection === sec ? sec : "•"}
            </button>
          ))}
        </div>

        <div className={`flex items-center space-x-4 text-2xl ${scrolled ? "text-[#12415e]" : "text-white"}`}>          
          <div className="relative group flex items-center">
            <button
              aria-label="메일주소 복사"
              onClick={copyEmail}
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
              onFocus={() => setTooltipVisible(true)}
              onBlur={() => setTooltipVisible(false)}
            >
              <FaEnvelope />
            </button>

            {/* 툴팁 */}
            {tooltipVisible && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 shadow z-10">
                {tooltipText}
              </div>
            )}
          </div>

          <div className="relative group">
            <a
              href="https://github.com/Jihyeon818"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setTooltipVisibleForGithub(true)}
              onMouseLeave={() => setTooltipVisibleForGithub(false)}
              onFocus={() => setTooltipVisibleForGithub(true)}
              onBlur={() => setTooltipVisibleForGithub(false)}
            >
              <FaGithub />
            </a>

            {tooltipVisibleForGithub && (
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 shadow z-10">
                Jihyeon818
              </div>
            )}
          </div>


        </div>
      </div>
    </header>
  );
};

export default Header;
