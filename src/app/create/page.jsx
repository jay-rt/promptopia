import Form from "@/components/Form";

export const metadata = {
  title: "Create Prompt",
  description: "Unleash your creativity and share prompts",
};

const CreatePost = () => {
  const post = { prompt: "", tag: "" };
  return <Form type="Create" post={post} swrKey="/api/prompts" method="POST" />;
};

export default CreatePost;
