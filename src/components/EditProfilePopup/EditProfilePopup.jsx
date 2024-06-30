import { useState ,useEffect } from "react";

const EditProfilePopup = ({ user, onClose, onSave }) => {
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState(user.bio ? "bio" : "");
  const [bio, setBio] = useState("" , );

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatar) formData.append("photo", avatar);
    if (cover) formData.append("cover", cover);
    if(bio)formData.append("bio", bio);
    
      onSave(formData); // Assuming onSave sends formData to the server
    };
    
  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Avatar</label>
            <input type="file" onChange={handleAvatarChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Cover</label>
            <input type="file" onChange={handleCoverChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Bio</label>
            <textarea
              className="w-full border rounded p-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopup;