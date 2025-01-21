const StatCard = ({ title, value, change, icon: Icon }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      </div>
      <div className="stat-value">{value}</div>
      {change !== undefined && (
        <div className={`flex items-center mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          <span className="text-sm">
            {isPositive ? '+' : ''}{change}%
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
