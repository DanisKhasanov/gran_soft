interface MiniChartProps {
  data?: number[];
  trend?: "up" | "down";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MiniChart = ({
  data = [30, 25, 20, 17, 15, 10],
  trend = "up",
  size = "md",
  className = "",
}: MiniChartProps) => {
  const sizeClasses = {
    sm: "w-16 h-8",
    md: "w-24 h-12",
    lg: "w-32 h-16",
  };

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;

  const normalizedData = data.map(
    (value) => ((value - minValue) / range) * 30 + 5 
  );

  const pathData = normalizedData
    .map((value, index) => {
      const x = (index / (data.length - 1)) * 70 + 5; 
      return `${index === 0 ? "M" : "L"} ${x} ${value}`;
    })
    .join(" ");

  const isUpwardTrend = trend === "up";
  const bgColor = isUpwardTrend
    ? "from-green-50 to-green-100"
    : "from-red-50 to-red-100";
  const borderColor = isUpwardTrend ? "border-green-200" : "border-red-200";
  const lineColor = isUpwardTrend ? "#10b981" : "#ef4444";

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br ${bgColor} rounded-lg border ${borderColor} relative overflow-hidden ${className}`}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 80 40"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id={`grid-${trend}`}
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="80" height="40" fill={`url(#grid-${trend})`} />

        <path
          d={pathData}
          fill="none"
          stroke={lineColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-pulse"
        />

        {normalizedData.map((value, index) => {
          const x = (index / (data.length - 1)) * 70 + 5;
          return (
            <circle key={index} cx={x} cy={value} r="1.5" fill={lineColor} />
          );
        })}
      </svg>
    </div>
  );
};

export default MiniChart;
