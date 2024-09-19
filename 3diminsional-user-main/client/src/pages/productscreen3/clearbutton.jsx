import { useDispatch, useSelector } from "react-redux";
import { removeText } from "../../redux/slice/text_slice/text";

const ClearButton = () => {
  const dispatch = useDispatch();
  const index = useSelector((state) => state.indexSelect.index_selected);

  // Correctly defining the handler so that it runs on click
  const handleRemoveText = () => {
    dispatch(removeText(index));
  };

  return (
    <button
      className="bg-neutral-500 text-zinc-200 p-3 rounded-md hover:bg-neutral-600 hover:shadow-md hover:shadow-zinc-300 nav-link"
      style={{ position: "absolute", top: "50px", right: "570px" }}
      onClick={handleRemoveText} // Pass the function reference here
    >
      CLEAR
    </button>
  );
};

export default ClearButton;
