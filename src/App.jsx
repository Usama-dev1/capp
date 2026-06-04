import { BrowserRouter, Routes, Route } from "react-router";
import PostDetailsPage from "./pages/PostDetailsPage";
import PostListPage from "./pages/PostListPage";
import DashBoardLayout from "./components/dashboard/DashBoardLayout";
import OverViewPage from "./pages/OverViewPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostByUserPage from "./pages/PostByUserPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route index element={<HomePage />} />
        <Route path="/:id" element={<PostDetailsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashBoardLayout />}>
            <Route path="dashboard" element={<OverViewPage />} />
            <Route path="dashboard/create-post" element={<CreatePostPage />} />
            <Route path="dashboard/edit-post/:id" element={<EditPostPage />} />
            <Route path="dashboard/posts" element={<PostByUserPage />} />
            <Route path="dashboard/posts-all" element={<PostListPage />} />
            <Route path="dashboard/posts/:id" element={<PostDetailsPage />} />
          </Route>
        </Route>

        {/*not found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
