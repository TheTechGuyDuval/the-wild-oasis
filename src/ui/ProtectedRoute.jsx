import { styled } from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color--grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1) load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  //3.if there is no authenticated user then redirect to the login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //2. while loading show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4.if there is a user  then render app
  if (isAuthenticated) return <>{children}</>;
}

export default ProtectedRoute;
