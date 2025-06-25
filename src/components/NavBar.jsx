import DarkMode from "./DarkMode";

export default function Navbar() {
  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-black shadow flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-700 dark:text-blue-300">
        🏥 Token Giver
      </h1>
      <DarkMode />
    </header>
  );
}
