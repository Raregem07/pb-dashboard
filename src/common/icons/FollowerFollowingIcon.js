import React from 'react';

export default function FollowerFollowingIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={64} height={64} viewBox="0 0 64 64" {...props}>
      <defs>
        <style dangerouslySetInnerHTML={{__html: ".a{fill:#fff;}.b{clip-path:url(#a);}" }} />
        <clipPath id="a">
          <rect className="a" width={64} height={64} transform="translate(929 390)" />
        </clipPath>
      </defs>
      <g className="b" transform="translate(-929 -390)">
        <path className="a" d="M25.605,9.867c-3.077,5.165-1.693,13.939,3.8,24.067,2.48,4.565,1.859,8.053.9,10.173-2.619,5.808-9.8,7.464-17.4,9.216C7.667,54.533,8,55.643,8,64H2.68l-.013-3.309c0-6.72.531-10.6,8.475-12.435,8.973-2.072,17.835-3.928,13.573-11.781C12.093,13.2,21.115,0,34.667,0c8.856,0,15.92,5.645,15.92,16.445,0,9.48-5.2,18.221-6.355,20.888h-5.64c1.045-4.1,6.664-11.643,6.664-20.912,0-13.741-15.645-13.293-19.651-6.555Zm35.728,40.8h-8v-8H48v8H40V56h8v8h5.333V56h8Z" transform="translate(929 390)" />
      </g>
    </svg>
  );
}
