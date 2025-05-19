import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    tags: "",
    image: null,
  });
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    const storedPosts = localStorage.getItem("skillPosts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setForm((prev) => ({
          ...prev,
          image: fileReader.result,
        }));
      };
      fileReader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { ...form, id: Date.now() };
    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    localStorage.setItem("skillPosts", JSON.stringify(updatedPosts));
    setForm({ title: "", desc: "", tags: "", image: null });
  };

  const handleSearch = () => {
    const searchTerm = searchInput.trim().toLowerCase();

    const storedPosts = JSON.parse(localStorage.getItem("skillPosts") || "[]");

    const results = storedPosts.filter((post) => {
      const titleMatch = (post.title || "").toLowerCase().includes(searchTerm);
      const tagList = (post.tags || "")
        .split(",")
        .map((tag) => tag.trim().toLowerCase());
      const tagsMatch = tagList.some((tag) => tag.includes(searchTerm));
      return titleMatch || tagsMatch;
    });

    setSearchResults(results);
    setSearchTriggered(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Create Skill Post</h1>

      <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-4 rounded shadow text-black">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>

      <div className="mt-8">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by title or tag..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setSearchTriggered(false);
            }}
            className="border p-2 rounded w-full text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {searchTriggered && (
          <div>
            {searchResults.length > 0 ? (
              <div className="grid gap-4">
                {searchResults.map((post) => (
                  <div key={post.id} className="border p-4 rounded shadow bg-white text-black">
                    {post.image && (
                      <img
                        src={post.image}
                        alt="Uploaded"
                        className="mb-2 w-full h-48 object-cover rounded"
                      />
                    )}
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p>{post.desc}</p>
                    <p className="text-sm text-gray-600">Tags: {post.tags}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-400">No matching skill post found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

