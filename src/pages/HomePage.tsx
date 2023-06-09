import { Link } from "react-router-dom";
//todo, add user login first
const HomePage = () => {
    return (
        <div>
        <h1>Home Page</h1>
        <Link to="/draw">Draw</Link>
        </div>
    );
}

export default HomePage;