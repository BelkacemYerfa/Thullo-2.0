import { ListLoader } from "./ListLoader";

export const ContextLoader = () => {
  return (
    <div className="flex gap-3">
      {[...Array(3)].map((_, i) => (
        <ListLoader key={i} />
      ))}
    </div>
  );
};
