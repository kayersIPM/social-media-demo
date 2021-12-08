function LoginButton({ currentUser, onLogin, onLogout }) {
    if (currentUser) {
        return <button className="user-button" onClick={onLogout}>
            <div className="username">
                😀 {currentUser.attributes['custom:fullname']}
            </div>
            <div className="log-out">
                Log out
            </div>
        </button>
    } else {
        return <button className="user-button" onClick={onLogin}>
            <div>
                Log in
            </div>
        </button>
    }
}

export default LoginButton