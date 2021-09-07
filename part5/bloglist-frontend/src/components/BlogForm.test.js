import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {fireEvent, render} from "@testing-library/react";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

describe("<BlogForm />", () => {
  test("handles input correctly on submission", () => {
    const formValues = {
      title: "react-testing-library-testing-forms",
      author: "react-testing-author-forms",
      url: "react-testing-library-forms.local"
    };

    const mockCreateHandle = jest.fn();
    const component = render(
      <BlogForm
        createBlog={mockCreateHandle}
      />
    );

    const form = component.container.querySelector("form");
    const inputTitle = component.container.querySelector("#inputTitle");
    const inputAuthor = component.container.querySelector("#inputAuthor");
    const inputURL = component.container.querySelector("#inputURL");

    fireEvent.change(inputTitle, {
      target: { value: formValues.title }
    });
    fireEvent.change(inputAuthor, {
      target: { value: formValues.author }
    });
    fireEvent.change(inputURL, {
      target: { value: formValues.url }
    });
    fireEvent.submit(form);

    expect(mockCreateHandle.mock.calls).toHaveLength(1);
    expect(mockCreateHandle.mock.calls[0][0].title).toBe(formValues.title);
    expect(mockCreateHandle.mock.calls[0][0].author).toBe(formValues.author);
    expect(mockCreateHandle.mock.calls[0][0].url).toBe(formValues.url);
  });
});
