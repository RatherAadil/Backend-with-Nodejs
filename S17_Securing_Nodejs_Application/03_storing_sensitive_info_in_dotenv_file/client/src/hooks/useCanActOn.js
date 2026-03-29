import { ROLES } from '../config/roles.js';

const useCanActOn = (currentUserRole) => {
  const actorLevel = ROLES[currentUserRole]?.level || 0;

  return (targetUserRole) => {
    const targetLevel = ROLES[targetUserRole]?.level || 0;
    return actorLevel > targetLevel;
  };
};

export default useCanActOn;
