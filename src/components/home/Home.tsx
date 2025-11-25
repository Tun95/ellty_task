import { JSX, useState } from "react";
import { Dropdown } from "antd";
import { CheckOutlined } from "@ant-design/icons";

interface ListItemState {
  selectedPages: string[];
}

function Home() {
  const [listItems, setListItems] = useState<ListItemState[]>(
    Array(8).fill({ selectedPages: [] })
  );
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const pages: string[] = ["Page 1", "Page 2", "Page 3", "Page 4"];

  // HANDLE PAGE SELECT
  const handlePageSelect = (page: string, index: number): void => {
    setListItems((prev) => {
      const newListItems = [...prev];
      const currentSelectedPages = newListItems[index].selectedPages;

      if (currentSelectedPages.includes(page)) {
        newListItems[index] = {
          selectedPages: currentSelectedPages.filter((p: string) => p !== page),
        };
      } else {
        newListItems[index] = {
          selectedPages: [...currentSelectedPages, page],
        };
      }

      return newListItems;
    });
  };

  // HANDLE SELECT ALL
  const handleSelectAll = (index: number): void => {
    setListItems((prev) => {
      const newListItems = [...prev];
      const currentSelectedPages = newListItems[index].selectedPages;

      if (currentSelectedPages.length === pages.length) {
        newListItems[index] = { selectedPages: [] };
      } else {
        newListItems[index] = { selectedPages: [...pages] };
      }

      return newListItems;
    });
  };

  // GET CHECKBOX COLOR STATE
  const getCheckboxColorState = (
    index: number
  ): {
    borderColor: string;
    backgroundColor: string;
    checkmarkColor: string;
    showCheckmark: boolean;
  } => {
    const selectedPages = listItems[index].selectedPages;
    const selectedCount = selectedPages.length;

    if (selectedCount === 0) {
      return {
        borderColor: "#CDCDCD",
        backgroundColor: "transparent",
        checkmarkColor: "transparent",
        showCheckmark: false,
      };
    } else if (selectedCount === 1) {
      return {
        borderColor: "#E3E3E3",
        backgroundColor: "transparent",
        checkmarkColor: "#E3E3E3",
        showCheckmark: true,
      };
    } else if (selectedCount === 2) {
      return {
        borderColor: "#BDBDBD",
        backgroundColor: "transparent",
        checkmarkColor: "#BDBDBD",
        showCheckmark: true,
      };
    } else if (selectedCount === 3) {
      return {
        borderColor: "#5087F8",
        backgroundColor: "#5087F8",
        checkmarkColor: "#FFFFFF",
        showCheckmark: true,
      };
    } else if (selectedCount === 4) {
      return {
        borderColor: "#2469F6",
        backgroundColor: "#2469F6",
        checkmarkColor: "#FFFFFF",
        showCheckmark: true,
      };
    } else {
      return {
        borderColor: "#CDCDCD",
        backgroundColor: "transparent",
        checkmarkColor: "transparent",
        showCheckmark: false,
      };
    }
  };

  // HANDLE DROPDOWN VISIBILITY
  const handleDropdownVisibleChange = (
    visible: boolean,
    index: number
  ): void => {
    setOpenDropdownIndex(visible ? index : null);
  };

  // DROPDOWN CONTENT
  const dropdownContent = (index: number): JSX.Element => {
    const selectedPages = listItems[index].selectedPages;

    // Get parent checkbox color state
    const parentCheckboxState = getCheckboxColorState(index);

    return (
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Parent Row */}
        <div className="p-3 py-4">
          <div
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50"
            onClick={() => handleSelectAll(index)}
          >
            <span className="text-gray-800 font-medium">All pages</span>
            <div
              className="flex items-center justify-center w-5 h-5 border rounded"
              style={{
                borderColor: parentCheckboxState.borderColor,
                backgroundColor: parentCheckboxState.backgroundColor,
              }}
            >
              {parentCheckboxState.showCheckmark && (
                <CheckOutlined
                  className="text-xs"
                  style={{ color: parentCheckboxState.checkmarkColor }}
                />
              )}
            </div>
          </div>
          <div className="border-b border-gray-200 pb-4"></div>
        </div>

        {/* Page Options */}
        {pages.map((page: string) => (
          <div key={page}>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => handlePageSelect(page, index)}
            >
              <span className="text-gray-700">{page}</span>
              <div
                className="flex items-center justify-center w-5 h-5 border border-gray-300 rounded"
                style={{
                  borderColor: selectedPages.includes(page)
                    ? "#2469F6"
                    : "#D1D5DB",
                  backgroundColor: selectedPages.includes(page)
                    ? "#2469F6"
                    : "transparent",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePageSelect(page, index);
                }}
              >
                {selectedPages.includes(page) && (
                  <CheckOutlined className="text-white text-xs" />
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Button */}
        <div className="p-3">
          <div className="border-b border-gray-200 mb-4"></div>
          <button
            className={`w-full py-2 px-4 rounded-l font-medium transition-colors ${
              selectedPages.length > 0
                ? "bg-[#FFD84D] hover:bg-[#FFCE22] text-gray-900"
                : "bg-[#FFD84D] bg-opacity-30 text-gray-500 cursor-not-allowed"
            }`}
            disabled={selectedPages.length === 0}
            onClick={() => setOpenDropdownIndex(null)}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[500px]">
        {/* List of 8 "All pages" items */}
        {listItems.map((_, index: number) => {
          const checkboxState = getCheckboxColorState(index);

          return (
            <Dropdown
              key={index}
              overlay={dropdownContent(index)}
              trigger={["click"]}
              visible={openDropdownIndex === index}
              onVisibleChange={(visible) =>
                handleDropdownVisibleChange(visible, index)
              }
              overlayClassName="w-full max-w-[500px]"
            >
              <div
                className={`flex items-center justify-between p-4 h-42 cursor-pointer hover:bg-gray-50 transition-colors bg-white rounded-l shadow-lg border border-gray-200 mb-4 ${
                  openDropdownIndex === index
                    ? "border-l-4 border-l-accent-500 bg-gray-50"
                    : ""
                }`}
              >
                <span className="text-gray-700">All pages</span>
                <div
                  className="flex items-center justify-center w-5 h-5 border rounded"
                  style={{
                    borderColor: checkboxState.borderColor,
                    backgroundColor: checkboxState.backgroundColor,
                  }}
                >
                  {checkboxState.showCheckmark && (
                    <CheckOutlined
                      className="text-xs"
                      style={{ color: checkboxState.checkmarkColor }}
                    />
                  )}
                </div>
              </div>
            </Dropdown>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
