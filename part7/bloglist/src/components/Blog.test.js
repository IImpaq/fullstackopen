import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {fireEvent, render} from "@testing-library/react";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

describe("<BlogForm />", () => {
  const blog = {
    title: "react-testing-library",
    author: "react-testing-author",
    url: "react-testing-library.local",
    user: {
      username: "react-testing-user"
    }
  };
  const mockUpdateHandle = jest.fn();
  const mockRemoveHandler = jest.fn();
  let component;

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateBlog={mockUpdateHandle}
        removeBlog={mockRemoveHandler}
        currentUser={"react-testing-user"}
      />
    );
  });

  test("renders correct children", () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    const details = component.container.querySelector(".blogDetails");
    expect(details).toHaveStyle("display: none");
  });

  test("after clicking the button, details are displayed", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const details = component.container.querySelector(".blogDetails");
    expect(details).not.toHaveStyle("display: none");
  });

  test("like button is clicked twice", () => {
    const like = component.getByText("like");
    fireEvent.click(like);
    fireEvent.click(like);

    expect(mockUpdateHandle.mock.calls).toHaveLength(2);
  });
});
