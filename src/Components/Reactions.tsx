import type { ReactionProps} from "../types";

const Reactions = ({ icon, count, onClick }: ReactionProps) => {

  return (
    <span onClick={onClick} className="cursor-pointer px-2 py-1 rounded border">
      {icon} {count}
    </span>
  );
};

export default Reactions;
