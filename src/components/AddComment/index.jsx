/* eslint-disable react/prop-types */

const AddComment = ({ addComment, setComment, comment, user }) => {
  return (
    <div className="flex justify-between  py-2 gap-2 items-center">
      <div className=" w-12 h-12 rounded-full bg-black">
        {user?.photo && <img src={user.photo} alt="" />}
      </div>

      <input
        type="text"
        name=""
        id=""
        className="rounded-full border-gray-400 w-8/12 h-10 text-sm focus:border-primary"
        onChange={(ev) => setComment(ev.target.value)}
        value={comment}
      />
      <button
        onClick={addComment}
        className="bg-primary px-2 py-2 rounded-xl text-white text-sm"
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
