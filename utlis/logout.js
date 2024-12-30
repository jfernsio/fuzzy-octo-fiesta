
const logoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}

export default logoutUser;