import type { NewPost, Post, UpdatePost, FormFields } from "../types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addNewPost, updatePost } from "../api/posts";
import { formatISO } from "date-fns";
import { useToast } from "../context/ToastContext";
import ValidationErrText from "../Components/ValidationErrText";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const location = useLocation();
  const postToEdit = location.state?.post;
  const { showToast } = useToast();

  const navigateToHomePage = () => {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const addNewPostMutation = useMutation<Post, Error, NewPost>({
    mutationFn: addNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast({ message: "Post Added Successfully", type: "success" });
      navigateToHomePage();
    },
  });

  const editPostMutation = useMutation<Post, Error, UpdatePost>({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      showToast({ message: "Post Edited Successfully", type: "success" });
      navigateToHomePage();
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const postPayload: NewPost = {
      title: data.title,
      text: data.text,
      reactions: {
        like: 0,
        dislike: 0,
        heart: 0,
        laughter: 0,
        cup: 0,
      },
      createdAt: formatISO(new Date()),
    };
    if (isEditing && id && postToEdit) {
      const updatedPost: NewPost = {
        title: data.title,
        text: data.text,
        reactions: postToEdit.reactions,
        createdAt: postToEdit.createdAt,
      };

      editPostMutation.mutate({
        id,
        updatedPost: updatedPost,
      });
    } else {
      addNewPostMutation.mutate(postPayload);
    }
  };
  if (addNewPostMutation.isPending) return "saving...";
  if (addNewPostMutation.isError) return "error";

  return (
    <div>
      <div className="flex justify-center max-w-2xl mx-auto mt-8">
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <input
              {...register("title", {
                required: "Title is required",
              })}
              defaultValue={postToEdit?.title || ""}
              className={`input-style ${errors.title && "border-red-500"}`}
              type="text"
              placeholder="title"
            />
            {errors.title && <ValidationErrText text={errors.title.message} />}
          </div>
          <div>
            <textarea
              {...register("text", {
                required: "Text is required",
              })}
              rows={8}
              defaultValue={postToEdit?.text || ""}
              className={`input-style ${errors.text && "border-red-500"}`}
              placeholder="text"
            ></textarea>
            {errors.text && <ValidationErrText text={errors.text.message} />}
          </div>
          <button className="button-style bg-blue-500 hover:bg-blue-800 transition-colors py-2" type="submit">
            {isEditing && id ? "Save Changes" : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
