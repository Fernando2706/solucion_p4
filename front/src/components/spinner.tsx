import { useLoading } from '@/hooks/useLoading';
import React from 'react';
import styled from 'styled-components';

const Spinner = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <>
          <Background />
          <Loader />
        </>
      )}
    </>
  );
};

export default Spinner;

const Background = styled.div`
  position: fixed;
  top: 0 !important;
  z-index: 10001;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100vw !important;
  height: 100vh !important;
`;

const Loader = styled.div`
  display: block;
  position: fixed;
  z-index: 10002;
  left: 50% !important;
  top: 50% !important;
  width: 150px;
  height: 150px;
  margin: -75px 0 0 -75px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #008F8C;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

  &::before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #23606E;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FACFCE;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
