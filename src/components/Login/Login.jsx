import { useDocumentTitle } from '../../hooks/dynamic_title/DynamicTitle';

const Login = () => {
    // Dynamically set the document title
    useDocumentTitle("Login - Civic Care");

    return (
        <div>
            <h2>Login</h2>
        </div>
    );
};

export default Login;