export default function Header() {
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
  localStorage.removeItem('email');

  
  window.location.href = '/';
  };
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="/Assets/person.jpg"
          alt="Driver Profile"
          className="h-10 w-10 rounded-full"
        />
        <h1 className="text-lg font-semibold">Driver Name</h1>
      </div>
      <button  onClick={handleSignOut} className="bg-red-500 px-4 py-2 rounded">Logout</button>
    </header>
  );
}
