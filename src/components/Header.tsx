// components/Header.tsx
import React, { useEffect, useState } from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";

const sections = ["About me", "Skills", "Projects", "Career"];

const Header = () => {
  const [activeSection, setActiveSection] = useState("About me");
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 w-full transition-colors duration-300 ${scrolled ? "bg-gray-100" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className={`text-left ${scrolled ? "text-[#12415e]" : "text-white"}`}>
          <h1 className="text-2xl font-bold leading-tight">
            <p>Jihyeon</p>
            <p className="pl-4 -mt-2">Portfolio</p>
          </h1>
        </div>

        <div className="bg-black rounded-full px-8 py-3 flex items-center space-x-4">
          {sections.map((sec, idx) => (
            <button
              key={idx}
              className={`text-sm focus:outline-none transition-colors duration-200 ${
                activeSection === sec ? "text-white font-semibold" : "text-white/50"
              }`}
              onClick={() => handleClick(sec)}
            >
              {activeSection === sec ? sec : "•"}
            </button>
          ))}
        </div>

        <div className={`flex items-center space-x-4 text-2xl ${scrolled ? "text-[#12415e]" : "text-white"}`}>
          <a href="https://github.com/Jihyeon818" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <button aria-label="메일주소 복사">
            <FaEnvelope />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
