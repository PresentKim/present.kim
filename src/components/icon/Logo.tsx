interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
  hasBackground?: boolean
}

export default function LogoIcon({hasBackground, ...props}: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 400 400"
      {...props}>
      {hasBackground && <circle cx="200" cy="200" r="200" fill="#212121" />}
      <path
        fill="none"
        stroke="#187254"
        strokeLinecap="round"
        strokeWidth="48"
        d="M170 200c10 10 30-10 70 70 10 30 60 60 90 0"
      />
      <path
        fill="none"
        stroke="#10b981"
        strokeLinecap="round"
        strokeWidth="48"
        d="m160 125-15 120c-10 80-65 70-80 0 0 0-40-160 110-180 130-20 120 150-50 130"
      />
    </svg>
  )
}
