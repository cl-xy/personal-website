
const SkillLevelBar = ({ skill, level }) => {
  const getLevelPercentage = (skillLevel) => {
    switch (skillLevel.toLowerCase()) {
      case 'beginner':
        return 33.33;
      case 'intermediate':
        return 66.66;
      case 'expert':
        return 100;
      default:
        return 0;
    }
  };

  const getColor = (skillLevel) => {
    switch (skillLevel.toLowerCase()) {
      case 'beginner':
        return '#B5EAD7';
      case 'intermediate':
        return '#FFDAC1';
      case 'expert':
        return '#FF9AA2';
      default:
        return '#F9FAFB';
    }
  }

  const percentage = getLevelPercentage(level);
  const color = getColor(level);

  return (
    <div className="w-full max-w-md">
      <div className="mb-1">
        <span className="font-sm">{skill}</span>
      </div>
      <div className="w-full h-2 bg-white rounded-full mb-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: color}}
        />
      </div>
    </div>
  );
};

export default SkillLevelBar;