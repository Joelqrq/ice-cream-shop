import React from "react";
import styled from "styled-components";
import { Header } from "./Header";
import { ContentLayout } from "./ContentLayout";

const StyledAppLayout = styled.div`
    background-color: #FAFCFF;
`;

export const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <ContentLayout />
    </StyledAppLayout>
  );
};
