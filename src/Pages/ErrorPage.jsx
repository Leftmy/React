import React from "react";
import img from "../assets/error_image.jpg";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-6">
      <h1 className="text-3xl font-bold">404 — Сторінку не знайдено</h1>
      <img src={img} alt="error" className="w-72 rounded-lg shadow-lg" />
    </div>
  );
};

export default ErrorPage;
