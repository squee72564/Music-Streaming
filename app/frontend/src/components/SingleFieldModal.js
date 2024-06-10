import React from "react";
import { useEffect, useState } from "react";
import { fetchPaginatedContent } from "../utils/api";

const SingleFieldModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [field, setField] = useState("");
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPaginatedContent(
          props.url,
          setItems,
          null,
          null
        );

        if (!response.ok) {
          throw new Error(`${response.status} : ${response.statusText}`);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (event) => {
    const { value } = event.target;

    setField(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fieldTrimmed = field.trim();

    if (fieldTrimmed === "") {
      setError("Please input a value.")
      return;
    }

    try {
      props.onUpdate(fieldTrimmed);
      setField("");
      setError(null);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        {"Add " + props.modelName}
      </button>
      {isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-md">
          <div className="relative w-full border-2 border-black max-w-md max-h-full">
            {/* Modal header */}
            <div className="relative bg-white shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                  {"Create new " + props.modelName}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            {/** Modal body */}
            <div className="flex flex-col">
              <select className="text-center" onChange={handleFieldChange}>
                <option value="">{"Select an existing " + props.modelName}</option>
                {items && items.map( (item, index) => {
                  const itemPropName = `${props.modelName.toLowerCase()}_name`;
                  return <option key={index} value={item[itemPropName]}>{item[itemPropName]}</option>
                })}
              </select>
              <form
                className="flex flex-col bg-gray-300 items-center justify-center p-5"
                onSubmit={handleSubmit}
              >
                <label className="flex flex-row justify-center space-x-4 px-3 my-5">
                  <h1 className="font-bold">{props.modelName + " name"}:</h1>
                  <input
                    type="text"
                    name="label_name"
                    value={field}
                    onChange={handleFieldChange}
                  />
                </label>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded"
                  type="submit"
                >
                  Save Changes
                </button>
                {error && <p>{error}</p>}
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SingleFieldModal;
