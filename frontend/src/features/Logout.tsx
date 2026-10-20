function Logout() {
    fetch("/api/logout", {method: "POST", credentials: "include"}).then(r => console.log(r))
}

export default Logout;