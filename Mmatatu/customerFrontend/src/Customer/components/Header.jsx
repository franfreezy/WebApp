export default function Header({ title }) {
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  localStorage.removeItem('email');

  
  window.location.href = '/';
  };
  return (
    <header className="bg-white shadow flex items-center justify-between px-6 py-4">
      <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSignOut} 
        >
          Logout
        </button>
        <img
          src="/Assets/person.jpg"
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-blue-600"
        />
      </div>
    </header>
  );
}
