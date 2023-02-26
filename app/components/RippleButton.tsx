"use client";

import React, { useEffect } from "react";

const RippleButton = () => {
  useEffect(() => {
    const btn = document.getElementById("bt");
    btn!.addEventListener("click", (e) => rippleEffect);
  }, []);

  function rippleEffect(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const btn = event.currentTarget;

    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (btn.offsetLeft + radius)}px`;
    circle.style.top = `${event.clientY - (btn.offsetTop + radius)}px`;
    circle.classList.add("ripple");

    const ripple = btn.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  }

  return (
    <button
      type="button"
      id="bt"
      className="rounded px-5 py-3 min-w-max overflow-hidden shadow relative bg-indigo-500 text-white hover:bg-opacity-90"
      onClick={rippleEffect}
    >
      Button text
    </button>
  );
};

export default RippleButton;
