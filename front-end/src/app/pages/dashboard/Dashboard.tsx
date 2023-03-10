import { Link } from "react-router-dom";

export const Dashboard = () => {
    return (
        <div style={{ color: "red" }}>
            <p>Dashboard</p>
            <Link to={"/entrar"}>Login</Link>
        </div>
    );
};
