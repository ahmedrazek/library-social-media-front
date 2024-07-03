/* eslint-disable react/prop-types */

import { Avatar } from "@chakra-ui/react";

const AddComment = ({ addComment, setComment, comment, user }) => {
  return (
    <div className="flex justify-between py-2 gap-2 items-center">
      <div className="w-12 h-12 rounded-full bg-green-600 overflow-hidden  border-2 border-zinc-900">
        {user?._id && user.photo ? (
          <img
            src={`http://localhost:9000${user.photo}`}
            className=" object-cover  w-full h-full"
          />
        ) : (
          <Avatar bg="teal.500" size="full" />
        )}
      </div>

      <input
        type="text"
        name=""
        id=""
        className="rounded-full border-gray-400 w-8/12 h-10 text-sm focus:border-primary"
        onChange={(ev) => setComment(ev.target.value)}
        value={comment}
        placeholder="write comment"
      />
      <button
        onClick={addComment}
        className="bg-primary px-2 py-2 rounded-xl text-white text-sm"
      >
        Comment
      </button>
    </div>
  );
};

export default AddComment;
