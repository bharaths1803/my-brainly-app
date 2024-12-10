export const SidebarItem = ({text, icon, onClick, isActive}) => {
  const activeClass = isActive ? "bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150" : "";
  const defaultStyles = "flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150";
  return <div className= {`${defaultStyles} ${activeClass}`} onClick={onClick}>
    <div className="pr-2">
      {icon}
    </div>
    <div>
      {text}
    </div>
  </div>
}

