import React from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { addNewPost, updatePost } from "../api/posts";
import type { NewPost, Post, UpdatePost, FormFields } from "../types";
import Nav from "../Components/Nav";
import ValidationErrText from "../Components/ValidationErrText";

const NewPost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const location = useLocation();
  const postToEdit = location.state?.post;

  const addNewPostMutation = useMutation<Post, Error, NewPost>({
    mutationFn: addNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // setNewPost({ title: "", text: "" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });

  const editPostMutation = useMutation<Post, Error, UpdatePost>({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      // setNewPost({ title: "", text: "" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
  });

  // const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();

  //   reader.onloadend = () => {
  //     setNewPost((prev) => ({
  //       ...prev,
  //       image: reader.result as string,
  //     }));
  //     console.log(reader.result as string);
  //     reader.readAsDataURL(file);
  //   };
  // };

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
    };
    if (isEditing && id) {
      editPostMutation.mutate({
        id,
        updatedPost: postPayload,
      });
    } else {
      addNewPostMutation.mutate(postPayload);
    }
  };
  if (addNewPostMutation.isPending) return "saving...";
  if (addNewPostMutation.isError) return "error";

  return (
    <div>
      <Nav />
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

          {/* {newPost.image && (
          <img
            src={newPost.image}
            alt="preview"
            className="w-40 h-40 object-cover"
          />
        )} */}

          <button className="button-style bg-blue-500 py-2" type="submit">
            {isEditing && id ? "save changes" : "add post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
