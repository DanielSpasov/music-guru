import { ReactElement } from 'react';

import { SVGProps } from '.';
import SVG from './SVG';

const icons = {
  add: (props: SVGProps) => (
    <SVG viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="46"
        d="M256 112v288m144-144H112"
      />
    </SVG>
  ),
  edit: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L19.3 8.925ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6l4.25 4.25Z"
      />
    </SVG>
  ),
  close: (props: SVGProps) => (
    <SVG viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
      ></path>
    </SVG>
  ),
  user: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
      />
    </SVG>
  ),
  theme: (props: SVGProps) => (
    <SVG viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.43 104.43 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23ZM84 168a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm0-56a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm44-24a12 12 0 1 1 12-12a12 12 0 0 1-12 12Zm44 24a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"
      />
    </SVG>
  ),
  search: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.612 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3l-1.4 1.4ZM9.5 14q1.875 0 3.188-1.313T14 9.5q0-1.875-1.313-3.188T9.5 5Q7.625 5 6.312 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14Z"
      />
    </SVG>
  ),
  show: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5zm0 11c-2.206 0-4-1.794-4-4s1.794-4 4-4s4 1.794 4 4s-1.794 4-4 4z"
      />
      <path
        fill="currentColor"
        d="M12 10c-1.084 0-2 .916-2 2s.916 2 2 2s2-.916 2-2s-.916-2-2-2z"
      />
    </SVG>
  ),
  hide: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M8.073 12.194L4.212 8.333c-1.52 1.657-2.096 3.317-2.106 3.351L2 12l.105.316C2.127 12.383 4.421 19 12.054 19c.929 0 1.775-.102 2.552-.273l-2.746-2.746a3.987 3.987 0 0 1-3.787-3.787zM12.054 5c-1.855 0-3.375.404-4.642.998L3.707 2.293L2.293 3.707l18 18l1.414-1.414l-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316l-.105-.316C21.98 11.617 19.687 5 12.054 5zm1.906 7.546c.187-.677.028-1.439-.492-1.96s-1.283-.679-1.96-.492L10 8.586A3.955 3.955 0 0 1 12.054 8c2.206 0 4 1.794 4 4a3.94 3.94 0 0 1-.587 2.053l-1.507-1.507z"
      />
    </SVG>
  ),
  calendar: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 19H5V8h14m-3-7v2H8V1H6v2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-1V1m-1 11h-5v5h5v-5Z"
      />
    </SVG>
  ),
  trash: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M6.187 8h11.625l-.695 11.125A2 2 0 0 1 15.121 21H8.879a2 2 0 0 1-1.996-1.875L6.187 8zM19 5v2H5V5h3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h3zm-9 0h4V4h-4v1z"
      />
    </SVG>
  ),
  check: (props: SVGProps) => (
    <SVG viewBox="0 0 16 16" {...props}>
      <path
        fill="currentColor"
        d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042a.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
      />
    </SVG>
  ),
  up: (props: SVGProps) => (
    <SVG viewBox="0 0 48 48" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="m13 30l12-12l12 12"
      />
    </SVG>
  ),
  down: (props: SVGProps) => (
    <SVG viewBox="0 0 48 48" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M36 18L24 30L12 18"
      />
    </SVG>
  ),
  back: (props: SVGProps) => (
    <SVG viewBox="0 0 512 512" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M244 400L100 256l144-144M120 256h292"
      />
    </SVG>
  ),
  home: (props: SVGProps) => (
    <SVG viewBox="0 0 1024 1024" {...props}>
      <path
        fill="currentColor"
        d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5z"
      />
    </SVG>
  ),
  lock: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3 12a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-7zm10 2a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0v-3z"
        clipRule="evenodd"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M8 10V7a4 4 0 0 1 4-4v0a4 4 0 0 1 4 4v3"
      />
    </SVG>
  ),
  upload: (props: SVGProps) => (
    <SVG viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16h-2Zm-5 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
      />
    </SVG>
  ),
  text: (props: SVGProps) => (
    <SVG viewBox="0 0 12 12" {...props}>
      <path
        fill="currentColor"
        d="M2 2.75A.75.75 0 0 1 2.75 2h6a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3.5H6.5v5h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5H5v-5H3.5v.75a.75.75 0 0 1-1.5 0v-1.5Z"
      />
    </SVG>
  ),
  email: (props: SVGProps) => (
    <SVG viewBox="0 0 20 20" {...props}>
      <path
        fill="currentColor"
        d="M14.608 12.172c0 .84.239 1.175.864 1.175c1.393 0 2.28-1.775 2.28-4.727c0-4.512-3.288-6.672-7.393-6.672c-4.223 0-8.064 2.832-8.064 8.184c0 5.112 3.36 7.896 8.52 7.896c1.752 0 2.928-.192 4.727-.792l.386 1.607c-1.776.577-3.674.744-5.137.744c-6.768 0-10.393-3.72-10.393-9.456c0-5.784 4.201-9.72 9.985-9.72c6.024 0 9.215 3.6 9.215 8.016c0 3.744-1.175 6.6-4.871 6.6c-1.681 0-2.784-.672-2.928-2.161c-.432 1.656-1.584 2.161-3.145 2.161c-2.088 0-3.84-1.609-3.84-4.848c0-3.264 1.537-5.28 4.297-5.28c1.464 0 2.376.576 2.782 1.488l.697-1.272h2.016v7.057h.002zm-2.951-3.168c0-1.319-.985-1.872-1.801-1.872c-.888 0-1.871.719-1.871 2.832c0 1.68.744 2.616 1.871 2.616c.792 0 1.801-.504 1.801-1.896v-1.68z"
      />
    </SVG>
  )
};

export type IconModel = keyof typeof icons;

export const Icons: Record<IconModel, (props: SVGProps) => ReactElement> =
  icons;
