import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setError(null);
      } else {
        setError("User not found");
        setUser(null);
      }
    } catch (err) {
      setError("An error occurred while fetching the data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const openGithubProfile = () => {
    if (user) window.open(user.html_url, "_blank");
  };

  return (
    <div className="app">
      <h1>GitHub User Finder</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") fetchUser();
          }}
        />
        <button onClick={fetchUser} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {user && (
        <div className="user-card">
          <img src={user.avatar_url} alt={user.name} className="avatar" />
          <h2>{user.name || "No Name Available"}</h2>
          <p className="username">@{user.login}</p>
          {user.bio && <p className="bio">{user.bio}</p>}
          <div className="stats">
            <div>
              <strong>{user.public_repos}</strong>
              <span>Repos</span>
            </div>
            <div>
              <strong>{user.followers}</strong>
              <span>Followers</span>
            </div>
            <div>
              <strong>{user.following}</strong>
              <span>Following</span>
            </div>
          </div>
          <button onClick={openGithubProfile} className="view-profile">
            View GitHub Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default App;




// import React, { useState } from 'react';
// import { Button } from "./components/ui/button";
// import { Input } from "./components/ui/input";
// import { Card, CardBody, CardHeader, CardTitle } from "./components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
// import { ExternalLink, Github, Users, BookOpen } from 'lucide-react';

// const GitHubUserFinder = () => {
//   // State management
//   const [username, setUsername] = useState(''); // Input username
//   const [user, setUser] = useState(null); // GitHub user data
//   const [error, setError] = useState(null); // Error message
//   const [loading, setLoading] = useState(false); // Loading state

//   // Function to fetch GitHub user data
//   const fetchUser = async () => {
//     if (!username) return;
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`https://api.github.com/users/${username}`);
//       if (!response.ok) {
//         throw new Error('User not found');
//       }
//       const data = await response.json();
//       setUser(data);
//     } catch (err) {
//       setError(err.message || 'An error occurred');
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to open GitHub profile in a new tab
//   const openGitHubProfile = () => {
//     if (user) {
//       window.open(user.html_url, '_blank');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md overflow-hidden transition-all duration-300 ease-in-out transform hover:shadow-lg">
//         {/* Header */}
//         <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
//           <CardTitle className="text-2xl font-bold flex items-center">
//             <Github className="mr-2" /> GitHub User Info
//           </CardTitle>
//         </CardHeader>

//         {/* Content */}
//         <CardBody className="p-6">
//           {/* Input and Search Button */}
//           <div className="flex space-x-2 mb-6">
//             <Input
//               type="text"
//               placeholder="Enter GitHub username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               onKeyPress={(e) => e.key === 'Enter' && fetchUser()}
//               className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-purple-500"
//             />
//             <Button
//               onClick={fetchUser}
//               disabled={loading}
//               className="bg-purple-500 hover:bg-purple-600 transition-colors duration-300"
//             >
//               {loading ? 'Loading...' : 'Search'}
//             </Button>
//           </div>

//           {/* Error Message */}
//           {error && <p className="text-red-500 mb-4">{error}</p>}

//           {/* User Info */}
//           {user && (
//             <div className="space-y-6">
//               {/* Avatar and Name */}
//               <div className="flex items-center space-x-4">
//                 <Avatar className="h-24 w-24 ring-4 ring-purple-500">
//                   <AvatarImage src={user.avatar_url} alt={user.name} />
//                   <AvatarFallback>{user.login.slice(0, 2).toUpperCase()}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
//                   <p className="text-gray-500">@{user.login}</p>
//                   {user.bio && <p className="text-sm text-gray-600 mt-2">{user.bio}</p>}
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-4 text-center">
//                 <div className="bg-gray-100 p-4 rounded-lg">
//                   <p className="text-2xl font-bold text-purple-600">{user.public_repos}</p>
//                   <p className="text-gray-500 flex items-center justify-center">
//                     <BookOpen className="mr-1" size={16} /> Repos
//                   </p>
//                 </div>
//                 <div className="bg-gray-100 p-4 rounded-lg">
//                   <p className="text-2xl font-bold text-purple-600">{user.followers}</p>
//                   <p className="text-gray-500 flex items-center justify-center">
//                     <Users className="mr-1" size={16} /> Followers
//                   </p>
//                 </div>
//                 <div className="bg-gray-100 p-4 rounded-lg">
//                   <p className="text-2xl font-bold text-purple-600">{user.following}</p>
//                   <p className="text-gray-500 flex items-center justify-center">
//                     <Users className="mr-1" size={16} /> Following
//                   </p>
//                 </div>
//               </div>

//               {/* GitHub Profile Button */}
//               <Button
//                 onClick={openGitHubProfile}
//                 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
//               >
//                 View GitHub Profile <ExternalLink className="ml-2 h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default GitHubUserFinder;
