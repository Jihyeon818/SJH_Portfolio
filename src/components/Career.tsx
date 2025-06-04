import React, { useState, useEffect } from "react";
// import Image from "next/image";
import careerData from "../data/careea.json";
import { LuDot } from "react-icons/lu";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdOpenInNew } from "react-icons/md";
import {
  career1_1, career1_2, career1_3,
  career2_1, career2_2, career2_3, career2_4,
  career3_1, career3_2,
} from "../images/index";
import AOS from "aos";
import "aos/dist/aos.css";

interface CareerDetailPopupProps {
  open: boolean;
  onClose: () => void;
}

const CareerDetailPopup: React.FC<CareerDetailPopupProps> = ({ open, onClose }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null); // 👈 추가


  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

    const openImageFullscreen = (src: string) => {
    setFullscreenImage(src);
  };

    const closeImageFullscreen = () => {
      setFullscreenImage(null);
    };


  const imageMap: { [key: string]: string } = {
    career1_1, career1_2, career1_3,
    career2_1, career2_2, career2_3, career2_4,
    career3_1, career3_2,
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      aria-modal="true"
      onClick={handleOverlayClick}
    >

      {/* 이미지 전체 화면 팝업 */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center cursor-zoom-out"
          onClick={closeImageFullscreen}
          tabIndex={-1}
          role="dialog"
          aria-label="이미지 확대 보기"
        >
          <img
            src={fullscreenImage}
            alt="fullscreen"
            className="max-w-[90%] max-h-[90%] rounded shadow-2xl transition-transform duration-300 ease-in-out transform scale-100 opacity-100 animate-zoom-in"
          />
        </div>
      )}

      <div
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg p-6 relative"
        data-aos="zoom-in"
        data-aos-duration="600"
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-paytone text-xl text-[#9FBCDB]">Career</h3>
        <h2 className="text-2xl font-bold mb-6">경력기술서</h2>

        <div className="space-y-10">
          {careerData.map((career, idx) => (
            <section key={idx} className="space-y-2">
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-lg font-semibold">{career.title}</h3>
                <div className="flex-1 border-t border-[#142975]"></div>
              </div>

              <div className="space-y-2 text-sm p-2">
                <dl className="flex">
                  <dt className="w-28 font-semibold">업체 및 기간</dt>
                  <dd className="flex-1 space-y-1">
                    {career.period.map((period, index) => (
                      <div key={index}>{period}</div>
                    ))}
                  </dd>
                </dl>

                <button
                  className="flex items-center w-fit hover:bg-yellow-100"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  title={openIndex === idx ? "닫기" : "열기"}
                >
                  <dl className="flex items-start">
                    <dt className="flex w-28 shrink-0 font-semibold items-center">
                      주요 업무 성과 {openIndex === idx ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </dt>
                    <dd>
                      <span className="flex-1 text-sm text-gray-800">
                        {career.works.map((work) => work.title).join(", ")}
                      </span>
                    </dd>
                  </dl>
                </button>

                {openIndex === idx && (
                  <div className="bg-gray-100 p-4 rounded-2xl">
                    <ul className="space-y-2">
                      {career.works.map((work, i) => (
                        <li key={i} className="flex items-start gap-2 mb-3">
                          <p className="lg:w-32 w-20 shrink-0 font-semibold text-sm text-gray-800">
                            {work.title}
                          </p>
                          <ul className="flex-1 text-sm text-gray-600 space-y-1">
                            {work.descriptions.map((desc, j) => (
                              <li key={j} className="flex gap-1">
                                <span><LuDot /></span>
                                <span>{desc}</span>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {career.reference && (
                  <>
                    <dl className="flex">
                      <dt className="w-28 font-semibold shrink-0">참고</dt>
                      <dd className="flex-1">
                        <a href={career.referenceLink} target="_blank" rel="noreferrer" className="flex items-center hover:underline">
                          <MdOpenInNew />&nbsp; {career.referenceTitle}
                        </a>
                        <div className={`grid grid-cols-2 md:grid-cols-${Math.min(career.reference.length, 4)} gap-4 mt-2`}>
                          {career.reference.map((img, i) => (
                            <div className="flex-row" key={i}>
                              <div className="w-full h-[150px] flex items-center justify-center overflow-hidden rounded border">
                                <img
                                  src={imageMap[img.src]}
                                  alt={img.alt}
                                  className="h-full object-contain transition-transform duration-200 hover:scale-105 rounded shadow-md cursor-zoom-in"
                                  tabIndex={0}
                                  role="button"
                                  onClick={() => openImageFullscreen(imageMap[img.src])}
                                  onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    openImageFullscreen(imageMap[img.src]);
                                    e.preventDefault();
                                  }
                                  }}
                                  />
                              </div>
                              <p className="text-xs text-center">▲ {img.alt}</p>
                            </div>
                          ))}
                        </div>
                      </dd>
                    </dl>
                  </>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerDetailPopup;
