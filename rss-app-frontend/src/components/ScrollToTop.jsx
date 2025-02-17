import React, { useState, useEffect } from "react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <a
      href="#top"
      className={`fixed bottom-6 right-1 sm:right-3 flex items-center justify-center w-10 h-10 bg-gradient-to-r from-gray-300 to-orange-100 text-black shadow-lg rounded-xl transition-all duration-300 ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      } hover:text-white hover:from-blue-600 hover:to-purple-200 hover:shadow-2xl hover:scale-110`}
      title="Scroll to top"
    >
      <i className="fa-solid fa-caret-up text-2xl"></i>
    </a>
  );
}

export default ScrollToTop;
