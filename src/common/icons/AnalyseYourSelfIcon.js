import React from "react";

export default function AnalyseSelfIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={128}
      height={128}
      viewBox="0 0 128 128"
      {...props}
    >
      <defs>
        <style
          dangerouslySetInnerHTML={{
            __html: ".a{fill:#fff;}.b{clip-path:url(#a);}"
          }}
        />
        <clipPath id="a">
          <rect
            className="a"
            width={128}
            height={128}
            transform="translate(600 491)"
          />
        </clipPath>
      </defs>
      <g className="b" transform="translate(-600 -491)">
        <path
          className="a"
          d="M111.051,96.512C92.709,92.277,75.637,88.565,83.9,72.949,109.077,25.419,90.576,0,64,0,36.9,0,18.859,26.395,44.1,72.949c8.517,15.707-9.2,19.419-27.147,23.563C.56,100.3-.053,108.437,0,122.667L.021,128H127.968l.021-5.168c.064-14.336-.491-22.517-16.939-26.32Z"
          transform="translate(600.005 491)"
        />
      </g>
    </svg>
  );
}
