import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        🧑🏻‍💻 Motiveko
      </h1>
      <p className="mb-4">{`Welcome to Motiveko's FE Tech Blog`}</p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
