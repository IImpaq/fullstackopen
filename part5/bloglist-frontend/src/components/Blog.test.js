import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {fireEvent, render} from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", function () {
  const blog = {
    title: "react-testing-library",
    author: "react-testing-author",
    url: "react-testing-library.local",
    user: {
      username: "react-testing-user"
    }
  };
  let component;

  beforeEach(() => {
    const mockHandler = jest.fn();
    component = render(
      <Blog
        blog={blog}
        updateBlog={mockHandler}
        removeBlog={mockHandler}
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
});
