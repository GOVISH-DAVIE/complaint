import Link from "next/link";

const Nav =( {isSidebarActive, option}:{isSidebarActive:boolean, option:string} ) =>        <nav id="sidebar" className={isSidebarActive ? 'active' : ''}>
<div className="sidebar-header">
    <h6>Complaint Management System</h6>
</div>
<ul className="list-unstyled components">
    <li className={option == "home"?'active':""}>
        <Link href="/">Home</Link>
    </li>
    <li  className={option == "mycomplaint"?'active':""} >
    {/* mycomplaint */}
        <Link href="/mycomplaints">My Complaints</Link>
    </li>
    <li className={option == "profile"?'active':""}>
        <Link href="/profile">Profile</Link> 
    </li>
    <li>
        <Link href="/login">Logout</Link> 
    </li>
    {/* <li>
        <a href="#">Tokens</a>
    </li> */}
</ul>

</nav>

export default Nav