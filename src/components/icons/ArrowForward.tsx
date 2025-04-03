export default function ArrowForward({size=32, color="#1D1D1F"}:{size?: number, color?: string}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.3335 6.66658L20.6668 15.9999L11.3335 25.3333"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
