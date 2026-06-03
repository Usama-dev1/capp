import useFetchData from "../hooks/useFetchData";
const OverViewPage = () => {
  const { data } = useFetchData();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Dashboard overview</h1>
        <p className="text-gray-500">
          See your post counts and latest updates at a glance.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
          <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
            Total posts
          </p>
          <p className="mt-4 text-3xl font-semibold">{data.length}</p>
        </div>
      </div>

      <section className="rounded-3xl bg-white p-5 shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-4">Recent posts</h2>
        <ul className="space-y-4">
          {data.slice(0, 3).map((post) => (
            <li
              key={post.id}
              className="rounded-2xl border border-gray-100 p-4"
            >
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{post.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default OverViewPage;
