import { BrowserRouter, Routes, Route } from "react-router";
import PostDetailsPage from "./pages/PostDetailsPage";
import PostListPage from "./pages/PostListPage";
import DashBoardLayout from "./components/dashboard/DashBoardLayout";
import OverViewPage from "./pages/OverViewPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashBoardLayout />}>
          <Route index element={<OverViewPage />} />
          <Route path="dashboard" element={<OverViewPage />} />
          <Route path="dashboard/create-post" element={<CreatePostPage />} />
          <Route path="dashboard/create-post/:id" element={<EditPostPage />} />
          <Route path="dashboard/posts" element={<PostListPage />} />
          <Route path="dashboard/posts/:id" element={<PostDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
