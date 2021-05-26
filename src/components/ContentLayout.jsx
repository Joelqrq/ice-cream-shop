import React from "react";
import styled from "styled-components";
import { Create } from "../pages/Create";
import { Edit } from "../pages/Edit";

const StyledContentLayout = styled.section`
  display: block;
  width: 100%;
  height: 1000px;
  background-color: #fafcff;
`;

export const ContentLayout = () => {
  return (
    <StyledContentLayout>
      <Create />
      <Edit />
    </StyledContentLayout>
  );
};
