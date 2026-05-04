import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/reference/catalyst-processing-api",
    },
    {
      type: "category",
      label: "Publication",
      items: [
        {
          type: "doc",
          id: "api/reference/get-publications-list",
          label: "Get publications list",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/upload-a-publication-for-processing",
          label: "Upload a publication for processing",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/get-a-publication-by-id",
          label: "get a publication by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/update-publication-metadata",
          label: "Update publication metadata",
          className: "api-method patch",
        },
        {
          type: "doc",
          id: "api/reference/get-the-result-of-publication-processing",
          label: "get the result of publication processing",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Catalyst",
      items: [
        {
          type: "doc",
          id: "api/reference/get-a-catalyst-list",
          label: "Get a catalyst list",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/create-a-new-catalyst-card",
          label: "Create a new catalyst card",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/reference/get-catalyst-by-id",
          label: "get catalyst by id",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/reference/update-the-catalyst-card",
          label: "Update the catalyst card",
          className: "api-method patch",
        },
      ],
    },
    {
      type: "category",
      label: "Synthesis",
      items: [
        {
          type: "doc",
          id: "api/reference/get-a-synthesis-card-by-id",
          label: "Get a synthesis card by id",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
