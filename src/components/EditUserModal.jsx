import { useState } from 'react';

const EditUserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result }); // Update avatar with Base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSave(formData); // Update in real-time
      } else {
        console.error('Failed to update user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-96">
        <h2 className="text-xl font-bold mb-2">Edit User</h2>
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          placeholder="First Name"
          className="border rounded px-4 py-2 mb-2 w-full"
        />
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          placeholder="Last Name"
          className="border rounded px-4 py-2 mb-2 w-full"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="border rounded px-4 py-2 mb-2 w-full"
        />
        <div className="mb-2">
          <label className="block mb-1 font-medium">Upload Avatar:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border rounded px-4 py-2 w-full"
          />
        </div>
        {formData.avatar && (
          <div className="mb-2">
            <img src={formData.avatar} alt="Preview" className="w-16 h-16 rounded-full" />
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            onClick={onClose} 
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
