import React from "react";

export default function Footer() {
  return (
    <div className="max-w-4xl flex items-center justify-between pb-4 bg-transparent text-base-content">
      <span className="text-base font-normal">© 2025 Projukti Hunt</span>
      <div className="flex items-center gap-4">
        <a
          href="https://www.facebook.com/share/g/16ZfZwyhMq/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-normal text-base-content-secondary hover:text-primary transition-all delay-200 cursor-pointer flex items-center gap-2"
        >
          community
        </a>
        <a
          href="https://www.facebook.com/ProjuktiHunt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-normal text-base-content-secondary hover:text-primary transition-all delay-200 cursor-pointer flex items-center gap-2"
        >
          facebook
        </a>
      </div>
    </div>
  );
}
