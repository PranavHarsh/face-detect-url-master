import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit, isLoading }) => {
  return (
    <div>
      <p className="f3 center">
        {"This magic galaxy will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <form
          className="form pa4 br3 shadow-4 center"
          onSubmit={onButtonSubmit}
        >
          <input
            className="f4 pa2 w-70 center"
            type="url"
            required
            onChange={onInputChange}
          />
          <button
            className="w-30 center grow f4 link ph3 pv2 dib white bg-light-purple "
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Detecting..." : "Detect"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ImageLinkForm;
